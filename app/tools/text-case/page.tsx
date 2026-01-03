import type { Metadata } from "next"
import { ToolLayout } from "@/components/tool-layout"
import { TextCaseTool } from "@/components/tools/text-case-tool"

export const metadata: Metadata = {
  title: "大小写转换 - 在线文本大小写转换工具",
  description: "免费的在线文本大小写转换工具，支持全部大写、全部小写、首字母大写、驼峰命名等。纯前端处理，数据安全。",
  keywords: ["大小写转换", "文本转换", "驼峰命名", "在线工具"],
  openGraph: {
    title: "大小写转换工具",
    description: "免费的在线文本大小写转换工具",
    type: "website",
  },
}

export default function TextCasePage() {
  return (
    <ToolLayout title="大小写转换" description="快速转换文本的大小写格式">
      <TextCaseTool />
    </ToolLayout>
  )
}
