import type { Metadata } from "next"
import { ToolLayout } from "@/components/tool-layout"
import { AesTool } from "@/components/tools/aes-tool"

export const metadata: Metadata = {
  title: "AES加解密 - 在线AES加密解密工具",
  description:
    "免费的在线AES加解密工具，支持AES-256-CBC加密解密。纯前端处理，数据安全。适用于开发者快速进行AES加密解密操作。",
  keywords: ["AES加密", "AES解密", "AES-256", "对称加密", "在线工具"],
  openGraph: {
    title: "AES加解密工具",
    description: "免费的在线AES加密解密工具",
    type: "website",
  },
}

export default function AesPage() {
  return (
    <ToolLayout title="AES 加解密" description="使用AES-256算法进行加密和解密">
      <AesTool />
    </ToolLayout>
  )
}
