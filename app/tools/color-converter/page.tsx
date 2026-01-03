import type { Metadata } from "next"
import { ToolLayout } from "@/components/tool-layout"
import { ColorConverterTool } from "@/components/tools/color-converter-tool"

export const metadata: Metadata = {
  title: "颜色转换 - 在线RGB HEX HSL颜色转换工具",
  description:
    "免费的在线颜色转换工具，支持RGB、HEX、HSL格式互转，带颜色预览。纯前端处理，数据安全。适用于设计师和开发者快速转换颜色格式。",
  keywords: ["颜色转换", "RGB", "HEX", "HSL", "颜色代码", "在线工具"],
  openGraph: {
    title: "颜色转换工具",
    description: "免费的在线RGB/HEX/HSL颜色转换工具",
    type: "website",
  },
}

export default function ColorConverterPage() {
  return (
    <ToolLayout title="颜色转换" description="RGB、HEX、HSL格式互转，实时预览">
      <ColorConverterTool />
    </ToolLayout>
  )
}
