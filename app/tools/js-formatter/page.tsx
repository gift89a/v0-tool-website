import type { Metadata } from "next"
import { ToolLayout } from "@/components/tool-layout"
import { JsFormatter } from "@/components/tools/js-formatter"

export const metadata: Metadata = {
  title: "JavaScript格式化 - 在线JS美化压缩工具",
  description:
    "免费的在线JavaScript格式化工具，支持JS美化、压缩。纯前端处理，数据安全。适用于开发者快速格式化JavaScript代码。",
  keywords: ["JavaScript格式化", "JS美化", "JS压缩", "在线工具"],
  openGraph: {
    title: "JavaScript格式化工具",
    description: "免费的在线JavaScript格式化美化压缩工具",
    type: "website",
  },
}

export default function JsFormatterPage() {
  return (
    <ToolLayout title="JavaScript 格式化" description="格式化、美化或压缩你的JavaScript代码">
      <JsFormatter />
    </ToolLayout>
  )
}
