import type { Metadata } from "next"
import { ToolLayout } from "@/components/tool-layout"
import { TextStatsTool } from "@/components/tools/text-stats-tool"

export const metadata: Metadata = {
  title: "字数统计 - 在线文本字数统计工具",
  description: "免费的在线字数统计工具，统计字符数、单词数、行数等。纯前端处理，数据安全。适用于写作和文档编辑。",
  keywords: ["字数统计", "字符统计", "单词统计", "在线工具"],
  openGraph: {
    title: "字数统计工具",
    description: "免费的在线文本字数统计工具",
    type: "website",
  },
}

export default function TextStatsPage() {
  return (
    <ToolLayout title="字数统计" description="统计文本的字数、字符数和行数">
      <TextStatsTool />
    </ToolLayout>
  )
}
