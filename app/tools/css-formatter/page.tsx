import type { Metadata } from "next"
import { ToolLayout } from "@/components/tool-layout"
import { CssFormatter } from "@/components/tools/css-formatter"

export const metadata: Metadata = {
  title: "CSS格式化 - 在线CSS美化压缩工具",
  description: "免费的在线CSS格式化工具，支持CSS美化、压缩。纯前端处理，数据安全。适用于开发者快速格式化CSS代码。",
  keywords: ["CSS格式化", "CSS美化", "CSS压缩", "在线工具"],
  openGraph: {
    title: "CSS格式化工具",
    description: "免费的在线CSS格式化美化压缩工具",
    type: "website",
  },
}

export default function CssFormatterPage() {
  return (
    <ToolLayout title="CSS 格式化" description="格式化、美化或压缩你的CSS代码">
      <CssFormatter />
    </ToolLayout>
  )
}
