import type { Metadata } from "next"
import { UrlEncodeTool } from "@/components/tools/url-encode-tool"
import { ToolLayout } from "@/components/tool-layout"

export const metadata: Metadata = {
  title: "URL编解码工具 - 在线URL编码解码 | DevTools",
  description:
    "免费在线URL编码解码工具，支持URL编码（encodeURIComponent）和解码。快速处理URL参数，完全在浏览器本地运行。",
  keywords: ["URL编码", "URL解码", "URL编解码", "在线URL工具", "encodeURIComponent", "URL参数"],
  openGraph: {
    title: "URL编解码工具 - 在线URL编码解码",
    description: "免费在线URL编码解码工具，支持URL编码和解码",
    type: "website",
  },
}

export default function UrlEncodePage() {
  return (
    <ToolLayout title="URL 编解码" description="URL编码和解码工具">
      <UrlEncodeTool />
    </ToolLayout>
  )
}
