"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Employee = {
  id: string;
  name: string;
  employee_type: string;
  active: boolean | null;
};

type Position = {
  id: string;
  title: string;
  department_id: string;
};

type Department = {
  id: string;
  name: string;
};

type Company = {
  id: string;
  name: string;
};

type EmployeePosition = {
  id: string;
  employee_id: string;
  position_id: string;
  company_id: string | null;
  is_primary: boolean;
};

type EmployeeRow = {
  relationId: string;
  employeeId: string;
  name: string;
  positionId: string;
  position: string;
  department: string;
  company: string;
  isPrimary: boolean;
  active: boolean | null;
};

const supabase = createClient();

export default function EmployeesPage() {
  const [rows, setRows] = useState<EmployeeRow[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function loadData() {
    setLoading(true);
    setError(null);

    const [
      employeesResult,
      employeePositionsResult,
      positionsResult,
      departmentsResult,
    ] = await Promise.all([
      supabase
        .from("employees")
        .select("id,name,employee_type,active")
        .order("name"),

      supabase
        .from("employee_positions")
        .select(
          "id,employee_id,position_id,company_id,is_primary"
        ),

      supabase
        .from("positions")
        .select("id,title,department_id")
        .order("title"),

      supabase
        .from("departments")
        .select("id,name")
        .order("name"),
    ]);

    // -----------------------------
    // Error handling
    // -----------------------------

    if (employeesResult.error) {
      console.error(
        "employees:",
        employeesResult.error
      );

      setError(
        `خطا در دریافت کارکنان: ${
          employeesResult.error.message ||
          "خطای نامشخص"
        }`
      );

      setLoading(false);
      return;
    }

    if (employeePositionsResult.error) {
      console.error(
        "employee_positions:",
        employeePositionsResult.error
      );

      setError(
        `خطا در دریافت سمت کارکنان: ${
          employeePositionsResult.error.message ||
          "خطای نامشخص"
        }`
      );

      setLoading(false);
      return;
    }

    if (positionsResult.error) {
      console.error(
        "positions:",
        positionsResult.error
      );

      setError(
        `خطا در دریافت سمت‌ها: ${
          positionsResult.error.message ||
          "خطای نامشخص"
        }`
      );

      setLoading(false);
      return;
    }

    if (departmentsResult.error) {
      console.error(
        "departments:",
        departmentsResult.error
      );

      setError(
        `خطا در دریافت دپارتمان‌ها: ${
          departmentsResult.error.message ||
          "خطای نامشخص"
        }`
      );

      setLoading(false);
      return;
    }

    // -----------------------------
    // Data
    // -----------------------------

    const employees =
      employeesResult.data as Employee[];

    const employeePositions =
      employeePositionsResult.data as EmployeePosition[];

    const positionsData =
      positionsResult.data as Position[];

    const departmentsData =
      departmentsResult.data as Department[];

    setPositions(positionsData);
    setDepartments(departmentsData);

    // -----------------------------
    // Maps
    // -----------------------------

    const employeeMap = new Map(
      employees.map((employee) => [
        employee.id,
        employee,
      ])
    );

    const positionMap = new Map(
      positionsData.map((position) => [
        position.id,
        position,
      ])
    );

    const departmentMap = new Map(
      departmentsData.map((department) => [
        department.id,
        department,
      ])
    );

    // -----------------------------
    // Build rows
    // -----------------------------

    const result: EmployeeRow[] =
      employeePositions.map((relation) => {
        const employee = employeeMap.get(
          relation.employee_id
        );

        const position = positionMap.get(
          relation.position_id
        );

        const department = position
          ? departmentMap.get(
              position.department_id
            )
          : undefined;

        return {
          relationId: relation.id,

          employeeId: relation.employee_id,

          name: employee?.name ?? "-",

          positionId: relation.position_id,

          position: position?.title ?? "-",

          department:
            department?.name ?? "-",

          // فعلاً چون companies query
          // وابسته به authentication است،
          // اسم شرکت را از این صفحه نمی‌خوانیم.
          company: relation.company_id
            ? "متصل به شرکت"
            : "-",

          isPrimary: relation.is_primary,

          active:
            employee?.active ?? null,
        };
      });

    setRows(result);
    setLoading(false);
  }

  // -----------------------------
  // Change Position
  // -----------------------------

  async function changePosition(
    relationId: string,
    newPositionId: string
  ) {
    setSaving(relationId);
    setError(null);

    const { error } = await supabase
      .from("employee_positions")
      .update({
        position_id: newPositionId,
      })
      .eq("id", relationId);

    if (error) {
      console.error(
        "change position:",
        error
      );

      setError(
        `خطا در تغییر سمت: ${
          error.message || "خطای نامشخص"
        }`
      );

      setSaving(null);
      return;
    }

    // -----------------------------
    // Update UI locally
    // -----------------------------

    const newPosition =
      positions.find(
        (position) =>
          position.id === newPositionId
      );

    const newDepartment =
      newPosition
        ? departments.find(
            (department) =>
              department.id ===
              newPosition.department_id
          )
        : undefined;

    setRows((currentRows) =>
      currentRows.map((row) => {
        if (
          row.relationId !== relationId
        ) {
          return row;
        }

        return {
          ...row,

          positionId: newPositionId,

          position:
            newPosition?.title ?? "-",

          department:
            newDepartment?.name ?? "-",
        };
      })
    );

    setSaving(null);
  }

  // -----------------------------
  // Search
  // -----------------------------

  const filteredRows = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    if (!query) {
      return rows;
    }

    return rows.filter((row) => {
      return [
        row.name,
        row.position,
        row.department,
        row.company,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query);
    });
  }, [rows, search]);

  // -----------------------------
  // Initial Load
  // -----------------------------

  useEffect(() => {
    loadData();
  }, []);

  // -----------------------------
  // UI
  // -----------------------------

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-gray-50 p-6"
    >
      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <div className="mb-6 flex items-center justify-between">

          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              کارکنان
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              مدیریت کارکنان و سمت‌های سازمانی
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm">
            {rows.length} نفر
          </div>

        </div>

        {/* Error */}

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Search */}

        <div className="mb-4">

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="جستجوی نام، سمت یا دپارتمان..."
            className="w-full max-w-md rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
          />

        </div>

        {/* Table */}

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

          {loading ? (

            <div className="p-10 text-center text-sm text-gray-500">
              در حال بارگذاری...
            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full min-w-[850px] text-sm">

                <thead className="border-b border-gray-200 bg-gray-50">

                  <tr>

                    <th className="px-5 py-3 text-right font-medium text-gray-600">
                      کارمند
                    </th>

                    <th className="px-5 py-3 text-right font-medium text-gray-600">
                      سمت
                    </th>

                    <th className="px-5 py-3 text-right font-medium text-gray-600">
                      دپارتمان
                    </th>

                    <th className="px-5 py-3 text-right font-medium text-gray-600">
                      شرکت
                    </th>

                    <th className="px-5 py-3 text-right font-medium text-gray-600">
                      وضعیت
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-gray-100">

                  {filteredRows.map((row) => (

                    <tr
                      key={row.relationId}
                      className="transition hover:bg-gray-50"
                    >

                      {/* Employee */}

                      <td className="px-5 py-4 font-medium text-gray-900">
                        {row.name}
                      </td>

                      {/* Position */}

                      <td className="px-5 py-4">

                        <select
                          value={row.positionId}
                          disabled={
                            saving ===
                            row.relationId
                          }
                          onChange={(event) =>
                            changePosition(
                              row.relationId,
                              event.target.value
                            )
                          }
                          className="min-w-[220px] rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
                        >

                          {positions.map(
                            (position) => (

                              <option
                                key={position.id}
                                value={position.id}
                              >
                                {position.title}
                              </option>

                            )
                          )}

                        </select>

                        {saving ===
                          row.relationId && (
                          <span className="mr-2 text-xs text-gray-400">
                            در حال ذخیره...
                          </span>
                        )}

                      </td>

                      {/* Department */}

                      <td className="px-5 py-4 text-gray-600">
                        {row.department}
                      </td>

                      {/* Company */}

                      <td className="px-5 py-4 text-gray-600">
                        {row.company}
                      </td>

                      {/* Status */}

                      <td className="px-5 py-4">

                        {row.active === false ? (

                          <span className="inline-flex rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600">
                            غیرفعال
                          </span>

                        ) : (

                          <span className="inline-flex rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600">
                            فعال
                          </span>

                        )}

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

              {/* Empty */}

              {filteredRows.length === 0 && (
                <div className="border-t border-gray-100 p-10 text-center text-sm text-gray-500">
                  موردی پیدا نشد
                </div>
              )}

            </div>

          )}

        </div>

      </div>
    </main>
  );
}