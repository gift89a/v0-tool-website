"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Link, Globe, FileSearch, Hash } from "lucide-react"

interface ParsedURL {
  protocol: string
  hostname: string
  port: string
  pathname: string
  search: string
  hash: string
  params: Record<string, string>
}

export function UrlParserTool() {
  const [url, setUrl] = useState("")
  const [parsed, setParsed] = useState<ParsedURL | null>(null)
  const [error, setError] = useState("")

  const parseURL = () => {
    if (!url.trim()) {
      setError("请输入 URL")
      return
    }

    try {
      const urlObj = new URL(url)
      const params: Record<string, string> = {}
      
      urlObj.searchParams.forEach((value, key) => {
        params[key] = value
      })

      setParsed({
        protocol: urlObj.protocol,
        hostname: urlObj.hostname,
        port: urlObj.port,
        pathname: urlObj.pathname,
        search: urlObj.search,
        hash: urlObj.hash,
        params
      })
      setError("")
    } catch (err) {
      setError("无效的 URL 格式")
      setParsed(null)
    }
  }

  const buildURL = () => {
    if (!parsed) return ""

    const url = new URL(parsed.protocol + "//" + parsed.hostname)
    if (parsed.port) url.port = parsed.port
    url.pathname = parsed.pathname
    url.search = parsed.search
    url.hash = parsed.hash
    
    return url.toString()
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            URL 解析器
          </CardTitle>
          <CardDescription>解析 URL 的各个组成部分和查询参数</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="url">URL 地址</Label>
            <Textarea
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="输入要解析的 URL，例如: https://example.com/path?param1=value1&param2=value2#section"
              rows={3}
              className="font-mono"
            />
          </div>

          <Button onClick={parseURL} className="w-full">
            解析 URL
          </Button>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
              {error}
            </div>
          )}
        </CardContent>
      </Card>

      {parsed && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* URL 组成部分 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileSearch className="w-5 h-5" />
                URL 组成部分
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <Label className="text-sm text-muted-foreground">协议</Label>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{parsed.protocol}</Badge>
                    <code className="text-sm bg-muted px-2 py-1 rounded">{parsed.protocol}</code>
                  </div>
                </div>

                <div>
                  <Label className="text-sm text-muted-foreground">主机名</Label>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{parsed.hostname}</Badge>
                    <code className="text-sm bg-muted px-2 py-1 rounded">{parsed.hostname}</code>
                  </div>
                </div>

                {parsed.port && (
                  <div>
                    <Label className="text-sm text-muted-foreground">端口</Label>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{parsed.port}</Badge>
                      <code className="text-sm bg-muted px-2 py-1 rounded">{parsed.port}</code>
                    </div>
                  </div>
                )}

                <div>
                  <Label className="text-sm text-muted-foreground">路径</Label>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{parsed.pathname || "/"}</Badge>
                    <code className="text-sm bg-muted px-2 py-1 rounded">{parsed.pathname || "/"}</code>
                  </div>
                </div>

                {parsed.search && (
                  <div>
                    <Label className="text-sm text-muted-foreground">查询字符串</Label>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{parsed.search}</Badge>
                      <code className="text-sm bg-muted px-2 py-1 rounded">{parsed.search}</code>
                    </div>
                  </div>
                )}

                {parsed.hash && (
                  <div>
                    <Label className="text-sm text-muted-foreground">锚点</Label>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{parsed.hash}</Badge>
                      <code className="text-sm bg-muted px-2 py-1 rounded">{parsed.hash}</code>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 查询参数 */}
          {Object.keys(parsed.params).length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hash className="w-5 h-5" />
                  查询参数
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(parsed.params).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-2 bg-muted rounded">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{key}</Badge>
                        <span className="text-sm">=</span>
                      </div>
                      <code className="text-sm bg-background px-2 py-1 rounded border">{value}</code>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* 重建的 URL */}
      {parsed && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link className="w-5 h-5" />
              重建的 URL
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-3 bg-muted rounded-md">
              <code className="text-sm break-all">{buildURL()}</code>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 使用示例 */}
      <Card>
        <CardHeader>
          <CardTitle>使用示例</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="p-2 bg-muted rounded font-mono text-xs">
              https://api.example.com:8080/users?page=2&limit=10&sort=name#results
            </div>
            <p className="text-muted-foreground">
              这个 URL 包含协议、主机名、端口、路径、查询参数和锚点等所有组成部分。
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
