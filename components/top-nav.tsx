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
  Code,
  GitBranch,
  Globe,
  Minimize2,
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
    id: "dev",
    title: "开发者工具",
    tools: [
      {
        id: "regex",
        title: "正则表达式测试",
        icon: Code,
        href: "/tools/regex",
      },
      {
        id: "url-parser",
        title: "URL 解析器",
        icon: Globe,
        href: "/tools/url-parser",
      },
      {
        id: "code-formatter",
        title: "代码格式化",
        icon: Code,
        href: "/tools/code-formatter",
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

export function TopNav() {
  const pathname = usePathname()
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const handleMouseEnter = (categoryId: string) => {
    setOpenDropdown(categoryId)
  }

  const handleMouseLeave = () => {
    setOpenDropdown(null)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Terminal className="w-6 h-6 text-primary transition-transform group-hover:scale-110" />
            <div>
              <h2 className="font-bold text-lg font-mono">DevTools</h2>
              <p className="text-xs text-muted-foreground font-mono">$ utilities</p>
            </div>
          </Link>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center gap-1">
            {toolCategories.map((category) => {
              const isOpen = openDropdown === category.id
              const hasActiveTool = category.tools.some(tool => pathname === tool.href)

              return (
                <div 
                  key={category.id} 
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(category.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 text-sm font-mono rounded-md transition-colors",
                      "hover:bg-primary/10 hover:text-primary",
                      hasActiveTool && "bg-primary/10 text-primary",
                    )}
                  >
                    <span>{category.title}</span>
                    <ChevronDown className={cn("w-3 h-3 transition-transform", isOpen && "rotate-180")} />
                  </button>

                  {isOpen && (
                    <div className="absolute top-full left-0 mt-1 w-64 bg-background border border-border rounded-md shadow-lg z-20">
                      <div className="p-2">
                        {category.tools.map((tool) => {
                          const Icon = tool.icon
                          const isActive = pathname === tool.href

                          return (
                            <Link
                              key={tool.id}
                              href={tool.href}
                              className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-md font-mono text-sm transition-all w-full",
                                "hover:bg-primary/10",
                                isActive && "bg-primary/20 text-primary font-semibold",
                              )}
                            >
                              <Icon className="w-4 h-4 flex-shrink-0" />
                              <span className="truncate">{tool.title}</span>
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="p-2 rounded-md hover:bg-primary/10">
              <Terminal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
