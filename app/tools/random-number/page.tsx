import type { Metadata } from "next"
import { ToolLayout } from "@/components/tool-layout"
import { RandomNumberTool } from "@/components/tools/random-number-tool"

export const metadata: Metadata = {
  title: "随机数生成器 - 在线随机数生成工具",
  description: "免费的在线随机数生成工具，支持自定义范围和数量。纯前端处理，数据安全。适用于快速生成随机数。",
  keywords: ["随机数生成", "随机数", "在线工具"],
  openGraph: {
    title: "随机数生成器",
    description: "免费的在线随机数生成工具",
    type: "website",
  },
}

export default function RandomNumberPage() {
  return (
    <ToolLayout title="随机数生成" description="生成指定范围的随机数">
      <RandomNumberTool />
    </ToolLayout>
  )
}
