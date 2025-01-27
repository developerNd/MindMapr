import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Task {
  id: string
  title: string
  description?: string
  priority: "High" | "Medium" | "Low"
  deadline: Date
  status: "Pending" | "Completed"
  timeBlock: "Morning" | "Afternoon" | "Evening"
  tags: string[]
  isRecurring: boolean
  recurrencePattern?: "Daily" | "Weekly" | "Monthly"
  pomodoroCount: number
}

export interface Goal {
  id: string
  title: string
  description?: string
  deadline: Date
  status: "In Progress" | "Completed"
  type: "Weekly" | "Monthly"
}

interface Achievement {
  id: string
  title: string
  description: string
  unlocked: boolean
}

interface UserProfile {
  points: number
  streak: number
  achievements: Achievement[]
}

interface TaskMasterStore {
  tasks: Task[]
  goals: Goal[]
  userProfile: UserProfile
  addTask: (task: Omit<Task, "id" | "status" | "pomodoroCount">) => void
  editTask: (task: Task) => void
  deleteTask: (id: string) => void
  toggleTaskStatus: (id: string) => void
  addGoal: (goal: Omit<Goal, "id" | "status">) => void
  editGoal: (goal: Goal) => void
  deleteGoal: (id: string) => void
  toggleGoalStatus: (id: string) => void
  incrementPomodoroCount: (id: string) => void
  addPoints: (points: number) => void
  incrementStreak: () => void
  resetStreak: () => void
  unlockAchievement: (achievementId: string) => void
  resetStore: () => void
}

const initialAchievements: Achievement[] = [
  { id: "TASK_MASTER", title: "Task Master", description: "Complete 100 tasks", unlocked: false },
  { id: "GOAL_CRUSHER", title: "Goal Crusher", description: "Complete 10 goals", unlocked: false },
  { id: "STREAK_WARRIOR", title: "Streak Warrior", description: "Maintain a 7-day streak", unlocked: false },
]

export const useStore = create<TaskMasterStore>()(
  persist(
    (set) => ({
      tasks: [],
      goals: [],
      userProfile: {
        points: 0,
        streak: 0,
        achievements: initialAchievements,
      },
      addTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, { 
            ...task, 
            id: `task-${Date.now()}-${Math.random().toString(36).substring(2)}`,
            status: "Pending", 
            pomodoroCount: 0 
          }],
        })),
      editTask: (editedTask) =>
        set((state) => ({
          tasks: state.tasks.map((task) => (task.id === editedTask.id ? editedTask : task)),
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      toggleTaskStatus: (id) =>
        set((state) => {
          // Find the task index
          const taskIndex = state.tasks.findIndex(t => t.id === id);
          if (taskIndex === -1) return state; // Return unchanged state if task not found
          
          // Create a new tasks array with the updated task
          const newTasks = [...state.tasks];
          const currentTask = newTasks[taskIndex];
          const newStatus = currentTask.status === "Pending" ? "Completed" : "Pending";
          
          newTasks[taskIndex] = {
            ...currentTask,
            status: newStatus
          };

          // Return new state
          return {
            ...state,
            tasks: newTasks,
            userProfile: newStatus === "Completed" ? {
              ...state.userProfile,
              points: state.userProfile.points + 10,
              streak: state.userProfile.streak + 1
            } : state.userProfile
          };
        }),
      addGoal: (goal) =>
        set((state) => ({
          goals: [...state.goals, { 
            ...goal, 
            id: `goal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, 
            status: "In Progress" 
          }],
        })),
      editGoal: (editedGoal) =>
        set((state) => ({
          goals: state.goals.map((goal) => (goal.id === editedGoal.id ? editedGoal : goal)),
        })),
      deleteGoal: (id) =>
        set((state) => ({
          goals: state.goals.filter((goal) => goal.id !== id),
        })),
      toggleGoalStatus: (id) =>
        set((state) => ({
          ...state,
          goals: state.goals.map((goal) =>
            goal.id === id ? { ...goal, status: goal.status === "In Progress" ? "Completed" : "In Progress" as const } : goal
          )
        })),
      incrementPomodoroCount: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, pomodoroCount: task.pomodoroCount + 1 } : task,
          ),
        })),
      addPoints: (points) =>
        set((state) => ({
          userProfile: {
            ...state.userProfile,
            points: state.userProfile.points + points,
          },
        })),
      incrementStreak: () =>
        set((state) => ({
          userProfile: {
            ...state.userProfile,
            streak: state.userProfile.streak + 1,
          },
        })),
      resetStreak: () =>
        set((state) => ({
          userProfile: {
            ...state.userProfile,
            streak: 0,
          },
        })),
      unlockAchievement: (achievementId) =>
        set((state) => ({
          userProfile: {
            ...state.userProfile,
            achievements: state.userProfile.achievements.map((achievement) =>
              achievement.id === achievementId ? { ...achievement, unlocked: true } : achievement,
            ),
          },
        })),
      resetStore: () => {
        set({
          tasks: [],
          goals: [],
          userProfile: {
            points: 0,
            streak: 0,
            achievements: initialAchievements,
          }
        })
        // Clear persisted data
        window?.localStorage?.removeItem('taskmaster-store')
      },
    }),
    {
      name: "taskmaster-store",
    },
  ),
)

