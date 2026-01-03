import type { Metadata } from "next"
import { TimestampTool } from "@/components/tools/timestamp-tool"
import { ToolLayout } from "@/components/tool-layout"

export const metadata: Metadata = {
  title: "时间戳转换工具 - Unix时间戳与日期互转 | DevTools",
  description:
    "免费在线时间戳转换工具，支持Unix时间戳与日期时间格式互相转换。快速获取当前时间戳，自定义日期格式，完全在浏览器本地运行。",
  keywords: ["时间戳转换", "Unix时间戳", "时间戳工具", "日期转时间戳", "时间戳转日期", "在线时间戳"],
  openGraph: {
    title: "时间戳转换工具 - Unix时间戳与日期互转",
    description: "免费在线时间戳转换工具，支持Unix时间戳与日期时间格式互相转换",
    type: "website",
  },
}

export default function TimestampPage() {
  return (
    <ToolLayout title="时间戳转换" description="Unix时间戳与日期时间互转">
      <TimestampTool />
    </ToolLayout>
  )
}
