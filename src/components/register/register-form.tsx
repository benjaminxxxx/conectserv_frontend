"use client"

import { useRegisterStore } from "@/store/register-store"
import { StepOne } from "./steps/step-one"
import { StepTwo } from "./steps/step-two"
import { StepFour } from "./steps/step-four"
import { StepFive } from "./steps/step-five"
import { Card, CardContent } from "@/components/ui/card"

export function RegisterForm() {
  const step = useRegisterStore((state) => state.step)

  return (
    <Card className="border-none shadow-lg">
      <CardContent className="p-6 md:p-8 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Registro de Profesional</h1>
          <p className="text-muted-foreground">Complete el formulario para comenzar a recibir trabajos</p>
        </div>

        {step === 1 && <StepOne />}
        {step === 2 && <StepTwo />}
        {step === 3 && <StepFour />}
        {step === 4 && <StepFive />}

        <div className="flex justify-between pt-4 border-t">
          <p className="text-sm text-muted-foreground">Paso {step} de 4</p>
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`w-2 h-2 rounded-full ${i === step ? "bg-primary" : "bg-gray-200"}`} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

