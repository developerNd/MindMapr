"use client"

import React from 'react'
import { useStore } from "@/lib/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function UserProfile() {
  const { userProfile } = useStore()

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
        <CardDescription>Your progress and achievements</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>Points: {userProfile.points}</p>
          <p>Streak: {userProfile.streak} days</p>
          <div>
            <h4 className="font-semibold mb-1">Achievements:</h4>
            <div className="flex flex-wrap gap-2">
              {userProfile.achievements.map((achievement) => (
                <Badge key={achievement.id} variant={achievement.unlocked ? "default" : "secondary"}>
                  {achievement.title}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

