import type { Task } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

interface DayPlannerProps {
  tasks: Task[]
  onToggleStatus: (id: string) => void
  onEditTask: (task: Task) => void
  onDeleteTask: (id: string) => void
}

export default function DayPlanner({ tasks, onToggleStatus, onEditTask, onDeleteTask }: DayPlannerProps) {
  const timeBlocks = ["Morning", "Afternoon", "Evening"]

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Day Planner</h3>
      {timeBlocks.map((block) => (
        <div key={block}>
          <h4 className="text-lg font-medium mb-2">{block}</h4>
          <div className="space-y-2">
            {tasks
              .filter((task) => task.timeBlock === block)
              .map((task) => (
                <Card key={task.id} className={task.status === "Completed" ? "bg-green-100 dark:bg-green-900" : ""}>
                  <CardHeader>
                    <CardTitle>{task.title}</CardTitle>
                    <CardDescription>
                      Priority: {task.priority} | Deadline: {format(new Date(task.deadline), "PP")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{task.description}</p>
                    <div className="mt-2 space-x-2">
                      {task.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="space-x-2">
                    <Button onClick={() => onToggleStatus(task.id)}>
                      {task.status === "Pending" ? "Complete" : "Reopen"}
                    </Button>
                    <Button variant="outline" onClick={() => onEditTask(task)}>
                      Edit
                    </Button>
                    <Button variant="destructive" onClick={() => onDeleteTask(task.id)}>
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}

