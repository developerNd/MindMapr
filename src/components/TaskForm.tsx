import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import type { Task } from "@/lib/store"

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  priority: z.enum(["High", "Medium", "Low"]),
  deadline: z.string().min(1, "Deadline is required"),
  timeBlock: z.enum(["Morning", "Afternoon", "Evening"]),
  tags: z.string().optional(),
  isRecurring: z.boolean(),
  recurrencePattern: z.enum(["Daily", "Weekly", "Monthly"]).optional(),
})

type TaskFormData = z.infer<typeof taskSchema>

interface TaskFormProps {
  onAddTask: (task: Omit<Task, "id" | "status" | "pomodoroCount">) => void
}

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [isRecurring, setIsRecurring] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      priority: "Medium",
      timeBlock: "Morning",
      isRecurring: false,
    },
  })

  const onSubmit = (data: TaskFormData) => {
    onAddTask({
      ...data,
      description: data.description || "",
      deadline: new Date(data.deadline),
      tags: data.tags ? data.tags.split(",").map((tag) => tag.trim()) : [],
    })
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" {...register("title")} />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" {...register("description")} />
      </div>

      <div>
        <Label htmlFor="priority">Priority</Label>
        <Select onValueChange={(value) => register("priority").onChange({ target: { value } })}>
          <SelectTrigger>
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="deadline">Deadline</Label>
        <Input type="date" id="deadline" {...register("deadline")} />
        {errors.deadline && <p className="text-red-500">{errors.deadline.message}</p>}
      </div>

      <div>
        <Label htmlFor="timeBlock">Time Block</Label>
        <Select onValueChange={(value) => register("timeBlock").onChange({ target: { value } })}>
          <SelectTrigger>
            <SelectValue placeholder="Select time block" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Morning">Morning</SelectItem>
            <SelectItem value="Afternoon">Afternoon</SelectItem>
            <SelectItem value="Evening">Evening</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input id="tags" {...register("tags")} />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="isRecurring"
          checked={isRecurring}
          onCheckedChange={(checked) => {
            setIsRecurring(checked)
            register("isRecurring").onChange({ target: { value: checked } })
          }}
        />
        <Label htmlFor="isRecurring">Recurring Task</Label>
      </div>

      {isRecurring && (
        <div>
          <Label htmlFor="recurrencePattern">Recurrence Pattern</Label>
          <Select onValueChange={(value) => register("recurrencePattern").onChange({ target: { value } })}>
            <SelectTrigger>
              <SelectValue placeholder="Select recurrence pattern" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Daily">Daily</SelectItem>
              <SelectItem value="Weekly">Weekly</SelectItem>
              <SelectItem value="Monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <Button type="submit">Add Task</Button>
    </form>
  )
}

