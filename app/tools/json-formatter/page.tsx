import type { Metadata } from "next"
import { JsonFormatter } from "@/components/tools/json-formatter"
import { ToolLayout } from "@/components/tool-layout"

export const metadata: Metadata = {
  title: "JSON格式化工具 - 在线JSON美化压缩验证 | DevTools",
  description:
    "免费在线JSON格式化工具，支持JSON美化、压缩、验证和语法高亮。快速格式化JSON数据，检测JSON语法错误，提供清晰的JSON结构展示。",
  keywords: ["JSON格式化", "JSON美化", "JSON压缩", "JSON验证", "JSON工具", "在线JSON", "JSON parser"],
  openGraph: {
    title: "JSON格式化工具 - 在线JSON美化压缩验证",
    description: "免费在线JSON格式化工具，支持JSON美化、压缩、验证和语法高亮",
    type: "website",
  },
}

export default function JsonFormatterPage() {
  return (
    <ToolLayout title="JSON 格式化工具" description="格式化、压缩和验证JSON数据，支持语法高亮">
      <JsonFormatter />
    </ToolLayout>
  )
}
