import type { Metadata } from "next"
import { ToolLayout } from "@/components/tool-layout"
import { XmlFormatter } from "@/components/tools/xml-formatter"

export const metadata: Metadata = {
  title: "XML格式化 - 在线XML格式化美化压缩工具",
  description:
    "免费的在线XML格式化工具，支持XML美化、压缩、验证。纯前端处理，数据安全。适用于开发者快速格式化XML文档。",
  keywords: ["XML格式化", "XML美化", "XML压缩", "XML验证", "在线工具"],
  openGraph: {
    title: "XML格式化工具",
    description: "免费的在线XML格式化、美化、压缩工具",
    type: "website",
  },
}

export default function XmlFormatterPage() {
  return (
    <ToolLayout title="XML 格式化" description="格式化、美化或压缩你的XML文档">
      <XmlFormatter />
    </ToolLayout>
  )
}
