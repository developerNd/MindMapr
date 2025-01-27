import { BottomNav } from "@/components/BottomNav"
import TaskManager from "@/components/TaskManager"
import Header from "@/components/Header"

export default function TasksPage() {
  return (
    <>
      <main className="flex-1 overflow-y-auto pb-16 p-4">
        <Header />
        <TaskManager />
      </main>
      <BottomNav />
    </>
  )
}

