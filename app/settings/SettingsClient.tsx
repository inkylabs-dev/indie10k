"use client";

import { AppLayout } from "@/components/layout/AppLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function SettingsClient() {
  return (
    <AppLayout>
      <div className="space-y-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-2xl">Settings</CardTitle>
            <CardDescription>Manage your account, preferences, and application settings</CardDescription>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Account</CardTitle>
                <CardDescription>Profile details and goals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input id="displayName" placeholder="Your name" disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goal">Goal Amount ($)</Label>
                  <Input id="goal" type="number" placeholder="10000" disabled />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Notifications</CardTitle>
                <CardDescription>Stay up to date with reminders</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-sm font-medium">Daily Mission Reminders</div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">Get reminded to complete your daily missions</div>
                  </div>
                  <Switch disabled />
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-sm font-medium">Weekly Progress Reports</div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">Receive weekly summaries of your progress</div>
                  </div>
                  <Switch disabled />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What's Next</CardTitle>
                <CardDescription>More controls coming soon</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Full settings functionality will be available soon, including account management, preferences, and integrations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}