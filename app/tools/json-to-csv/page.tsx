import type { Metadata } from "next"
import { ToolLayout } from "@/components/tool-layout"
import { JsonToCsvTool } from "@/components/tools/json-to-csv-tool"

export const metadata: Metadata = {
  title: "JSON转CSV - 在线JSON转CSV工具",
  description: "免费的在线JSON转CSV工具，快速将JSON数据转换为CSV格式。纯前端处理，数据安全。适用于数据导出和分析。",
  keywords: ["JSON转CSV", "数据转换", "CSV导出", "在线工具"],
  openGraph: {
    title: "JSON转CSV工具",
    description: "免费的在线JSON转CSV转换工具",
    type: "website",
  },
}

export default function JsonToCsvPage() {
  return (
    <ToolLayout title="JSON 转 CSV" description="将JSON数据转换为CSV格式">
      <JsonToCsvTool />
    </ToolLayout>
  )
}
