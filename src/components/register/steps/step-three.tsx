"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useRegisterStore } from "@/store/register-store"

const formSchema = z.object({
  otp: z.string().min(4, {
    message: "El código debe tener al menos 4 caracteres.",
  }),
})

export function StepThree() {
  const { setStep, setFormData, formData } = useRegisterStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: formData.otp || "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setFormData(values)
    // Aquí iría la validación del código OTP
    setStep(4)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold">Verificación de WhatsApp</h2>
          <p className="text-sm text-muted-foreground">Introduce el código que te hemos enviado a tu WhatsApp</p>
        </div>
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código de verificación</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between gap-4">
          <Button type="button" variant="outline" onClick={() => setStep(2)}>
            Atrás
          </Button>
          <Button type="submit">Validar código</Button>
        </div>
      </form>
    </Form>
  )
}

