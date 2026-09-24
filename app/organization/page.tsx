import Link from "next/link"
import {
  Building2,
  Users,
  Network,
  BriefcaseBusiness,
  GitBranch,
  ArrowRight,
} from "lucide-react"

import { createClient } from "@/lib/supabase/server"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

async function getCount(
  supabase: Awaited<ReturnType<typeof createClient>>,
  table: string
) {
  const { count, error } = await supabase
    .from(table)
    .select("*", { count: "exact", head: true })

  if (error) {
    console.error(`Error fetching ${table} count:`, error)
    return 0
  }

  return count ?? 0
}

export default async function OrganizationPage() {
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
      description: "شرکت‌های ثبت‌شده در هلدینگ",
      icon: Building2,
      href: "/organization/companies",
    },
    {
      title: "کارکنان",
      value: employees,
      description: "افراد ثبت‌شده در سازمان",
      icon: Users,
      href: "/organization/employees",
    },
    {
      title: "واحدها",
      value: departments,
      description: "واحدهای سازمانی",
      icon: Network,
      href: "/organization/departments",
    },
    {
      title: "سمت‌ها",
      value: positions,
      description: "سمت‌های تعریف‌شده",
      icon: BriefcaseBusiness,
      href: "/organization/positions",
    },
  ]

  const quickLinks = [
    {
      title: "شرکت‌ها",
      description: "مدیریت شرکت‌های هلدینگ",
      href: "/organization/companies",
      icon: Building2,
    },
    {
      title: "کارکنان",
      description: "مدیریت اطلاعات کارکنان",
      href: "/organization/employees",
      icon: Users,
    },
    {
      title: "واحدهای سازمانی",
      description: "مدیریت واحدها و دپارتمان‌ها",
      href: "/organization/departments",
      icon: Network,
    },
    {
      title: "سمت‌ها",
      description: "مدیریت سمت‌های سازمانی",
      href: "/organization/positions",
      icon: BriefcaseBusiness,
    },
    {
      title: "چارت سازمانی",
      description: "مشاهده ساختار سازمان",
      href: "/org-chart",
      icon: GitBranch,
    },
  ]

  return (
    <main className="container mx-auto space-y-8 p-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          سازمان
        </h1>

        <p className="text-muted-foreground">
          مدیریت ساختار سازمانی هلدینگ خشت
        </p>
      </div>

      {/* Statistics */}
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon

          return (
            <Link key={stat.title} href={stat.href}>
              <Card className="h-full transition-colors hover:bg-muted/50">
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

                  <p className="mt-1 text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </section>

      <Separator />

      {/* Organization Structure */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">
            ساختار سازمان
          </h2>

          <p className="text-sm text-muted-foreground">
            ارتباط اصلی داده‌های سازمانی
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-4">
              <StructureItem
                icon={Building2}
                title="شرکت‌ها"
                value={companies}
              />

              <StructureItem
                icon={Network}
                title="واحدها"
                value={departments}
              />

              <StructureItem
                icon={BriefcaseBusiness}
                title="سمت‌ها"
                value={positions}
              />

              <StructureItem
                icon={Users}
                title="کارکنان"
                value={employees}
              />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Quick Access */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">
            دسترسی سریع
          </h2>

          <p className="text-sm text-muted-foreground">
            مدیریت بخش‌های مختلف سازمان
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((item) => {
            const Icon = item.icon

            return (
              <Card
                key={item.title}
                className="transition-colors hover:bg-muted/50"
              >
                <CardContent className="p-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>

                    <Button
                      asChild
                      variant="ghost"
                      size="icon"
                    >
                      <Link href={item.href}>
                        <ArrowRight className="h-4 w-4" />
                        <span className="sr-only">
                          ورود
                        </span>
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>
    </main>
  )
}

function StructureItem({
  icon: Icon,
  title,
  value,
}: {
  icon: React.ElementType
  title: string
  value: number
}) {
  return (
    <div className="flex items-center gap-4 rounded-lg border p-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
        <Icon className="h-5 w-5" />
      </div>

      <div>
        <p className="text-sm text-muted-foreground">
          {title}
        </p>

        <p className="text-2xl font-semibold">
          {value}
        </p>
      </div>
    </div>
  )
}