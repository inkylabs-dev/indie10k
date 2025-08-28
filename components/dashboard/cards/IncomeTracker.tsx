"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, DollarSign, TrendingUp } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface IncomeEntry {
  id: string
  amount: number
  source: string
  date: string
  note: string
}

interface Income {
  today: number
  week: number
  allTime: number
  entries: IncomeEntry[]
}

interface IncomeTrackerProps {
  income: Income
  onAddIncome: (entry: { amount: number; source: string; note: string }) => void
}

export function IncomeTracker({ income, onAddIncome }: IncomeTrackerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [amount, setAmount] = useState("")
  const [source, setSource] = useState("")
  const [note, setNote] = useState("")

  const totalRevenue = income?.allTime || 0
  const weeklyRevenue = income?.week || 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (amount && source) {
      onAddIncome({
        amount: Number.parseFloat(amount),
        source,
        note,
      })
      setAmount("")
      setSource("")
      setNote("")
      setIsOpen(false)
    }
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-green-600" />
          Income Tracker
        </CardTitle>
        <CardDescription>Log your revenue streams</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">Total Revenue</div>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm">
          <TrendingUp className="h-4 w-4 text-green-600" />
          <span className="text-green-600 font-medium">${weeklyRevenue.toLocaleString()} this week</span>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="w-full bg-transparent" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Income
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Income Entry</DialogTitle>
              <DialogDescription>Record a new income entry to track your progress.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="amount">Amount ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  required
                />
              </div>
              <div>
                <Label htmlFor="source">Source</Label>
                <Input
                  id="source"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  placeholder="e.g., Client work, Product sales"
                  required
                />
              </div>
              <div>
                <Label htmlFor="note">Note (optional)</Label>
                <Input
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Additional details"
                />
              </div>
              <Button type="submit" className="w-full">
                Add Entry
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
