import type { Metadata } from "next"
import { CodeFormatterTool } from "@/components/tools/code-formatter-tool"
import { ToolLayout } from "@/components/tool-layout"

export const metadata: Metadata = {
  title: "代码格式化工具 - 在线代码美化格式化 | DevTools",
  description:
    "免费在线代码格式化工具，支持JavaScript、TypeScript、HTML、CSS、JSON、SQL等多种语言的美化格式化。自定义缩进大小、引号风格等格式化选项。",
  keywords: ["代码格式化", "代码美化", "在线格式化", "JavaScript格式化", "CSS格式化", "HTML格式化", "JSON格式化"],
  openGraph: {
    title: "代码格式化工具 - 在线代码美化格式化",
    description: "免费在线代码格式化工具，支持多种编程语言的美化格式化",
    type: "website",
  },
}

export default function CodeFormatterPage() {
  return (
    <ToolLayout title="代码格式化工具" description="美化格式化各种编程语言代码，支持自定义格式化选项">
      <CodeFormatterTool />
    </ToolLayout>
  )
}
