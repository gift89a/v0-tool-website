import type { Metadata } from "next"
import { ToolLayout } from "@/components/tool-layout"
import { PasswordTool } from "@/components/tools/password-tool"

export const metadata: Metadata = {
  title: "密码生成器 - 在线随机密码生成工具",
  description: "免费的在线随机密码生成工具，支持自定义长度和字符类型。纯前端处理，数据安全。适用于快速生成强密码。",
  keywords: ["密码生成", "随机密码", "强密码", "在线工具"],
  openGraph: {
    title: "密码生成器",
    description: "免费的在线随机密码生成工具",
    type: "website",
  },
}

export default function PasswordPage() {
  return (
    <ToolLayout title="密码生成" description="生成安全的随机密码">
      <PasswordTool />
    </ToolLayout>
  )
}
