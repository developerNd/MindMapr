"use client"

import React from 'react'
import { useState } from "react"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Focus, Clock } from "lucide-react"

const FocusMode = () => {
  const [isFocusMode, setIsFocusMode] = useState(false)
  const { tasks } = useStore()

  const currentTask = tasks.find((task) => task.status === "Pending")

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Focus className="h-5 w-5" />
          Focus Mode
        </CardTitle>
        <CardDescription>Concentrate on your current task</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={() => setIsFocusMode(!isFocusMode)}
          variant={isFocusMode ? "secondary" : "default"}
          className="w-full"
        >
          {isFocusMode ? "Exit Focus Mode" : "Enter Focus Mode"}
        </Button>
        {isFocusMode && currentTask && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-lg mb-2">{currentTask.title}</h3>
            <p className="text-sm text-muted-foreground mb-2">{currentTask.description}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Due: {format(new Date(currentTask.deadline), "PP")}</span>
            </div>
            <div className="mt-2 space-x-2">
              {currentTask.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default FocusMode

