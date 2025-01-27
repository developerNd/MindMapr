"use client"

import { useStore } from "@/lib/store"
import { Chart } from "@/components/ui/chart"

export default function Analytics() {
  const { tasks, goals, userProfile } = useStore()

  const taskData = [
    { label: "Completed", value: tasks.filter(t => t.status === "Completed").length },
    { label: "Pending", value: tasks.filter(t => t.status === "Pending").length }
  ]

  const goalData = [
    { label: "Completed", value: goals.filter(g => g.status === "Completed").length },
    { label: "In Progress", value: goals.filter(g => g.status === "In Progress").length }
  ]

  const streakData = [
    { label: "Current Streak", value: userProfile.streak }
  ]

  const pointsData = [
    { label: "Total Points", value: userProfile.points }
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Chart title="Task Completion" data={taskData} />
        <Chart title="Goal Progress" data={goalData} />
        <Chart title="Current Streak" data={streakData} />
        <Chart title="Total Points" data={pointsData} />
      </div>
    </div>
  )
}

