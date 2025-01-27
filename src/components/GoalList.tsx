import type { Goal } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"

interface GoalListProps {
  goals: Goal[]
  onToggleStatus: (id: string) => void
  onEditGoal: (goal: Goal) => void
  onDeleteGoal: (id: string) => void
}

export default function GoalList({ goals, onToggleStatus, onEditGoal, onDeleteGoal }: GoalListProps) {
  return (
    <div className="space-y-4">
      {goals.map((goal) => (
        <Card key={goal.id} className={goal.status === "Completed" ? "bg-green-100 dark:bg-green-900" : ""}>
          <CardHeader>
            <CardTitle>{goal.title}</CardTitle>
            <CardDescription>
              Type: {goal.type} | Deadline: {format(new Date(goal.deadline), "PP")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>{goal.description}</p>
          </CardContent>
          <CardFooter className="space-x-2">
            <Button onClick={() => onToggleStatus(goal.id)}>
              {goal.status === "In Progress" ? "Complete" : "Reopen"}
            </Button>
            <Button variant="outline" onClick={() => onEditGoal(goal)}>
              Edit
            </Button>
            <Button variant="destructive" onClick={() => onDeleteGoal(goal.id)}>
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

