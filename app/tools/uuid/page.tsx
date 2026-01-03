import type { Metadata } from "next"
import { ToolLayout } from "@/components/tool-layout"
import { UuidTool } from "@/components/tools/uuid-tool"

export const metadata: Metadata = {
  title: "UUID生成器 - 在线UUID/GUID生成工具",
  description: "免费的在线UUID生成工具，支持UUID v4生成。纯前端处理，数据安全。适用于开发者快速生成唯一标识符。",
  keywords: ["UUID生成", "GUID生成", "唯一标识符", "在线工具"],
  openGraph: {
    title: "UUID生成器",
    description: "免费的在线UUID生成工具",
    type: "website",
  },
}

export default function UuidPage() {
  return (
    <ToolLayout title="UUID 生成" description="生成通用唯一标识符（UUID）">
      <UuidTool />
    </ToolLayout>
  )
}
