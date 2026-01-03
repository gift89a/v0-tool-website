import type { Metadata } from "next"
import { ToolLayout } from "@/components/tool-layout"
import { TextDedupeTool } from "@/components/tools/text-dedupe-tool"

export const metadata: Metadata = {
  title: "文本去重 - 在线文本去重排序工具",
  description: "免费的在线文本去重工具，支持去重、排序。纯前端处理，数据安全。适用于数据清洗和列表处理。",
  keywords: ["文本去重", "去重", "排序", "在线工具"],
  openGraph: {
    title: "文本去重工具",
    description: "免费的在线文本去重排序工具",
    type: "website",
  },
}

export default function TextDedupePage() {
  return (
    <ToolLayout title="文本去重" description="删除重复行并可选排序">
      <TextDedupeTool />
    </ToolLayout>
  )
}
