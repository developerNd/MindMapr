"use client"

import { useEffect, useRef } from "react"
import { useStore, type Task } from "@/lib/store"
import TaskManager from "./TaskManager"
import InspirationQuote from "./InspirationQuote"
import FocusMode from "./FocusMode"
import Header from "./Header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Target, Zap } from "lucide-react"

export default function Dashboard() {
  const { tasks, goals, userProfile, addTask, addGoal } = useStore()
  const initialized = useRef(false)

  useEffect(() => {
    const clearTasks = async () => {
      if (initialized.current) return;
      initialized.current = true;

      // Add dummy data if the store is empty
      if (tasks.length === 0) {
        const initialTasks: Array<Omit<Task, "id" | "status" | "pomodoroCount">> = [
          {
            title: "Complete project proposal",
            description: "Finish the draft and send for review",
            priority: "High" as const,
            deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            timeBlock: "Morning" as const,
            tags: ["Work", "Project"],
            isRecurring: false,
          },
          {
            title: "Go for a run",
            description: "30 minutes jog in the park",
            priority: "Medium" as const,
            deadline: new Date(),
            timeBlock: "Evening" as const,
            tags: ["Health", "Exercise"],
            isRecurring: true,
            recurrencePattern: "Daily" as const,
          }
        ];

        for (const task of initialTasks) {
          await new Promise(resolve => setTimeout(resolve, 100));
          addTask(task);
        }
      }

      if (goals.length === 0) {
        addGoal({
          title: "Learn a new programming language",
          description: "Master the basics of Python",
          deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          type: "Monthly",
        });
      }

      // Move achievement checks inside
      if (tasks.filter((task) => task.status === "Completed").length >= 100) {
        useStore.getState().unlockAchievement("TASK_MASTER");
      }
      if (goals.filter((goal) => goal.status === "Completed").length >= 10) {
        useStore.getState().unlockAchievement("GOAL_CRUSHER");
      }
      if (userProfile.streak >= 7) {
        useStore.getState().unlockAchievement("STREAK_WARRIOR");
      }
    };

    clearTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Intentionally empty as this should only run once on mount

  const pendingTasks = tasks.filter((task) => task.status === "Pending")
  const completedTasks = tasks.filter((task) => task.status === "Completed")
  const completionPercentage = tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0

  return (
    <div className="space-y-6 p-4 max-w-7xl mx-auto">
      <Header />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Progress Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Task Completion</span>
                  <span>{Math.round(completionPercentage)}%</span>
                </div>
                <Progress value={completionPercentage} className="h-2" />
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-muted rounded-lg p-3">
                  <div className="text-2xl font-bold">{pendingTasks.length}</div>
                  <div className="text-sm text-muted-foreground">Pending</div>
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <div className="text-2xl font-bold">{completedTasks.length}</div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <div className="text-2xl font-bold">{goals.length}</div>
                  <div className="text-sm text-muted-foreground">Goals</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">{userProfile.streak} Day Streak</div>
                  <div className="text-sm text-muted-foreground">Keep it up!</div>
                </div>
              </div>
              <div className="text-sm font-medium">
                {userProfile.points} Points Earned
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Tabs defaultValue="tasks" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="tasks">Active Tasks</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <TabsContent value="tasks">
              <TaskManager showCompleted={false} />
            </TabsContent>
            <TabsContent value="completed">
              <TaskManager showCompleted={true} />
            </TabsContent>
          </Tabs>
        </div>
        <div className="space-y-4">
          <FocusMode />
          <InspirationQuote />
        </div>
      </div>
    </div>
  )
}

