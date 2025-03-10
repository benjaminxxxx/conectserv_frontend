"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, FileText, Users, Settings, MessageSquare, Calendar } from "lucide-react"

const menuItems = [
  {
    title: "Panel Principal",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Documentos",
    href: "/dashboard/documents",
    icon: FileText,
  },
  {
    title: "Clientes",
    href: "/dashboard/clients",
    icon: Users,
  },
  {
    title: "Mensajes",
    href: "/dashboard/messages",
    icon: MessageSquare,
  },
  {
    title: "Calendario",
    href: "/dashboard/calendar",
    icon: Calendar,
  },
  {
    title: "Configuración",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden md:flex w-64 flex-col fixed inset-y-0">
      <div className="flex flex-col flex-1 min-h-0 border-r bg-white">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-xl font-bold text-primary">ConectServ</h1>
          </div>
          <nav className="mt-8 flex-1 px-2 space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                    isActive ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  )}
                >
                  <item.icon
                    className={cn(
                      "mr-3 flex-shrink-0 h-5 w-5",
                      isActive ? "text-white" : "text-gray-400 group-hover:text-gray-500",
                    )}
                  />
                  {item.title}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </div>
  )
}

