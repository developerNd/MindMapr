"use client"

import { useState } from "react"
import { useStore } from "@/lib/store"
import TaskForm from "./TaskForm"
import TaskList from "./TaskList"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface TaskManagerProps {
  showCompleted?: boolean
}

export default function TaskManager({ showCompleted = false }: TaskManagerProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { addTask } = useStore()

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">
          {showCompleted ? "Completed Tasks" : "Tasks"}
        </h2>
        {!showCompleted && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Task</DialogTitle>
                <DialogDescription>Create a new task to manage your work effectively.</DialogDescription>
              </DialogHeader>
              <TaskForm
                onAddTask={(task) => {
                  addTask(task)
                  setIsDialogOpen(false)
                }}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
      <TaskList showCompleted={showCompleted} />
    </div>
  )
}

