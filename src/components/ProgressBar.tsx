import { Progress } from "@/components/ui/progress"

interface ProgressBarProps {
  percentage: number
}

export default function ProgressBar({ percentage }: ProgressBarProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium">Daily Progress</h3>
      <Progress value={percentage} className="w-full" />
      <p className="text-sm text-muted-foreground">{percentage.toFixed(0)}% completed</p>
    </div>
  )
}

