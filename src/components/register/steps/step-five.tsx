"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useRegisterStore } from "@/store/register-store"
import { Input } from "@/components/ui/input"

const MAX_FILE_SIZE = 5000000 // 5MB

const formSchema = z.object({
  frontId: z.any().refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`),
  backId: z.any().refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`),
  selfie: z.any().refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`),
})

export function StepFive() {
  const router = useRouter()
  const { setStep, formData, reset } = useRegisterStore()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true)

      // Aquí iría la llamada a la API para crear el usuario
      const formDataToSend = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value)
      })
      formDataToSend.append("frontId", values.frontId)
      formDataToSend.append("backId", values.backId)
      formDataToSend.append("selfie", values.selfie)

      // const response = await fetch('https://conectserv.perudevsolutions.com/api/register', {
      //   method: 'POST',
      //   body: formDataToSend,
      // })

      reset() // Limpia el estado
      router.push("/register/success") // Redirige a página de éxito
    } catch (error) {
      console.error("Error al registrar:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold">Verificación de identidad</h2>
          <p className="text-sm text-muted-foreground">
            Para finalizar tu registro, necesitamos confirmar tu identidad
          </p>
        </div>

        <FormField
          control={form.control}
          name="frontId"
          render={({ field: { onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Imagen de Cédula de Identidad (Frontal)</FormLabel>
              <FormControl>
                <Input type="file" accept="image/*" onChange={(e) => onChange(e.target.files?.[0])} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="backId"
          render={({ field: { onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Imagen de Cédula de Identidad (Dorso)</FormLabel>
              <FormControl>
                <Input type="file" accept="image/*" onChange={(e) => onChange(e.target.files?.[0])} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="selfie"
          render={({ field: { onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Imagen Real (Selfie)</FormLabel>
              <FormControl>
                <Input type="file" accept="image/*" onChange={(e) => onChange(e.target.files?.[0])} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between gap-4">
          <Button type="button" variant="outline" onClick={() => setStep(4)}>
            Atrás
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Finalizar Registro"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

