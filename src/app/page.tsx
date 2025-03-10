import { Hero } from "@/components/sections/hero"
import { HowItWorks } from "@/components/sections/how-it-works"
import { ServicesList } from "@/components/sections/services-list"
import { CallToAction } from "@/components/sections/call-to-action"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <Hero />
        <HowItWorks />
        <ServicesList />
        <CallToAction />
      </main>
    </div>
  )
}

