import { BottomNav } from "@/components/BottomNav"
import Dashboard from "@/components/Dashboard"

export default function Home() {
  return (
    <>
      <main className="flex-1 overflow-y-auto pb-16">
        <Dashboard />
      </main>
      <BottomNav />
    </>
  )
}

