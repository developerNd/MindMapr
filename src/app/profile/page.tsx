import { BottomNav } from "@/components/BottomNav"
import UserProfile from "@/components/UserProfile"
import Header from "@/components/Header"

export default function ProfilePage() {
  return (
    <>
      <main className="flex-1 overflow-y-auto pb-16 p-4">
        <Header />
        <UserProfile />
      </main>
      <BottomNav />
    </>
  )
}

