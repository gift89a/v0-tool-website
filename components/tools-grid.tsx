import { FileJson, FileCode, QrCode, Hash, Binary, Clock } from "lucide-react"
import { ToolCard } from "@/components/tool-card"

const tools = [
  {
    id: "json-formatter",
    title: "JSON 格式化",
    description: "格式化、压缩和验证JSON数据",
    icon: FileJson,
    href: "/tools/json-formatter",
    color: "text-chart-1",
  },
  {
    id: "base64",
    title: "Base64 编解码",
    description: "Base64编码和解码工具",
    icon: FileCode,
    href: "/tools/base64",
    color: "text-chart-2",
  },
  {
    id: "qr-code",
    title: "二维码生成",
    description: "生成自定义二维码图片",
    icon: QrCode,
    href: "/tools/qr-code",
    color: "text-chart-3",
  },
  {
    id: "md5",
    title: "MD5 加密",
    description: "生成字符串的MD5哈希值",
    icon: Hash,
    href: "/tools/md5",
    color: "text-chart-4",
  },
  {
    id: "url-encode",
    title: "URL 编解码",
    description: "URL编码和解码工具",
    icon: Binary,
    href: "/tools/url-encode",
    color: "text-chart-5",
  },
  {
    id: "timestamp",
    title: "时间戳转换",
    description: "Unix时间戳与日期互转",
    icon: Clock,
    href: "/tools/timestamp",
    color: "text-chart-1",
  },
]

export function ToolsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  )
}
