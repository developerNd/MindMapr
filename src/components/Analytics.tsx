"use client"

import { useStore } from "@/lib/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement)

export default function Analytics() {
  const { tasks, goals, userProfile } = useStore()

  const completedTasks = tasks.filter((task) => task.status === "Completed").length
  const pendingTasks = tasks.length - completedTasks
  const completedGoals = goals.filter((goal) => goal.status === "Completed").length
  const inProgressGoals = goals.length - completedGoals

  const taskData = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        label: "Tasks",
        data: [completedTasks, pendingTasks],
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
      },
    ],
  }

  const goalData = {
    labels: ["Completed", "In Progress"],
    datasets: [
      {
        label: "Goals",
        data: [completedGoals, inProgressGoals],
        backgroundColor: ["rgba(153, 102, 255, 0.6)", "rgba(255, 159, 64, 0.6)"],
      },
    ],
  }

  const streakData = {
    labels: ["Current Streak"],
    datasets: [
      {
        label: "Days",
        data: [userProfile.streak],
        backgroundColor: ["rgba(54, 162, 235, 0.6)"],
      },
    ],
  }

  const pointsData = {
    labels: ["Total Points"],
    datasets: [
      {
        label: "Points",
        data: [userProfile.points],
        backgroundColor: ["rgba(255, 206, 86, 0.6)"],
      },
    ],
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Task Completion</CardTitle>
            <CardDescription>Overview of completed vs pending tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <Bar data={taskData} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Goal Progress</CardTitle>
            <CardDescription>Overview of completed vs in-progress goals</CardDescription>
          </CardHeader>
          <CardContent>
            <Bar data={goalData} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Current Streak</CardTitle>
            <CardDescription>Your consecutive days of task completion</CardDescription>
          </CardHeader>
          <CardContent>
            <Bar data={streakData} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Points</CardTitle>
            <CardDescription>Your accumulated points from completed tasks and goals</CardDescription>
          </CardHeader>
          <CardContent>
            <Bar data={pointsData} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

