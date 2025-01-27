import { BottomNav } from "@/components/BottomNav"
import Analytics from "@/components/Analytics"
import Header from "@/components/Header"

export default function AnalyticsPage() {
  return (
    <>
      <main className="flex-1 overflow-y-auto pb-16 p-4">
        <Header />
        <Analytics />
      </main>
      <BottomNav />
    </>
  )
}

