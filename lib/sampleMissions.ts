import { Mission } from './types';

export const sampleMissions: Mission[] = [
  {
    id: "m1",
    title: "Draft blog: Best free tools for indie devs",
    status: "today",
    type: "write",
    priority: "high",
    expectedImpact: { visitsPerMonth: 50, revenueUsdPerMonth: 5 },
    dueDate: "2025-08-30T00:00:00.000Z",
    createdAt: "2025-08-20T00:00:00.000Z",
    tags: ["blog", "beginner"],
    subtasks: [
      { id: "m1s1", text: "Outline H2/H3", done: true },
      { id: "m1s2", text: "Write 1200–1500 words", done: false },
      { id: "m1s3", text: "Add 3 internal links + 1 CTA", done: false }
    ],
    notes: "Use screenshots; keep tone friendly."
  },
  {
    id: "m2",
    title: "Publish post & share to Reddit + X",
    status: "in_progress",
    type: "publish",
    priority: "medium",
    expectedImpact: { visitsPerMonth: 30, revenueUsdPerMonth: 2.5 },
    createdAt: "2025-08-22T00:00:00.000Z",
    tags: ["distribution"],
    subtasks: [
      { id: "m2s1", text: "Format images", done: false },
      { id: "m2s2", text: "Write Reddit title", done: false },
      { id: "m2s3", text: "Schedule X post", done: false }
    ]
  },
  {
    id: "m3",
    title: "SEO: update titles for low CTR posts",
    status: "backlog",
    type: "seo",
    priority: "medium",
    expectedImpact: { visitsPerMonth: 40, revenueUsdPerMonth: 3.2 },
    createdAt: "2025-08-10T00:00:00.000Z",
    tags: ["seo", "gsc"],
    subtasks: [
      { id: "m3s1", text: "Pull GSC queries", done: false },
      { id: "m3s2", text: "Rewrite 3 titles", done: false }
    ],
    notes: "Target posts with high impressions, low CTR."
  },
  {
    id: "m4",
    title: "Set up newsletter CTA",
    status: "done",
    type: "build",
    priority: "low",
    expectedImpact: { visitsPerMonth: 0, revenueUsdPerMonth: 1.0 },
    createdAt: "2025-08-01T00:00:00.000Z",
    tags: ["email"],
    subtasks: [{ id: "m4s1", text: "Embed form", done: true }]
  },
  {
    id: "m5",
    title: "Optimize homepage loading speed",
    status: "backlog",
    type: "build",
    priority: "high",
    expectedImpact: { visitsPerMonth: 100, revenueUsdPerMonth: 8 },
    dueDate: "2025-09-05T00:00:00.000Z",
    createdAt: "2025-08-15T00:00:00.000Z",
    tags: ["performance", "seo"],
    subtasks: [
      { id: "m5s1", text: "Audit Core Web Vitals", done: false },
      { id: "m5s2", text: "Compress images", done: false },
      { id: "m5s3", text: "Minimize JS bundles", done: false }
    ],
    notes: "Current LCP is 3.2s, target <2.5s"
  },
  {
    id: "m6",
    title: "Launch affiliate program",
    status: "today",
    type: "distribution",
    priority: "medium",
    expectedImpact: { visitsPerMonth: 25, revenueUsdPerMonth: 15 },
    createdAt: "2025-08-25T00:00:00.000Z",
    tags: ["monetization", "partners"],
    subtasks: [
      { id: "m6s1", text: "Set up tracking system", done: true },
      { id: "m6s2", text: "Create partner onboarding", done: false },
      { id: "m6s3", text: "Design promotional materials", done: false }
    ]
  }
];