import Link from "next/link"
import {
  Building2,
  Users,
  Network,
  BriefcaseBusiness,
  UserRound,
  ArrowLeft,
  LayoutDashboard,
} from "lucide-react"

import { createClient } from "@/lib/supabase/server"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const instant = false

async function getCount(
  supabase: Awaited<ReturnType<typeof createClient>>,
  table: string
) {
  const { count, error } = await supabase
    .from(table)
    .select("*", {
      count: "exact",
      head: true,
    })

  if (error) {
    console.error(`Error fetching ${table}:`, error)
    return 0
  }

  return count ?? 0
}

export default async function HomePage() {
  const supabase = await createClient()

  const [companies, employees, departments, positions] =
    await Promise.all([
      getCount(supabase, "companies"),
      getCount(supabase, "employees"),
      getCount(supabase, "departments"),
      getCount(supabase, "positions"),
    ])

  const stats = [
    {
      title: "شرکت‌ها",
      value: companies,
      icon: Building2,
      href: "/organization/companies",
    },
    {
      title: "کارکنان",
      value: employees,
      icon: Users,
      href: "/organization/employees",
    },
    {
      title: "واحدهای سازمانی",
      value: departments,
      icon: Network,
      href: "/organization/departments",
    },
    {
      title: "سمت‌ها",
      value: positions,
      icon: BriefcaseBusiness,
      href: "/organization/positions",
    },
  ]

  return (
    <main className="container mx-auto space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            داشبورد
          </h1>

          <p className="mt-2 text-muted-foreground">
            نمای کلی از سیستم سازمانی هلدینگ خشت
          </p>
        </div>

        <Button asChild>
          <Link href="/organization">
            <LayoutDashboard className="ml-2 h-4 w-4" />
            سازمان
          </Link>
        </Button>
      </div>

      {/* Organization Overview */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">
            نمای کلی سازمان
          </h2>

          <p className="text-sm text-muted-foreground">
            اطلاعات فعلی ساختار سازمانی
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon

            return (
              <Link key={stat.title} href={stat.href}>
                <Card className="transition-colors hover:bg-muted/50">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>

                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </CardHeader>

                  <CardContent>
                    <div className="text-3xl font-bold">
                      {stat.value}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Modules */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">
            ماژول‌ها
          </h2>

          <p className="text-sm text-muted-foreground">
            بخش‌های اصلی ERP
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ModuleCard
            title="سازمان"
            description="شرکت‌ها، کارکنان، واحدها و سمت‌ها"
            href="/organization"
            icon={Building2}
          />

          <ModuleCard
            title="چارت سازمانی"
            description="مشاهده ساختار و روابط سازمان"
            href="/org-chart"
            icon={Network}
          />

          <ModuleCard
            title="کارکنان"
            description="مدیریت اطلاعات کارکنان"
            href="/organization/employees"
            icon={UserRound}
          />
        </div>
      </section>
    </main>
  )
}

function ModuleCard({
  title,
  description,
  href,
  icon: Icon,
}: {
  title: string
  description: string
  href: string
  icon: React.ElementType
}) {
  return (
    <Card className="transition-colors hover:bg-muted/50">
      <CardContent className="flex items-center gap-4 p-6">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-muted">
          <Icon className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-semibold">
            {title}
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            {description}
          </p>
        </div>

        <Button asChild variant="ghost" size="icon">
          <Link href={href}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">
              ورود
            </span>
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}