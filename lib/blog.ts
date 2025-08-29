import fs from 'fs'
import path from 'path'
import type { Metadata } from 'next'

export type BlogPost = {
  title: string
  slug: string
  date: string
  excerpt: string
  metadata?: Metadata
  publish?: boolean
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const blogDir = path.join(process.cwd(), 'app', 'blog')
  const entries = fs.readdirSync(blogDir, { withFileTypes: true })
  const posts: BlogPost[] = []
  const today = new Date().toISOString().split('T')[0]

  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name === 'page.tsx') continue
    const slug = entry.name
    const pagePath = path.join(blogDir, slug, 'page.tsx')
    if (!fs.existsSync(pagePath)) continue
    try {
      const pageContent = fs.readFileSync(pagePath, 'utf-8')
      const metadata = extractMetadata(pageContent)
      if (metadata) {
        // Only publish if publish is not explicitly false
        const publish = metadata.publish !== false
        // Only include if publish is true or undefined
        if (!publish) continue
        const date = extractDateFromSlug(slug) || today
        // Only include if date is not after today
        if (date > today) continue
        const post: BlogPost = {
          title: metadata.title?.toString() || slug,
          slug,
          date,
          excerpt: metadata.description?.toString() || '',
          metadata,
          publish
        }
        posts.push(post)
      }
    } catch (error) {
      console.warn(`Failed to process blog post: ${slug}`, error)
    }
  }
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

function extractMetadata(content: string): Metadata & { publish?: boolean } | null {
  // Avoid /s flag for compatibility; match across lines manually
  const metadataMatch = content.match(/export const metadata: Metadata = \{([\s\S]*?)\}/)
  if (!metadataMatch) return null
  try {
    const metadataStr = metadataMatch[1]
    const titleMatch = metadataStr.match(/title:\s*["']([^"']+)["']/)
    const descriptionMatch = metadataStr.match(/description:\s*["']([^"']+)["']/)
    const publishMatch = metadataStr.match(/publish:\s*(true|false)/)
    return {
      title: titleMatch?.[1] || '',
      description: descriptionMatch?.[1] || '',
      publish: publishMatch ? publishMatch[1] === 'true' : undefined
    }
  } catch (error) {
    return null
  }
}

function extractDateFromSlug(slug: string): string | null {
  const dateMatch = slug.match(/^(\d{4}-\d{2}-\d{2})/)
  return dateMatch?.[1] || null
}