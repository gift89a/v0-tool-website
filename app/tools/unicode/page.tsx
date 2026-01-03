import type { Metadata } from "next"
import { ToolLayout } from "@/components/tool-layout"
import { UnicodeTool } from "@/components/tools/unicode-tool"

export const metadata: Metadata = {
  title: "Unicode转换 - 在线Unicode编码解码工具",
  description:
    "免费的在线Unicode转换工具，支持文本与Unicode编码互转。纯前端处理，数据安全。适用于开发者快速进行Unicode编码转换。",
  keywords: ["Unicode转换", "Unicode编码", "Unicode解码", "字符编码", "在线工具"],
  openGraph: {
    title: "Unicode转换工具",
    description: "免费的在线Unicode编码解码工具",
    type: "website",
  },
}

export default function UnicodePage() {
  return (
    <ToolLayout title="Unicode 转换" description="文本与Unicode编码相互转换">
      <UnicodeTool />
    </ToolLayout>
  )
}
