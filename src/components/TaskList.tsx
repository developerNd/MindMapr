import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { MoreVertical, Check, X, Clock, ArrowUp, ArrowRight, ArrowDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useStore } from "@/lib/store"
import { useMemo, useCallback } from "react"

const priorityIcons = {
  High: <ArrowUp className="h-4 w-4 text-red-500" />,
  Medium: <ArrowRight className="h-4 w-4 text-yellow-500" />,
  Low: <ArrowDown className="h-4 w-4 text-green-500" />,
}

interface TaskListProps {
  showCompleted?: boolean
}

const TaskList = ({ showCompleted = false }: TaskListProps) => {
  const { tasks, editTask, deleteTask, toggleTaskStatus } = useStore()
  
  const filteredAndSortedTasks = useMemo(() => 
    [...tasks]
      .filter(task => task.status === (showCompleted ? "Completed" : "Pending"))
      .sort((a, b) => {
        const priorityOrder = { High: 3, Medium: 2, Low: 1 }
        if (a.priority !== b.priority) return priorityOrder[b.priority] - priorityOrder[a.priority]
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
      }),
    [tasks, showCompleted]
  )

  const handleStatusToggle = useCallback((taskId: string) => {
    toggleTaskStatus(taskId)
  }, [toggleTaskStatus])

  return (
    <div className="space-y-4">
      {filteredAndSortedTasks.map((task) => (
        <Card key={task.id}>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-2">
                <div className="mt-1">{priorityIcons[task.priority]}</div>
                <div>
                  <h3 className="font-semibold">{task.title}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {format(new Date(task.deadline), "PP")}
                  </p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => editTask(task)}>Edit</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => deleteTask(task.id)}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="mt-2 space-x-2">
              {task.tags.map((tag, index) => (
                <Badge 
                  key={`${task.id}-tag-${index}`} 
                  variant="secondary" 
                  className="text-xs"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="p-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full" 
              onClick={() => handleStatusToggle(task.id)}
            >
              {task.status === "Pending" ? (
                <>
                  <Check className="mr-2 h-4 w-4" /> Mark Complete
                </>
              ) : (
                <>
                  <X className="mr-2 h-4 w-4" /> Mark Incomplete
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default TaskList

