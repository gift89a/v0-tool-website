import type { MetadataRoute } from "next"

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://tools.blackhatad.com"
  const currentDate = new Date()

  // 所有工具页面
  const tools = [
    "/tools/json-formatter",
    "/tools/base64",
    "/tools/qr-code",
    "/tools/md5",
    "/tools/url-encode",
    "/tools/timestamp",
  ]

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...tools.map((tool) => ({
      url: `${baseUrl}${tool}`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ]
}
