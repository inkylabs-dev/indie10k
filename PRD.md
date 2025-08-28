# Indie10k - Figma Wireframe Specifications

## 1. Landing Page (Public Website)

### Layout Structure
```
┌─────────────────────────────────────────────────────────────┐
│                     HEADER                                  │
│  [Logo: Indie10k]              [Login] [Sign Up]          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   HERO SECTION                             │
│                                                             │
│           Stop guessing. Start growing.                    │
│           Make your first $1000 online.                    │
│                                                             │
│    Turn daily actions into revenue with guided missions    │
│         that actually move the needle for your business    │
│                                                             │
│         [🚀 Start Free 30-Day Challenge]                   │
│                                                             │
│               ✓ No credit card required                    │
│               ✓ Join 2,847 indie makers                    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                 HOW IT WORKS SECTION                       │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │ 📋 Daily     │  │ 💰 Income    │  │ 📊 Progress  │        │
│  │ Missions     │  │ Tracking     │  │ Dashboard    │        │
│  │             │  │             │  │             │        │
│  │ Get specific │  │ Log every   │  │ See your    │        │
│  │ tasks that   │  │ dollar you  │  │ growth in   │        │
│  │ directly     │  │ make and    │  │ real-time   │        │
│  │ impact       │  │ track your  │  │ with charts │        │
│  │ revenue      │  │ momentum    │  │ & streaks   │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                 TESTIMONIALS SECTION                       │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │ "Went from  │  │ "Finally hit │  │ "The daily  │        │
│  │ $0 to $847  │  │ my first    │  │ missions    │        │
│  │ in 23 days" │  │ $1k month!" │  │ keep me     │        │
│  │             │  │             │  │ focused"    │        │
│  │ — Sarah K.  │  │ — Mike D.   │  │ — Alex R.   │        │
│  │ SaaS Founder│  │ Newsletter  │  │ App Dev     │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

### Design Specifications
- **Typography**: Inter, 48px hero headline, 18px body text
- **Colors**: White background, #1F2937 text, #3B82F6 CTA button
- **Cards**: 8px border radius, subtle shadow (0 1px 3px rgba(0,0,0,0.1))
- **Spacing**: 64px between sections, 24px card padding
- **CTA Button**: 52px height, 24px padding, rounded corners

---

## 2. Dashboard (After Login)

### Layout Structure
```
┌─────────────────────────────────────────────────────────────┐
│ [☰] Indie10k    Dashboard         [🔔] [👤] Alex            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ ┌─────────────────────────┐ ┌─────────────────────────────┐ │
│ │     TODAY'S MISSION     │ │      GOAL PROGRESS          │ │
│ │                         │ │                             │ │
│ │ Day 6: Publish 2nd      │ │ Target: $1,000              │ │
│ │ blog post               │ │ Current: $23                │ │
│ │                         │ │                             │ │
│ │ ☐ Write 800+ words      │ │ ████░░░░░░░░░░░░ 2.3%       │ │
│ │ ☐ Add 2 images          │ │                             │ │
│ │ ☐ Publish & share       │ │ 🎯 $977 to go              │ │
│ │ ☐ Post in 3 communities │ │                             │ │
│ │                         │ │ Est. completion: 47 days    │ │
│ │ [Mark Complete]         │ │                             │ │
│ └─────────────────────────┘ └─────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────┐ ┌─────────────────────────────┐ │
│ │    INCOME TRACKER       │ │         ANALYTICS           │ │
│ │                         │ │                             │ │
│ │ Log today's income:     │ │ ┌─ Contribution Heatmap ──┐ │ │
│ │ ┌─────────┐ [Add Entry] │ │ │ ████▓▓▓░░░████▓▓▓░░░   │ │ │
│ │ │  $      │             │ │ │ ████▓▓▓░░░████▓▓▓░░░   │ │ │
│ │ └─────────┘             │ │ │ ████▓▓▓░░░████▓▓▓░░░   │ │ │
│ │                         │ │ └─────────────────────────┘ │ │
│ │ Today: $0               │ │                             │ │
│ │ This week: $18          │ │ ┌─ Revenue Trend (30d) ───┐ │ │
│ │ All time: $23           │ │ │     ╭─╮                 │ │ │
│ │                         │ │ │   ╭─╯ ╰╮                │ │ │
│ │ Recent entries:         │ │ │ ╭─╯    ╰─╮              │ │ │
│ │ • $18 - Blog sponsor    │ │ │╭╯        ╰──────────    │ │ │
│ │ • $5 - Affiliate sale   │ │ └─────────────────────────┘ │ │
│ └─────────────────────────┘ └─────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Design Specifications
- **Layout**: 2x2 grid with 16px gaps
- **Card dimensions**: Each card ~400px width, auto height
- **Progress bar**: 8px height, rounded, #3B82F6 fill
- **Heatmap**: GitHub-style contribution squares, 12px each
- **Input field**: 44px height, border radius 6px
- **Typography**: 16px card titles, 14px body text

