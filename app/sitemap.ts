import { getBlogPosts } from "@/lib/blog";
import { NextApiRequest, NextApiResponse } from "next";

const BASE_URL = "https://indie10k.com";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const staticPaths = [
    "",
    "faq",
    "about"
  ];

  const posts = await getBlogPosts();

  const urls = [
    ...staticPaths.map((p) => `${BASE_URL}/${p}`.replace(/\/$/, "")),
    ...posts.map((post) => `${BASE_URL}/blog/${post.slug}`)
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
    .map(
      (url) => `  <url><loc>${url}</loc></url>`
    )
    .join("\n")}
</urlset>`;

  res.setHeader("Content-Type", "application/xml");
  res.status(200).send(xml);
}
