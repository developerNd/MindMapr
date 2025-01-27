"use client"

import { Home, CheckSquare, Target, BarChart2, User } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: CheckSquare, label: "Tasks", path: "/tasks" },
  { icon: Target, label: "Goals", path: "/goals" },
  { icon: BarChart2, label: "Analytics", path: "/analytics" },
  { icon: User, label: "Profile", path: "/profile" },
]

export function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border shadow-lg">
      <ul className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <li key={item.path}>
            <button
              onClick={() => router.push(item.path)}
              className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${
                pathname === item.path ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              <item.icon className="h-5 w-5 mb-1" />
              <span className="text-xs">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

