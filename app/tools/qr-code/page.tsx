import type { Metadata } from "next"
import { QRCodeGenerator } from "@/components/tools/qr-code-generator"
import { ToolLayout } from "@/components/tool-layout"

export const metadata: Metadata = {
  title: "二维码生成器 - 在线免费制作二维码 | DevTools",
  description:
    "免费在线二维码生成工具，支持文本、URL、电话等内容快速生成二维码。自定义二维码大小和样式，即时预览，支持下载保存。",
  keywords: ["二维码生成", "二维码制作", "QR码生成器", "在线二维码", "免费二维码", "二维码工具"],
  openGraph: {
    title: "二维码生成器 - 在线免费制作二维码",
    description: "免费在线二维码生成工具，支持文本、URL、电话等内容快速生成二维码",
    type: "website",
  },
}

export default function QRCodePage() {
  return (
    <ToolLayout title="二维码生成器" description="生成自定义二维码，支持文本、URL等内容">
      <QRCodeGenerator />
    </ToolLayout>
  )
}
