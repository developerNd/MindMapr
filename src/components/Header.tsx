import { ModeToggle } from "./mode-toggle"

export default function Header() {
  return (
    <header className="flex justify-between items-center py-4 border-b border-border">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 text-transparent bg-clip-text">
        TaskMaster
      </h1>
      <ModeToggle />
    </header>
  )
}

