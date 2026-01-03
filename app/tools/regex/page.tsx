import type { Metadata } from "next"
import { RegexTool } from "@/components/tools/regex-tool"
import { ToolLayout } from "@/components/tool-layout"

export const metadata: Metadata = {
  title: "正则表达式测试工具 - 在线正则表达式验证匹配 | DevTools",
  description:
    "免费在线正则表达式测试工具，支持实时匹配测试、替换测试、常用模式库。提供详细的匹配结果和捕获组信息，帮助开发者快速调试正则表达式。",
  keywords: ["正则表达式", "regex", "正则测试", "正则验证", "正则匹配", "在线正则", "正则工具"],
  openGraph: {
    title: "正则表达式测试工具 - 在线正则表达式验证匹配",
    description: "免费在线正则表达式测试工具，支持实时匹配测试、替换测试、常用模式库",
    type: "website",
  },
}

export default function RegexPage() {
  return (
    <ToolLayout title="正则表达式测试工具" description="测试、验证和调试正则表达式，支持匹配和替换操作">
      <RegexTool />
    </ToolLayout>
  )
}
