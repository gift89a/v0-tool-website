import type { Metadata } from "next"
import { ToolLayout } from "@/components/tool-layout"
import { ShaTool } from "@/components/tools/sha-tool"

export const metadata: Metadata = {
  title: "SHA加密 - 在线SHA1/SHA256/SHA512加密工具",
  description:
    "免费的在线SHA加密工具，支持SHA1、SHA256、SHA512哈希算法。纯前端处理，数据安全。适用于开发者快速生成SHA哈希值。",
  keywords: ["SHA加密", "SHA1", "SHA256", "SHA512", "哈希加密", "在线工具"],
  openGraph: {
    title: "SHA加密工具",
    description: "免费的在线SHA1/SHA256/SHA512加密工具",
    type: "website",
  },
}

export default function ShaPage() {
  return (
    <ToolLayout title="SHA 加密" description="生成SHA1、SHA256或SHA512哈希值">
      <ShaTool />
    </ToolLayout>
  )
}
