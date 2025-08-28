import Link from "next/link"
import type { Route } from "next"
import Container from "@/components/Container"

type Post = {
  title: string
  slug: string
  date: string
  excerpt: string
}

const posts: Post[] = [
  {
    title: "Our Mission at Indie10k",
    slug: "mission",
    date: "2024-08-28",
    excerpt:
      "Why we’re building Indie10k: a focused path from $0 → $1000 → $10k with structure, momentum, and the right tools.",
  },
]

export default function BlogIndexPage() {
  return (
    <Container>
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Indie10k Blog</h1>
        <p className="text-muted-foreground mt-2">
          Notes on building, shipping, and growing to sustainable indie income.
        </p>
      </div>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <li key={post.slug} className="rounded-lg border p-6 hover:shadow-sm transition-shadow">
            <div className="text-xs text-muted-foreground">{new Date(post.date).toLocaleDateString()}</div>
            <h2 className="mt-2 text-xl font-semibold">
              <Link href={`/blog/${post.slug}`} className="hover:underline">
                {post.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
            <div className="mt-4">
              <Link
                href={`/blog/${post.slug}`}
                className="text-sm font-medium text-primary hover:underline"
              >
                Read more →
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </Container>
  )
}
