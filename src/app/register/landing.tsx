import { Loader2 } from "lucide-react"

export default function RegisterLoading() {
  return (
    <div className="py-16">
      <div className="container max-w-2xl mx-auto px-4 text-center">
        <div className="space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto" />
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    </div>
  )
}

