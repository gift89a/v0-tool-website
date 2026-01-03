import type { Metadata } from "next"
import { Base64Tool } from "@/components/tools/base64-tool"
import { ToolLayout } from "@/components/tool-layout"

export const metadata: Metadata = {
  title: "Base64编解码工具 - 在线Base64加密解密 | DevTools",
  description:
    "免费在线Base64编码解码工具，支持文本和Base64互转。快速进行Base64编码和解码操作，完全在浏览器本地运行，保护数据隐私安全。",
  keywords: ["Base64编码", "Base64解码", "Base64加密", "Base64解密", "Base64工具", "在线Base64"],
  openGraph: {
    title: "Base64编解码工具 - 在线Base64加密解密",
    description: "免费在线Base64编码解码工具，支持文本和Base64互转",
    type: "website",
  },
}

export default function Base64Page() {
  return (
    <ToolLayout title="Base64 编解码" description="快速进行Base64编码和解码操作">
      <Base64Tool />
    </ToolLayout>
  )
}
