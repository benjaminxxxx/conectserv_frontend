"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="border-b bg-background">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/logo.svg" alt="ConectServ Logo" width={150} height={36} priority />
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary">
              Inicio
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-sm font-medium hover:text-primary">
                  Servicios
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Electricistas</DropdownMenuItem>
                <DropdownMenuItem>Pintores</DropdownMenuItem>
                <DropdownMenuItem>Carpinteros</DropdownMenuItem>
                <DropdownMenuItem>Jardineros</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/acerca-de" className="text-sm font-medium hover:text-primary">
              Acerca de
            </Link>
            <Link href="/soporte" className="text-sm font-medium hover:text-primary">
              Soporte
            </Link>
            <Link href="/acceder" className="text-sm font-medium hover:text-primary">
              Acceder
            </Link>
          </nav>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </Container>
      {isMenuOpen && (
        <div className="md:hidden">
          <Container>
            <nav className="py-4 flex flex-col gap-2">
              <Link href="/" className="text-sm font-medium hover:text-primary">
                Inicio
              </Link>
              <Link href="#" className="text-sm font-medium hover:text-primary">
                Servicios
              </Link>
              <Link href="/acerca-de" className="text-sm font-medium hover:text-primary">
                Acerca de
              </Link>
              <Link href="/soporte" className="text-sm font-medium hover:text-primary">
                Soporte
              </Link>
              <Link href="/acceder" className="text-sm font-medium hover:text-primary">
                Acceder
              </Link>
            </nav>
          </Container>
        </div>
      )}
    </header>
  )
}

