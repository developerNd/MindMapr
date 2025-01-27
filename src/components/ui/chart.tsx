"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { Progress } from "./progress"

interface ChartProps {
  title?: string
  data: { label: string; value: number }[]
  className?: string
}

const Chart = ({ title, data, className }: ChartProps) => {
  const maxValue = Math.max(...data.map(d => d.value))
  
  return (
    <Card className={cn("w-full", className)}>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className="space-y-4">
        {data.map((item, i) => (
          <div key={i} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>{item.label}</span>
              <span className="text-muted-foreground">{item.value}</span>
            </div>
            <Progress value={(item.value / maxValue) * 100} />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export { Chart }
