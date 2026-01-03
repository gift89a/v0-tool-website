import type { Metadata } from "next"
import { ToolLayout } from "@/components/tool-layout"
import { HtmlFormatter } from "@/components/tools/html-formatter"

export const metadata: Metadata = {
  title: "HTML格式化 - 在线HTML美化压缩工具",
  description: "免费的在线HTML格式化工具，支持HTML美化、压缩。纯前端处理，数据安全。适用于开发者快速格式化HTML代码。",
  keywords: ["HTML格式化", "HTML美化", "HTML压缩", "在线工具"],
  openGraph: {
    title: "HTML格式化工具",
    description: "免费的在线HTML格式化美化压缩工具",
    type: "website",
  },
}

export default function HtmlFormatterPage() {
  return (
    <ToolLayout title="HTML 格式化" description="格式化、美化或压缩你的HTML代码">
      <HtmlFormatter />
    </ToolLayout>
  )
}
