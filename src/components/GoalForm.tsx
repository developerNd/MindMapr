import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import type { Goal } from "@/lib/store"

const goalSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  deadline: z.string().min(1, "Deadline is required"),
  type: z.enum(["Weekly", "Monthly"]),
})

type GoalFormData = z.infer<typeof goalSchema>

interface GoalFormProps {
  onAddGoal: (goal: Omit<Goal, "id" | "status">) => void
}

export default function GoalForm({ onAddGoal }: GoalFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<GoalFormData>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      type: "Weekly",
    },
  })

  const onSubmit = (data: GoalFormData) => {
    onAddGoal({
      ...data,
      description: data.description || "",
      deadline: new Date(data.deadline),
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
        <Label htmlFor="deadline">Deadline</Label>
        <Input type="date" id="deadline" {...register("deadline")} />
        {errors.deadline && <p className="text-red-500">{errors.deadline.message}</p>}
      </div>

      <div>
        <Label htmlFor="type">Goal Type</Label>
        <Select onValueChange={(value) => register("type").onChange({ target: { value } })}>
          <SelectTrigger>
            <SelectValue placeholder="Select goal type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Weekly">Weekly</SelectItem>
            <SelectItem value="Monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit">Add Goal</Button>
    </form>
  )
}

