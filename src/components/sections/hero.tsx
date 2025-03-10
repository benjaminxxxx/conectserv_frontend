"use client"

import { useEffect, useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { api, type Service } from "@/lib/api"

export function Hero() {
  const [services, setServices] = useState<Service[]>([])
  const [selectedService, setSelectedService] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await api.services.list()
        setServices(response.data)
        setError(null)
      } catch (err) {
        console.error("Error fetching services:", err)
        setError("No se pudieron cargar los servicios. Por favor, intente nuevamente.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchServices()
  }, [])

  const handleSearch = () => {
    if (selectedService) {
      // Handle search functionality
      console.log("Searching for service:", selectedService)
    }
  }

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      <Container className="text-center relative">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4 text-[#363630]">
          Encuentra expertos de confianza para el servicio que necesitas
        </h1>
        <p className="text-xl text-[#363630]/80 mb-8 max-w-3xl mx-auto">
          Cuéntanos qué necesitas y contacta gratis con Electricistas, pintores, carpinteros, jardineros, especialistas
          en reformas de viviendas y más...
        </p>
        <div className="flex max-w-2xl mx-auto gap-4">
          <Select value={selectedService} onValueChange={setSelectedService}>
            <SelectTrigger className="text-lg h-12">
              <SelectValue placeholder="¿Qué tipo de servicio buscas?" />
            </SelectTrigger>
            <SelectContent>
              {isLoading ? (
                <SelectItem value="loading" disabled>
                  Cargando servicios...
                </SelectItem>
              ) : error ? (
                <SelectItem value="error" disabled>
                  {error}
                </SelectItem>
              ) : (
                services.map((service) => (
                  <SelectItem key={service.id} value={service.id.toString()}>
                    {service.name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
          <Button
            size="lg"
            className="px-8 bg-[#FF6B0B] hover:bg-[#FF6B0B]/90 text-white"
            onClick={handleSearch}
            disabled={!selectedService}
          >
            <Search className="mr-2 h-5 w-5" />
            Buscar
          </Button>
        </div>
      </Container>
    </section>
  )
}

