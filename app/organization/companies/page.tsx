import { createClient } from "@/lib/supabase/server"
import {
  Building2,
  Search,
  ExternalLink,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export const instant = false

type Company = {
  id: string
  name: string
  registration_number: string | null
  is_active: boolean | null
  created_at: string
  company_type: string | null
  manager_name: string | null
  pbo_grade: string | null
  beo_grade: string | null
  mass_developer_grade: string | null
  permit_link: string | null
}

export default async function CompaniesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const params = await searchParams
  const query = params.q?.trim() || ""

  const supabase = await createClient()

  let request = supabase
    .from("companies")
    .select("*")
    .order("name", { ascending: true })

  if (query) {
    request = request.or(
      `name.ilike.%${query}%,registration_number.ilike.%${query}%,manager_name.ilike.%${query}%`
    )
  }

  const { data, error } = await request

  const companies = (data ?? []) as Company[]

  const activeCount = companies.filter(
    (company) => company.is_active
  ).length

  const inactiveCount = companies.filter(
    (company) => !company.is_active
  ).length

  return (
    <main className="min-h-screen p-6 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                <Building2 className="h-5 w-5 text-primary" />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  شرکت‌ها
                </h1>

                <p className="text-sm text-muted-foreground">
                  مدیریت شرکت‌های هلدینگ ساختمانی خشت
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                کل شرکت‌ها
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">
                {companies.length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                شرکت‌های فعال
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">
                {activeCount}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                شرکت‌های غیرفعال
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">
                {inactiveCount}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <form method="GET">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  name="q"
                  defaultValue={query}
                  placeholder="جستجو بر اساس نام شرکت، شماره ثبت یا مدیر..."
                  className="pr-10"
                />
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>فهرست شرکت‌ها</CardTitle>

              <span className="text-sm text-muted-foreground">
                {companies.length} شرکت
              </span>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {error ? (
              <div className="p-6 text-sm text-destructive">
                خطا در دریافت اطلاعات شرکت‌ها:
                <div className="mt-2 font-mono text-xs">
                  {error.message}
                </div>
              </div>
            ) : companies.length === 0 ? (
              <div className="flex min-h-40 items-center justify-center p-6 text-sm text-muted-foreground">
                شرکتی پیدا نشد.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/40">
                      <th className="whitespace-nowrap px-6 py-4 text-right font-medium">
                        شرکت
                      </th>

                      <th className="whitespace-nowrap px-6 py-4 text-right font-medium">
                        مالک داده
                      </th>

                      <th className="whitespace-nowrap px-6 py-4 text-right font-medium">
                        نوع شرکت
                      </th>

                      <th className="whitespace-nowrap px-6 py-4 text-right font-medium">
                        شماره ثبت
                      </th>

                      <th className="whitespace-nowrap px-6 py-4 text-right font-medium">
                        PBO
                      </th>

                      <th className="whitespace-nowrap px-6 py-4 text-right font-medium">
                        نظام مهندسی
                      </th>

                      <th className="whitespace-nowrap px-6 py-4 text-right font-medium">
                        انبوه‌سازی
                      </th>

                      <th className="whitespace-nowrap px-6 py-4 text-right font-medium">
                        وضعیت
                      </th>

                      <th className="whitespace-nowrap px-6 py-4 text-right font-medium">
                        مجوز
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {companies.map((company) => (
                      <tr
                        key={company.id}
                        className="border-b last:border-0 hover:bg-muted/30"
                      >
                        <td className="px-6 py-4">
                          <div className="font-medium">
                            {company.name}
                          </div>
                        </td>

                        <td className="px-6 py-4 text-muted-foreground">
                          {company.manager_name || "—"}
                        </td>

                        <td className="px-6 py-4 text-muted-foreground">
                          {company.company_type || "—"}
                        </td>

                        <td className="px-6 py-4 font-mono text-xs">
                          {company.registration_number || "—"}
                        </td>

                        <td className="px-6 py-4">
                          {company.pbo_grade || "—"}
                        </td>

                        <td className="px-6 py-4">
                          {company.beo_grade || "—"}
                        </td>

                        <td className="px-6 py-4">
                          {company.mass_developer_grade || "—"}
                        </td>

                        <td className="px-6 py-4">
                          {company.is_active ? (
                            <Badge variant="default">
                              فعال
                            </Badge>
                          ) : (
                            <Badge variant="secondary">
                              غیرفعال
                            </Badge>
                          )}
                        </td>

                        <td className="px-6 py-4">
                          {company.permit_link ? (
                            <a
                              href={company.permit_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-primary hover:underline"
                            >
                              مشاهده
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          ) : (
                            "—"
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}