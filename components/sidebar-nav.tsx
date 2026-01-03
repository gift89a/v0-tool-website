"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  FileJson,
  FileCode,
  QrCode,
  Hash,
  Binary,
  Clock,
  Terminal,
  ChevronDown,
  FileCode2,
  Database,
  FileText,
  Palette,
  Braces,
  Shield,
  Key,
  Type,
  Calculator,
  Pipette,
  CaseSensitive,
  Fingerprint,
  Lock,
  Dices,
  FileSearch,
  BarChart3,
  List,
  FileSpreadsheet,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

const toolCategories = [
  {
    id: "format",
    title: "格式化工具",
    tools: [
      {
        id: "json-formatter",
        title: "JSON 格式化",
        icon: FileJson,
        href: "/tools/json-formatter",
      },
      {
        id: "xml-formatter",
        title: "XML 格式化",
        icon: FileCode2,
        href: "/tools/xml-formatter",
      },
      {
        id: "sql-formatter",
        title: "SQL 格式化",
        icon: Database,
        href: "/tools/sql-formatter",
      },
      {
        id: "html-formatter",
        title: "HTML 格式化",
        icon: FileText,
        href: "/tools/html-formatter",
      },
      {
        id: "css-formatter",
        title: "CSS 格式化",
        icon: Palette,
        href: "/tools/css-formatter",
      },
      {
        id: "js-formatter",
        title: "JavaScript 格式化",
        icon: Braces,
        href: "/tools/js-formatter",
      },
    ],
  },
  {
    id: "encode",
    title: "编码加密",
    tools: [
      {
        id: "base64",
        title: "Base64 编解码",
        icon: FileCode,
        href: "/tools/base64",
      },
      {
        id: "md5",
        title: "MD5 加密",
        icon: Hash,
        href: "/tools/md5",
      },
      {
        id: "sha",
        title: "SHA 加密",
        icon: Shield,
        href: "/tools/sha",
      },
      {
        id: "aes",
        title: "AES 加解密",
        icon: Key,
        href: "/tools/aes",
      },
      {
        id: "url-encode",
        title: "URL 编解码",
        icon: Binary,
        href: "/tools/url-encode",
      },
      {
        id: "unicode",
        title: "Unicode 转换",
        icon: Type,
        href: "/tools/unicode",
      },
    ],
  },
  {
    id: "convert",
    title: "转换工具",
    tools: [
      {
        id: "timestamp",
        title: "时间戳转换",
        icon: Clock,
        href: "/tools/timestamp",
      },
      {
        id: "number-base",
        title: "进制转换",
        icon: Calculator,
        href: "/tools/number-base",
      },
      {
        id: "color-converter",
        title: "颜色转换",
        icon: Pipette,
        href: "/tools/color-converter",
      },
      {
        id: "text-case",
        title: "大小写转换",
        icon: CaseSensitive,
        href: "/tools/text-case",
      },
    ],
  },
  {
    id: "generate",
    title: "生成工具",
    tools: [
      {
        id: "qr-code",
        title: "二维码生成",
        icon: QrCode,
        href: "/tools/qr-code",
      },
      {
        id: "uuid",
        title: "UUID 生成",
        icon: Fingerprint,
        href: "/tools/uuid",
      },
      {
        id: "password",
        title: "密码生成",
        icon: Lock,
        href: "/tools/password",
      },
      {
        id: "random-number",
        title: "随机数生成",
        icon: Dices,
        href: "/tools/random-number",
      },
    ],
  },
  {
    id: "text",
    title: "文本工具",
    tools: [
      {
        id: "text-diff",
        title: "文本对比",
        icon: FileSearch,
        href: "/tools/text-diff",
      },
      {
        id: "text-stats",
        title: "字数统计",
        icon: BarChart3,
        href: "/tools/text-stats",
      },
      {
        id: "text-dedupe",
        title: "文本去重",
        icon: List,
        href: "/tools/text-dedupe",
      },
      {
        id: "json-to-csv",
        title: "JSON 转 CSV",
        icon: FileSpreadsheet,
        href: "/tools/json-to-csv",
      },
    ],
  },
]

export function SidebarNav() {
  const pathname = usePathname()
  const [expandedCategories, setExpandedCategories] = useState<string[]>(toolCategories.map((cat) => cat.id))

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-border bg-card overflow-y-auto">
      <div className="p-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2 group">
          <Terminal className="w-6 h-6 text-primary transition-transform group-hover:scale-110" />
          <div>
            <h2 className="font-bold text-lg font-mono">DevTools</h2>
            <p className="text-xs text-muted-foreground font-mono">$ utilities</p>
          </div>
        </Link>
      </div>

      <nav className="p-4 space-y-3">
        {toolCategories.map((category) => {
          const isExpanded = expandedCategories.includes(category.id)

          return (
            <div key={category.id} className="space-y-1">
              <button
                onClick={() => toggleCategory(category.id)}
                className="flex items-center justify-between w-full px-3 py-2 text-xs font-mono text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
              >
                <span>{category.title}</span>
                <ChevronDown className={cn("w-3 h-3 transition-transform", isExpanded && "rotate-180")} />
              </button>

              {isExpanded && (
                <div className="space-y-1">
                  {category.tools.map((tool) => {
                    const Icon = tool.icon
                    const isActive = pathname === tool.href

                    return (
                      <Link
                        key={tool.id}
                        href={tool.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-md font-mono text-sm transition-all",
                          "hover:bg-primary/10 hover:translate-x-1",
                          isActive && "bg-primary/20 text-primary font-semibold border-l-2 border-primary",
                        )}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{tool.title}</span>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-card/50 backdrop-blur-sm">
        <p className="text-xs text-muted-foreground font-mono text-center">客户端运行 · 隐私优先</p>
      </div>
    </aside>
  )
}
