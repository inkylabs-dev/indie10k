export const mockData = {
  user: {
    name: "Alex",
    goal: 10000, // Updated goal to $10k as per requirements
    currentRevenue: 2340, // Renamed from 'current' to 'currentRevenue' and increased value
    monthlyGrowth: 15.2, // Added monthly growth percentage
    articlesWritten: 6,
    missionsCompleted: 7,
    ctrAvg: 0.024,
  },
  todayMission: {
    id: "m-2025-08-28",
    title: "Publish your second blog post",
    expectedImpact: { visitsPerMonth: 50, adsenseUsdPerMonth: 5 },
    subtasks: [
      { id: "s1", text: "Draft 1,200–1,500 words on: Best free tools for indie devs", done: false },
      { id: "s2", text: "Add 3 internal links + 1 CTA", done: false },
      { id: "s3", text: "Share to Reddit & X", done: false },
    ],
    resources: [
      { label: "Outline template", url: "#" },
      { label: "Reddit posting checklist", url: "#" },
    ],
    notes: "Focus on beginner-friendly picks and real screenshots.",
    completed: false,
  },
  income: {
    today: 12.5,
    week: 89.2,
    total: 2340, // Added total field for components
    thisMonth: 456.7, // Added thisMonth field for components
    allTime: 2340,
    entries: [
      { id: "i1", date: "2025-08-27", source: "AdSense", amount: 12.5, note: "blog post #1" },
      { id: "i2", date: "2025-08-26", source: "Stripe", amount: 45.0, note: "mini-ebook" },
      { id: "i3", date: "2025-08-25", source: "Affiliate", amount: 18.7, note: "tool referral" },
      { id: "i4", date: "2025-08-24", source: "Gumroad", amount: 25.0, note: "template" },
      { id: "i5", date: "2025-08-23", source: "AdSense", amount: 8.3, note: "evergreen post" },
    ],
  },
  streaks: Array.from({ length: 84 }, (_, i) => ({
    date: new Date(Date.now() - (83 - i) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    count: Math.floor(Math.random() * 5),
  })),
  revenueSeries: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    revenue: Math.random() * 50 + 10, // Renamed from 'total' to 'revenue'
    growth: (Math.random() - 0.5) * 20, // Added growth field
  })),
  activity: [
    {
      id: "a1",
      time: "2025-08-27T10:22:00Z",
      type: "mission",
      text: "Marked 'Publish your second blog post' complete.",
    },
    { id: "a2", time: "2025-08-27T10:05:00Z", type: "income", text: "Added income $12.50 (AdSense)." },
    { id: "a3", time: "2025-08-26T18:40:00Z", type: "index", text: "New post indexed (GSC)." },
    { id: "a4", time: "2025-08-26T15:30:00Z", type: "income", text: "Added income $45.00 (Stripe)." },
    { id: "a5", time: "2025-08-25T12:15:00Z", type: "mission", text: "Completed daily writing task." },
  ],
}
