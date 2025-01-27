"use client"

import { useState } from "react"
import { useStore } from "@/lib/store"
import GoalForm from "./GoalForm"
import GoalList from "./GoalList"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function GoalManager() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { goals, addGoal, editGoal, deleteGoal, toggleGoalStatus } = useStore()

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Goal Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add New Goal</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Goal</DialogTitle>
              <DialogDescription>Create a new goal to track your progress.</DialogDescription>
            </DialogHeader>
            <GoalForm
              onAddGoal={(goal) => {
                addGoal(goal)
                setIsDialogOpen(false)
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
      <GoalList goals={goals} onToggleStatus={toggleGoalStatus} onEditGoal={editGoal} onDeleteGoal={deleteGoal} />
    </div>
  )
}

