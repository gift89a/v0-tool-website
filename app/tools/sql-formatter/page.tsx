import type { Metadata } from "next"
import { ToolLayout } from "@/components/tool-layout"
import { SqlFormatter } from "@/components/tools/sql-formatter"

export const metadata: Metadata = {
  title: "SQL格式化 - 在线SQL美化格式化工具",
  description: "免费的在线SQL格式化工具，支持SQL美化、格式化。纯前端处理，数据安全。适用于开发者快速格式化SQL语句。",
  keywords: ["SQL格式化", "SQL美化", "SQL工具", "在线工具"],
  openGraph: {
    title: "SQL格式化工具",
    description: "免费的在线SQL格式化美化工具",
    type: "website",
  },
}

export default function SqlFormatterPage() {
  return (
    <ToolLayout title="SQL 格式化" description="格式化、美化你的SQL语句">
      <SqlFormatter />
    </ToolLayout>
  )
}
