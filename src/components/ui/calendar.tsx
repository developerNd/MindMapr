"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

export type CalendarProps = {
  className?: string
  selected?: Date
  onSelect?: (date: Date) => void
}

const Calendar = ({ className, selected, onSelect }: CalendarProps) => {
  return (
    <input
      type="date"
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      value={selected ? format(selected, 'yyyy-MM-dd') : ''}
      onChange={(e) => onSelect?.(new Date(e.target.value))}
    />
  )
}

Calendar.displayName = "Calendar"

export { Calendar }
