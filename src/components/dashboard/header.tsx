"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { LogOut, Menu } from "lucide-react"

export function DashboardHeader() {
  const router = useRouter()

  const handleLogout = () => {
    // Eliminar el token de autenticación
    localStorage.removeItem("auth_token")
    // Redirigir al inicio
    router.push("/")
  }

  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6">
      <Button variant="ghost" size="icon" className="md:hidden">
        <Menu className="h-5 w-5" />
      </Button>

      <div className="flex-1" />

      <Button variant="ghost" size="icon" onClick={handleLogout}>
        <LogOut className="h-5 w-5" />
      </Button>
    </header>
  )
}

