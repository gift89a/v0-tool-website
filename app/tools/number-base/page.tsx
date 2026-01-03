import type { Metadata } from "next"
import { ToolLayout } from "@/components/tool-layout"
import { NumberBaseTool } from "@/components/tools/number-base-tool"

export const metadata: Metadata = {
  title: "进制转换 - 在线二进制八进制十进制十六进制转换工具",
  description: "免费的在线进制转换工具，支持2/8/10/16进制互转。纯前端处理，数据安全。适用于开发者快速进行进制转换。",
  keywords: ["进制转换", "二进制", "八进制", "十进制", "十六进制", "在线工具"],
  openGraph: {
    title: "进制转换工具",
    description: "免费的在线2/8/10/16进制转换工具",
    type: "website",
  },
}

export default function NumberBasePage() {
  return (
    <ToolLayout title="进制转换" description="二进制、八进制、十进制、十六进制互转">
      <NumberBaseTool />
    </ToolLayout>
  )
}