---

## 3. Daily Mission Expanded View

### Layout Structure
```
┌─────────────────────────────────────────────────────────────┐
│ [←] Back to Dashboard                           Day 6 of 30 │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│               📝 Publish 2nd blog post                     │
│                                                             │
│   Writing and publishing quality content is one of the     │
│   most effective ways to attract your first customers.     │
│   This mission will help you build authority and drive     │
│   organic traffic to your landing page.                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    TASKS CHECKLIST                         │
│                                                             │
│ ☐ Write 800+ words on a topic your audience cares about    │
│ ☐ Add 2 relevant images or screenshots                     │
│ ☐ Include 1 call-to-action linking to your product         │
│ ☐ Publish on your blog/Medium/Dev.to                       │
│ ☐ Share in 3 relevant communities (Reddit, Discord, etc.)  │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                  EXPECTED OUTCOME                           │
│                                                             │
│ 📈 50-200 new visitors to your site                        │
│ 💰 Potential revenue: $0-50 (if you get signups)          │
│ 🎯 Authority building for future sales                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                     RESOURCES                               │
│                                                             │
│ 📚 Blog post templates for SaaS                           │
│ 🎨 Free stock photos (Unsplash, Pexels)                   │
│ 🌐 Communities to share in (curated list)                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│              [✅ Mark Mission Complete]                     │
│                                                             │
│        Completed 5 of 6 missions this week! 🔥            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Design Specifications
- **Header**: Emoji + large title (24px)
- **Sections**: Clear visual separation with cards
- **Checkboxes**: 20px interactive checkboxes
- **Complete button**: Full width, 52px height, prominent green (#10B981)
- **Progress indicator**: Subtle text with streak emoji

---

## 4. Mobile Views

### Mobile Dashboard Layout
```
┌─────────────────┐
│ ☰ Indie10k   👤 │
└─────────────────┘

┌─────────────────┐
│  TODAY'S MISSION│
│                 │
│ Day 6: Publish  │
│ 2nd blog post   │
│                 │
│ ☐ Write 800+    │
│ ☐ Add images    │
│ ☐ Publish       │
│ ☐ Share         │
│                 │
│ [Mark Complete] │
└─────────────────┘

┌─────────────────┐
│ GOAL PROGRESS   │
│                 │
│ $23 / $1,000    │
│ ████░░░░░░░ 2%  │
│                 │
│ 🎯 $977 to go   │
└─────────────────┘

┌─────────────────┐
│ QUICK ADD       │
│                 │
│ ┌─────┐ [+ Add] │
│ │  $  │         │
│ └─────┘         │
│                 │
│ Week: $18       │
│ Total: $23      │
└─────────────────┘

