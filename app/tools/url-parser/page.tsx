import type { Metadata } from "next"
import { UrlParserTool } from "@/components/tools/url-parser-tool"
import { ToolLayout } from "@/components/tool-layout"

export const metadata: Metadata = {
  title: "URL解析器 - 在线URL参数解析工具 | DevTools",
  description:
    "免费在线URL解析工具，快速解析URL的协议、主机名、端口、路径、查询参数和锚点。支持URL参数提取和格式化显示。",
  keywords: ["URL解析", "URL参数", "URL工具", "在线解析", "URL分解", "查询参数"],
  openGraph: {
    title: "URL解析器 - 在线URL参数解析工具",
    description: "免费在线URL解析工具，快速解析URL的协议、主机名、端口、路径、查询参数和锚点",
    type: "website",
  },
}

export default function UrlParserPage() {
  return (
    <ToolLayout title="URL 解析器" description="解析 URL 的各个组成部分和查询参数">
      <UrlParserTool />
    </ToolLayout>
  )
}
