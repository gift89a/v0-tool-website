import type { Metadata } from "next"
import { ToolLayout } from "@/components/tool-layout"
import { TextDiffTool } from "@/components/tools/text-diff-tool"

export const metadata: Metadata = {
  title: "文本对比 - 在线文本差异对比工具",
  description: "免费的在线文本对比工具，快速找出两段文本的差异。纯前端处理，数据安全。适用于开发者和内容编辑者。",
  keywords: ["文本对比", "文本比较", "差异对比", "在线工具"],
  openGraph: {
    title: "文本对比工具",
    description: "免费的在线文本差异对比工具",
    type: "website",
  },
}

export default function TextDiffPage() {
  return (
    <ToolLayout title="文本对比" description="对比两段文本的差异">
      <TextDiffTool />
    </ToolLayout>
  )
}
