"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useRegisterStore } from "@/store/register-store"
import { useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"
import { api } from "@/lib/api"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres.",
  }),
})

export function StepFour() {
  const router = useRouter()
  const { setFormData, formData } = useRegisterStore()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: formData.password || "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setError(null)

    try {
      // Preparar los datos para el registro
      const registrationData = {
        ...formData,
        ...values,
      }

      console.log("Datos a enviar:", registrationData)

      // Enviar datos al servidor
      const response = await api.professional.register(registrationData)

      if (response.success) {
        // Guardar el token en localStorage o usar tu sistema de manejo de sesión
        if (response.token) {
          localStorage.setItem("auth_token", response.token)
        }

        // Actualizar el estado del formulario
        setFormData(values)

        // Redirigir al dashboard
        router.push("/dashboard")
      } else {
        setError(response.message || "Error al registrar el usuario")
      }
    } catch (err: any) {
      console.error("Error durante el registro:", err)
      setError(err.message || "Error al procesar el registro")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold">Crea tu contraseña</h2>
          <p className="text-sm text-muted-foreground">Crea una contraseña que puedas recordar fácilmente</p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
            Atrás
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Registrando...
              </>
            ) : (
              "Finalizar registro"
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}