┌─────────────────┐
│    ANALYTICS    │
│                 │
│ ████▓▓▓░░░████  │
│ ████▓▓▓░░░████  │
│                 │
│ 6-day streak 🔥 │
└─────────────────┘
```

### Mobile Revenue Input (Bottom Sheet)
```
┌─────────────────┐
│ ═══════════════ │ ← Drag handle
│                 │
│   Add Income    │
│                 │
│ Amount          │
│ ┌─────────────┐ │
│ │ $           │ │
│ └─────────────┘ │
│                 │
│ Source          │
│ ┌─────────────┐ │
│ │ Freelance   ▼│ │
│ └─────────────┘ │
│                 │
│ [Cancel] [Save] │
└─────────────────┘
```

### Mobile Design Specifications
- **Card stacking**: Vertical layout with 12px gaps
- **Touch targets**: Minimum 44px height for all interactive elements
- **Typography**: 18px card titles, 16px body text
- **Bottom sheet**: Slides up from bottom, rounded top corners
- **Floating element**: Today's mission stays prominent at top

---

## Style Guide Summary

### Colors
- **Background**: #FFFFFF (white)
- **Cards**: #F9FAFB (light gray)
- **Text**: #1F2937 (dark gray)
- **Accent**: #3B82F6 (blue)
- **Success**: #10B981 (green)
- **Progress**: #E5E7EB (light gray) / #3B82F6 (blue fill)

### Typography
- **Font**: Inter (primary), system sans-serif (fallback)
- **Sizes**: 48px (hero), 24px (page titles), 18px (card titles), 16px (body), 14px (small)
- **Weights**: 600 (semibold for titles), 400 (regular for body)

### Components
- **Border radius**: 8px (cards), 6px (inputs), 4px (buttons)
- **Shadows**: 0 1px 3px rgba(0,0,0,0.1) (subtle)
- **Spacing**: 8px, 16px, 24px, 32px, 64px (consistent scale)
- **Grid**: 16px gutters, responsive breakpoints

### Icons
- Use simple, outlined icons (Heroicons style)
- 20px standard size, 24px for emphasis
- Emoji for personality in missions and achievements

---

## Implementation Notes

1. **Responsive breakpoints**: 
   - Desktop: 1200px+
   - Tablet: 768px - 1199px  
   - Mobile: < 768px

2. **Interactive states**:
   - Hover: Subtle scale (transform: scale(1.02))
   - Active: Slight press effect
   - Focus: Blue outline for accessibility

3. **Data visualization**:
   - Use CSS Grid for heatmap squares
   - SVG for line charts (consider Chart.js integration)
   - Animate progress bars on load

4. **Accessibility**:
   - Proper heading hierarchy (h1, h2, h3)
   - ARIA labels for interactive elements
   - Color contrast ratio 4.5:1 minimum
   - Keyboard navigation support

---

## 5. Coach (AI Chat for Indie Hackers)

### Feature Overview
Coach is an AI-powered chat assistant designed to provide real-time consultation, feedback, and actionable suggestions for indie hackers. It helps users brainstorm, unblock, and optimize their business strategies directly within the dashboard.

### User Flow
```
┌───────────────────────────────────────────────┐
│ [💬] Coach                                   │
└───────────────────────────────────────────────┘
┌───────────────────────────────────────────────┐
│  [Chat window]                               │
│  ──────────────────────────────────────────  │
│  User: "How can I get my first 10 users?"    │
│  Coach: "Here are 3 proven tactics..."       │
│  ...                                         │
│  [Type your question…] [Send]                │
└───────────────────────────────────────────────┘
```

### Key Capabilities
- Personalized, context-aware suggestions for indie hackers
- Guidance on growth, marketing, product, and productivity
- Can reference user's missions, income, and analytics for tailored advice
- Quick links to resources, templates, and next steps
- Friendly, motivational tone

### Design Specifications
- **Access**: Floating chat button on dashboard (bottom right)
- **Chat window**: 400px width (desktop), full width (mobile sheet)
- **Input**: 44px height, rounded, persistent at bottom
- **Coach avatar**: Simple AI icon or emoji (🤖)
- **Message bubbles**: 8px radius, blue for Coach, gray for user
- **Onboarding**: First-time intro message with tips/examples
- **Accessibility**: ARIA live region for chat, keyboard accessible
