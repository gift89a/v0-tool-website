"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Copy, Download, CheckCircle } from "lucide-react"

const languageOptions = [
  { value: "javascript", label: "JavaScript", mode: "javascript" },
  { value: "typescript", label: "TypeScript", mode: "typescript" },
  { value: "json", label: "JSON", mode: "json" },
  { value: "html", label: "HTML", mode: "html" },
  { value: "css", label: "CSS", mode: "css" },
  { value: "xml", label: "XML", mode: "xml" },
  { value: "sql", label: "SQL", mode: "sql" },
]

const formatOptions = {
  indentSize: [2, 4, 8],
  quoteStyle: ["single", "double"],
  semicolons: [true, false],
  trailingComma: ["none", "es5", "all"],
}

export function CodeFormatterTool() {
  const [code, setCode] = useState("")
  const [language, setLanguage] = useState("javascript")
  const [formattedCode, setFormattedCode] = useState("")
  const [indentSize, setIndentSize] = useState(2)
  const [quoteStyle, setQuoteStyle] = useState("double")
  const [semicolons, setSemicolons] = useState(true)
  const [trailingComma, setTrailingComma] = useState("none")
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")

  const formatCode = () => {
    if (!code.trim()) {
      setError("请输入要格式化的代码")
      return
    }

    try {
      let formatted = ""
      const indent = " ".repeat(indentSize)

      switch (language) {
        case "json":
          formatted = formatJSON(code, indent)
          break
        case "javascript":
        case "typescript":
          formatted = formatJavaScript(code, indent)
          break
        case "html":
          formatted = formatHTML(code, indent)
          break
        case "css":
          formatted = formatCSS(code, indent)
          break
        case "xml":
          formatted = formatXML(code, indent)
          break
        case "sql":
          formatted = formatSQL(code, indent)
          break
        default:
          formatted = code
      }

      setFormattedCode(formatted)
      setError("")
    } catch (err) {
      setError(err instanceof Error ? err.message : "代码格式化失败")
      setFormattedCode("")
    }
  }

  const formatJSON = (jsonStr: string, indent: string) => {
    const parsed = JSON.parse(jsonStr)
    return JSON.stringify(parsed, null, indent)
  }

  const formatJavaScript = (jsStr: string, indent: string) => {
    // 简单的 JavaScript 格式化逻辑
    return jsStr
      .replace(/;/g, semicolons ? ";" : "")
      .replace(/'/g, quoteStyle === "double" ? "'" : '"')
      .replace(/"/g, quoteStyle === "single" ? '"' : "'")
      .split('\n')
      .map(line => line.trim() ? indent + line.trim() : line)
      .join('\n')
  }

  const formatHTML = (htmlStr: string, indent: string) => {
    // 简单的 HTML 格式化逻辑
    const formatted = htmlStr
      .replace(/></g, '>\n<')
      .split('\n')
      .map((line, index) => {
        const trimmed = line.trim()
        if (!trimmed) return ''
        
        const openTags = (trimmed.match(/</g) || []).length
        const closeTags = (trimmed.match(/>/g) || []).length
        const selfClosing = trimmed.includes('/>')
        
        let currentIndent = ''
        if (openTags > closeTags || selfClosing) {
          currentIndent = indent.repeat(Math.max(0, openTags - closeTags - 1))
        } else {
          currentIndent = indent.repeat(Math.max(0, openTags - closeTags))
        }
        
        return currentIndent + trimmed
      })
      .filter(line => line.trim())
      .join('\n')
    
    return formatted
  }

  const formatCSS = (cssStr: string, indent: string) => {
    // 简单的 CSS 格式化逻辑
    return cssStr
      .replace(/\s*{\s*/g, ' {\n' + indent)
      .replace(/;\s*/g, ';\n' + indent)
      .replace(/\s*}\s*/g, '\n}\n')
      .split('\n')
      .map(line => line.trim())
      .filter(line => line)
      .join('\n')
  }

  const formatXML = (xmlStr: string, indent: string) => {
    // XML 格式化类似 HTML
    return formatHTML(xmlStr, indent)
  }

  const formatSQL = (sqlStr: string, indent: string) => {
    // 简单的 SQL 格式化逻辑
    return sqlStr
      .replace(/\s+/g, ' ')
      .replace(/\bSELECT\b/gi, '\nSELECT')
      .replace(/\bFROM\b/gi, '\nFROM')
      .replace(/\bWHERE\b/gi, '\nWHERE')
      .replace(/\bORDER BY\b/gi, '\nORDER BY')
      .replace(/\bGROUP BY\b/gi, '\nGROUP BY')
      .replace(/\bHAVING\b/gi, '\nHAVING')
      .replace(/\bAND\b/gi, '\n' + indent + 'AND')
      .replace(/\bOR\b/gi, '\n' + indent + 'OR')
      .trim()
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formattedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadCode = () => {
    const extension = language === "typescript" ? "ts" : language
    const blob = new Blob([formattedCode], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `formatted-code.${extension}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 输入区域 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5" />
              代码输入
            </CardTitle>
            <CardDescription>输入要格式化的代码</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="language">编程语言</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="选择编程语言" />
                </SelectTrigger>
                <SelectContent>
                  {languageOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="code">代码内容</Label>
              <Textarea
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={`输入 ${languageOptions.find(opt => opt.value === language)?.label} 代码...`}
                rows={12}
                className="font-mono text-sm"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                {error}
              </div>
            )}
          </CardContent>
        </Card>

        {/* 格式化选项 */}
        <Card>
          <CardHeader>
            <CardTitle>格式化选项</CardTitle>
            <CardDescription>自定义代码格式化规则</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>缩进大小</Label>
              <Select value={indentSize.toString()} onValueChange={(value) => setIndentSize(Number(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {formatOptions.indentSize.map((size) => (
                    <SelectItem key={size} value={size.toString()}>
                      {size} 空格
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {(language === "javascript" || language === "typescript") && (
              <>
                <div>
                  <Label>引号风格</Label>
                  <Select value={quoteStyle} onValueChange={setQuoteStyle}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">单引号</SelectItem>
                      <SelectItem value="double">双引号</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>分号</Label>
                  <Select value={semicolons.toString()} onValueChange={(value) => setSemicolons(value === "true")}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">保留分号</SelectItem>
                      <SelectItem value="false">移除分号</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            <Button onClick={formatCode} className="w-full">
              格式化代码
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* 格式化结果 */}
      {formattedCode && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                格式化结果
              </span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "已复制" : "复制"}
                </Button>
                <Button variant="outline" size="sm" onClick={downloadCode}>
                  <Download className="w-4 h-4" />
                  下载
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{languageOptions.find(opt => opt.value === language)?.label}</Badge>
                <span className="text-sm text-muted-foreground">
                  {formattedCode.split('\n').length} 行
                </span>
              </div>
              <div className="relative">
                <Textarea
                  value={formattedCode}
                  readOnly
                  rows={12}
                  className="font-mono text-sm bg-muted"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 使用提示 */}
      <Card>
        <CardHeader>
          <CardTitle>使用提示</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">支持的格式</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• JavaScript/TypeScript - 基础格式化</li>
                <li>• JSON - 完整格式化验证</li>
                <li>• HTML/XML - 标签缩进对齐</li>
                <li>• CSS - 选择器和属性格式化</li>
                <li>• SQL - 关键字换行和缩进</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">格式化特性</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• 自定义缩进大小</li>
                <li>• 引号风格统一</li>
                <li>• 分号保留/移除</li>
                <li>• 语法错误检测</li>
                <li>• 一键复制和下载</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
