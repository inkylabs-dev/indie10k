import { getBlogPosts } from "@/lib/blog";

export async function GET() {
  const BASE_URL = "https://indie10k.com";
  const staticPaths = ["", "faq", "about"];
  const posts = await getBlogPosts();

  const urls = [
    ...staticPaths.map((p) => `${BASE_URL}/${p}`.replace(/\/$/, "")),
    ...posts.map((post) => `${BASE_URL}/blog/${post.slug}`)
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((url) => `  <url><loc>${url}</loc></url>`)
    .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml"
    }
  });
}
