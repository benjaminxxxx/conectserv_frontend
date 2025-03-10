"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useRegisterStore } from "@/store/register-store"
import { LocationPicker } from "@/components/ui/location-picker"
import { useEffect, useState } from "react"
import { api, type Service } from "@/lib/api"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

const formSchema = z.object({
  service: z.string().min(1, {
    message: "Debes seleccionar un servicio.",
  }),
  zone: z.string().min(2, {
    message: "La zona debe tener al menos 2 caracteres.",
  }),
  lat: z.number(),
  lng: z.number(),
})

export function StepOne() {
  const { setStep, setFormData, formData } = useRegisterStore()
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      service: formData.service || "",
      zone: formData.zone || "",
      lat: formData.lat || 0,
      lng: formData.lng || 0,
    },
  })

  useEffect(() => {
    async function fetchServices() {
      try {
        setIsLoading(true)
        const response = await api.services.list()
        setServices(response.data)
        setError(null)
      } catch (err: any) {
        console.error("Error fetching services:", err)
        setError("No se pudieron cargar los servicios. Por favor, intente nuevamente.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchServices()
  }, [])

  function onSubmit(values: z.infer<typeof formSchema>) {
    setFormData(values)
    setStep(2)
  }

  const handleLocationSelect = (location: { lat: number; lng: number; address: string }) => {
    form.setValue("zone", location.address)
    form.setValue("lat", location.lat)
    form.setValue("lng", location.lng)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem>
              <FormLabel>¿A qué te dedicas?</FormLabel>
              <FormControl>
                <Select disabled={isLoading} onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un servicio" />
                  </SelectTrigger>
                  <SelectContent>
                    {isLoading ? (
                      <div className="flex items-center justify-center p-2">
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        <span>Cargando servicios...</span>
                      </div>
                    ) : services.length > 0 ? (
                      services.map((service) => (
                        <SelectItem key={service.id} value={service.id.toString()}>
                          {service.name}
                        </SelectItem>
                      ))
                    ) : (
                      <div className="p-2 text-center text-muted-foreground">No hay servicios disponibles</div>
                    )}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="zone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>¿En qué zona trabajas?</FormLabel>
              <FormControl>
                <div className="flex space-x-2">
                  <Input placeholder="Selecciona tu ubicación" {...field} readOnly />
                  <LocationPicker onLocationSelect={handleLocationSelect} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-4">
          <Button type="submit">Continuar</Button>
        </div>
      </form>
    </Form>
  )
}

