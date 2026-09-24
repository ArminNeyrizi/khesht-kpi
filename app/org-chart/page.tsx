"use client";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
type Employee = {
  id: string;
  name: string;
  active: boolean | null;
  employee_type: string;
};
type Department = {
  id: string;
  name: string;
};
type Position = {
  id: string;
  title: string;
  department_id: string;
  reports_to: string | null;
};
type EmployeePosition = {
  id: string;
  employee_id: string;
  position_id: string;
  company_id: string | null;
  is_primary: boolean;
};
type OrgPosition = Position & {
  department?: Department;
  employees: Employee[];
  children: OrgPosition[];
};
export default function OrgChartPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employeePositions, setEmployeePositions] = useState<
    EmployeePosition[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showInactive, setShowInactive] = useState(false);
  useEffect(() => {
    loadOrgChart();
  }, []);
  async function loadOrgChart() {
    try {
      setLoading(true);
      setError(null);
      const [
        departmentsResult,
        positionsResult,
        employeesResult,
        employeePositionsResult,
      ] = await Promise.all([
        supabase
          .from("departments")
          .select("id, name")
          .order("name"),
        supabase
          .from("positions")
          .select("id, title, department_id, reports_to"),
        supabase
          .from("employees")
          .select("id, name, active, employee_type")
          .order("name"),
        supabase
          .from("employee_positions")
          .select(
            "id, employee_id, position_id, company_id, is_primary"
          ),
      ]);
      if (departmentsResult.error)
        throw departmentsResult.error;
      if (positionsResult.error)
        throw positionsResult.error;
      if (employeesResult.error)
        throw employeesResult.error;
      if (employeePositionsResult.error)
        throw employeePositionsResult.error;
      setDepartments(departmentsResult.data ?? []);
      setPositions(positionsResult.data ?? []);
      setEmployees(employeesResult.data ?? []);
      setEmployeePositions(employeePositionsResult.data ?? []);
    } catch (err: any) {
      console.error(err);
      setError(err?.message ?? "خطا در دریافت اطلاعات");
    } finally {
      setLoading(false);
    }
  }
  const employeeMap = useMemo(() => {
    return new Map(employees.map((employee) => [employee.id, employee]));
  }, [employees]);
  const departmentMap = useMemo(() => {
    return new Map(
      departments.map((department) => [department.id, department])
    );
  }, [departments]);
  const employeesByPosition = useMemo(() => {
    const map = new Map<string, Employee[]>();
    for (const relation of employeePositions) {
      const employee = employeeMap.get(relation.employee_id);
      if (!employee) continue;
      if (!showInactive && employee.active === false) {
        continue;
      }
      if (!map.has(relation.position_id)) {
        map.set(relation.position_id, []);
      }
      map.get(relation.position_id)!.push(employee);
    }
    return map;
  }, [employeePositions, employeeMap, showInactive]);
  const orgTree = useMemo(() => {
    const nodes = new Map<string, OrgPosition>();
    for (const position of positions) {
      nodes.set(position.id, {
        ...position,
        department: departmentMap.get(position.department_id),
        employees: employeesByPosition.get(position.id) ?? [],
        children: [],
      });
    }
    const roots: OrgPosition[] = [];
    for (const node of nodes.values()) {
      if (node.reports_to && nodes.has(node.reports_to)) {
        nodes.get(node.reports_to)!.children.push(node);
      } else {
        roots.push(node);
      }
    }
    return roots;
  }, [
    positions,
    departmentMap,
    employeesByPosition,
  ]);
  const stats = useMemo(() => {
    const activeEmployees = employees.filter(
      (employee) => employee.active !== false
    );
    return {
      employees: activeEmployees.length,
      positions: positions.length,
      departments: departments.length,
    };
  }, [employees, positions, departments]);
  if (loading) {
    return (
      <main dir="rtl" className="min-h-screen bg-[#0b0b0b] p-8 text-white">
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-sm text-zinc-400">
            در حال دریافت چارت سازمانی...
          </div>
        </div>
      </main>
    );
  }
  if (error) {
    return (
      <main dir="rtl" className="min-h-screen bg-[#0b0b0b] p-8 text-white">
        <div className="mx-auto max-w-4xl rounded-2xl border border-red-900/50 bg-red-950/20 p-6">
          <h1 className="mb-2 text-lg font-semibold">
            خطا در دریافت چارت سازمانی
          </h1>
          <p className="text-sm text-red-300">
            {error}
          </p>
          <button
            onClick={loadOrgChart}
            className="mt-5 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black"
          >
            تلاش مجدد
          </button>
        </div>
      </main>
    );
  }
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#0b0b0b] px-6 py-8 text-white"
    >
      <div className="mx-auto max-w-[1600px]">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              چارت سازمانی
            </h1>
            <p className="mt-2 text-sm text-zinc-400">
              ساختار سازمان بر اساس جایگاه‌ها و روابط گزارش‌دهی
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowInactive((value) => !value)}
              className={`rounded-xl border px-4 py-2 text-sm transition ${
                showInactive
                  ? "border-white/20 bg-white text-black"
                  : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
              }`}
            >
              {showInactive
                ? "نمایش افراد غیرفعال"
                : "افراد غیرفعال مخفی"}
            </button>
            <button
              onClick={loadOrgChart}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 hover:bg-white/10"
            >
              بروزرسانی
            </button>
          </div>
        </div>
        {/* Stats */}
        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Stat
            label="کارکنان"
            value={stats.employees}
          />
          <Stat
            label="جایگاه‌ها"
            value={stats.positions}
          />
          <Stat
            label="واحدها"
            value={stats.departments}
          />
        </div>
        {/* Chart */}
        <div className="overflow-x-auto rounded-3xl border border-white/10 bg-[#111111] p-8">
          <div className="min-w-[1100px]">
            {orgTree.length === 0 ? (
              <div className="py-20 text-center text-sm text-zinc-500">
                جایگاهی برای نمایش وجود ندارد.
              </div>
            ) : (
              <div className="space-y-10">
                {orgTree.map((node) => (
                  <OrgNode
                    key={node.id}
                    node={node}
                    level={0}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
function Stat({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#111111] p-5">
      <div className="text-sm text-zinc-500">
        {label}
      </div>
      <div className="mt-2 text-3xl font-semibold text-white">
        {value}
      </div>
    </div>
  );
}
function OrgNode({
  node,
  level,
}: {
  node: OrgPosition;
  level: number;
}) {
  return (
    <div className={level > 0 ? "mr-12 border-r border-white/10 pr-8" : ""}>
      <div className="relative">
        {/* Position Card */}
        <div className="inline-flex min-w-[280px] max-w-[420px] flex-col rounded-2xl border border-white/10 bg-[#181818] p-4 shadow-xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-base font-semibold text-white">
                {node.title}
              </div>
              {node.department && (
                <div className="mt-1 text-xs text-zinc-500">
                  {node.department.name}
                </div>
              )}
            </div>
            <div className="rounded-lg bg-white/5 px-2 py-1 text-xs text-zinc-500">
              {node.employees.length}
            </div>
          </div>
          {/* Employees */}
          {node.employees.length > 0 && (
            <div className="mt-4 space-y-2 border-t border-white/10 pt-3">
              {node.employees.map((employee) => (
                <div
                  key={employee.id}
                  className="flex items-center gap-3 rounded-xl bg-white/[0.03] px-3 py-2"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-medium text-zinc-300">
                    {getInitials(employee.name)}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm text-zinc-200">
                      {employee.name}
                    </div>
                    <div className="text-[11px] text-zinc-600">
                      {employee.employee_type === "organization"
                        ? "سازمان"
                        : "شخص"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {node.employees.length === 0 && (
            <div className="mt-4 border-t border-white/10 pt-3 text-xs text-zinc-600">
              فردی برای این جایگاه ثبت نشده
            </div>
          )}
        </div>
        {/* Children */}
        {node.children.length > 0 && (
          <div className="mt-8 space-y-8">
            {node.children.map((child) => (
              <OrgNode
                key={child.id}
                node={child}
                level={level + 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0]?.slice(0, 2) ?? "";
  }
  return `${parts[0]?.[0] ?? ""}${parts[1]?.[0] ?? ""}`;
}