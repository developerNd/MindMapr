import { BottomNav } from "@/components/BottomNav"
import GoalManager from "@/components/GoalManager"
import Header from "@/components/Header"

export default function GoalsPage() {
  return (
    <>
      <main className="flex-1 overflow-y-auto pb-16 p-4">
        <Header />
        <GoalManager />
      </main>
      <BottomNav />
    </>
  )
}

