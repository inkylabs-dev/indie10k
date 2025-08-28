import { type NextRequest, NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    // Basic email validation
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Persist email to a local JSON file (simple mailing list storage)
    const dataDir = path.join(process.cwd(), "data")
    const filePath = path.join(dataDir, "subscribers.json")

    await fs.mkdir(dataDir, { recursive: true })

    let subscribers: Array<{ email: string; createdAt: string }>
    try {
      const raw = await fs.readFile(filePath, "utf8")
      subscribers = JSON.parse(raw)
      if (!Array.isArray(subscribers)) subscribers = []
    } catch {
      subscribers = []
    }

    const normalized = String(email).trim().toLowerCase()
    const exists = subscribers.some((s) => s.email.toLowerCase() === normalized)
    if (!exists) {
      subscribers.push({ email: normalized, createdAt: new Date().toISOString() })
      await fs.writeFile(filePath, JSON.stringify(subscribers, null, 2), "utf8")
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Subscription error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
