"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  Users,
  BriefcaseBusiness,
  Network,
  LayoutDashboard,
  Building,
  ChevronLeft,
} from "lucide-react";

const navigation = [
  {
    title: "داشبورد",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "سازمان",
    items: [
      {
        title: "شرکت‌ها",
        href: "/admin/companies",
        icon: Building2,
      },
      {
        title: "کارکنان",
        href: "/admin/employees",
        icon: Users,
      },
      {
        title: "سمت‌ها",
        href: "/admin/positions",
        icon: BriefcaseBusiness,
      },
      {
        title: "دپارتمان‌ها",
        href: "/admin/departments",
        icon: Building,
      },
      {
        title: "چارت سازمانی",
        href: "/admin/org-chart",
        icon: Network,
      },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 right-0 z-40 flex w-64 flex-col border-l bg-background">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-5">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            خ
          </div>

          <div>
            <div className="font-bold">خشت</div>
            <div className="text-xs text-muted-foreground">
              Khesht OS
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-6 overflow-y-auto p-3">
        {navigation.map((section) => {
          if (!section.items) {
            const Icon = section.icon!;
            const active = pathname === section.href;

            return (
              <Link
                key={section.href}
                href={section.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  active
                    ? "bg-accent font-medium text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {section.title}
              </Link>
            );
          }

          return (
            <div key={section.title}>
              <div className="mb-2 px-3 text-xs font-medium text-muted-foreground">
                {section.title}
              </div>

              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active =
                    pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                        active
                          ? "bg-accent font-medium text-accent-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {item.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t p-3">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-xs text-muted-foreground">
          <div className="h-2 w-2 rounded-full bg-green-500" />
          سیستم فعال است
        </div>
      </div>
    </aside>
  );
}