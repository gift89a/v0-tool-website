import type { Metadata } from "next"
import { MD5Tool } from "@/components/tools/md5-tool"
import { ToolLayout } from "@/components/tool-layout"

export const metadata: Metadata = {
  title: "MD5加密工具 - 在线MD5哈希生成器 | DevTools",
  description:
    "免费在线MD5加密工具，快速生成字符串的MD5哈希值。支持大小写MD5输出，完全在浏览器本地运行，保护数据安全。",
  keywords: ["MD5加密", "MD5哈希", "MD5生成器", "在线MD5", "MD5工具", "哈希计算"],
  openGraph: {
    title: "MD5加密工具 - 在线MD5哈希生成器",
    description: "免费在线MD5加密工具，快速生成字符串的MD5哈希值",
    type: "website",
  },
}

export default function MD5Page() {
  return (
    <ToolLayout title="MD5 加密" description="生成字符串的MD5哈希值">
      <MD5Tool />
    </ToolLayout>
  )
}
