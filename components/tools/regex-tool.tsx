"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Copy } from "lucide-react"

export function RegexTool() {
  const [pattern, setPattern] = useState("")
  const [flags, setFlags] = useState("g")
  const [testText, setTestText] = useState("")
  const [matches, setMatches] = useState<Array<{match: string, index: number, groups: string[]}>>([])
  const [error, setError] = useState("")
  const [replaceText, setReplaceText] = useState("")
  const [result, setResult] = useState("")
  const [copied, setCopied] = useState(false)

  const testRegex = () => {
    if (!pattern) {
      setError("请输入正则表达式")
      return
    }

    try {
      const regex = new RegExp(pattern, flags)
      const found = []
      let match

      while ((match = regex.exec(testText)) !== null) {
        found.push({
          match: match[0],
          index: match.index,
          groups: match.slice(1)
        })
      }

      setMatches(found)
      setError("")
    } catch (err) {
      setError(err instanceof Error ? err.message : "正则表达式语法错误")
      setMatches([])
    }
  }

  const replaceRegex = () => {
    if (!pattern) {
      setError("请输入正则表达式")
      return
    }

    try {
      const regex = new RegExp(pattern, flags)
      const replaced = testText.replace(regex, replaceText)
      setResult(replaced)
      setError("")
    } catch (err) {
      setError(err instanceof Error ? err.message : "正则表达式语法错误")
      setResult("")
    }
  }

  const copyResult = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const commonPatterns = [
    { name: "邮箱", pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$" },
    { name: "手机号", pattern: "^1[3-9]\\d{9}$" },
    { name: "URL", pattern: "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)" },
    { name: "IP地址", pattern: "\\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}\\b" },
    { name: "中文", pattern: "[\\u4e00-\\u9fa5]+" },
    { name: "数字", pattern: "\\d+" },
    { name: "字母", pattern: "[a-zA-Z]+" },
    { name: "空白字符", pattern: "\\s+" }
  ]

  return (
    <div className="grid gap-6">
      <Card className="border-primary/20">
        <CardContent className="pt-6">
          <Tabs defaultValue="match" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-secondary/50">
              <TabsTrigger
                value="match"
                className="gap-2 font-mono data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <CheckCircle className="w-4 h-4" />
                匹配
              </TabsTrigger>
              <TabsTrigger
                value="replace"
                className="gap-2 font-mono data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Copy className="w-4 h-4" />
                替换
              </TabsTrigger>
            </TabsList>

            <TabsContent value="match" className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="pattern" className="text-sm font-mono">正则表达式</Label>
                  <div className="relative mt-1">
                    <Input
                      id="pattern"
                      value={pattern}
                      onChange={(e) => setPattern(e.target.value)}
                      placeholder="例如: \\d+ 或 [a-zA-Z]+"
                      className="font-mono pr-12 text-sm"
                      style={{ resize: 'none' }}
                    />
                    {pattern && (
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground font-mono">
                        {pattern.length}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-mono">标志</Label>
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={flags.includes('g')}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFlags(flags + 'g')
                          } else {
                            setFlags(flags.replace('g', ''))
                          }
                        }}
                      />
                      <span className="text-sm font-mono">g</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={flags.includes('i')}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFlags(flags + 'i')
                          } else {
                            setFlags(flags.replace('i', ''))
                          }
                        }}
                      />
                      <span className="text-sm font-mono">i</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={flags.includes('m')}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFlags(flags + 'm')
                          } else {
                            setFlags(flags.replace('m', ''))
                          }
                        }}
                      />
                      <span className="text-sm font-mono">m</span>
                    </label>
                  </div>
                </div>

                <div>
                  <Label htmlFor="testText" className="text-sm font-mono">测试文本</Label>
                  <Textarea
                    id="testText"
                    value={testText}
                    onChange={(e) => setTestText(e.target.value)}
                    placeholder="输入要测试的文本..."
                    rows={4}
                    className="font-mono mt-1"
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={testRegex} className="flex-1 font-mono">
                    开始匹配
                  </Button>
                </div>

                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                    <XCircle className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-red-700 font-mono">{error}</span>
                  </div>
                )}

                {matches.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      找到 {matches.length} 个匹配项
                    </div>
                    <div className="max-h-40 overflow-y-auto space-y-1">
                      {matches.map((match, index) => (
                        <div key={index} className="p-2 bg-muted rounded text-sm">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="secondary" className="text-xs">{index + 1}</Badge>
                            <span className="text-xs text-muted-foreground font-mono">pos: {match.index}</span>
                          </div>
                          <div className="font-mono text-xs bg-background p-1 rounded border">
                            {match.match}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="replace" className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="replace-pattern" className="text-sm font-mono">正则表达式</Label>
                  <div className="relative mt-1">
                    <Input
                      id="replace-pattern"
                      value={pattern}
                      onChange={(e) => setPattern(e.target.value)}
                      placeholder="例如: \\d+ 或 [a-zA-Z]+"
                      className="font-mono pr-12 text-sm"
                      style={{ resize: 'none' }}
                    />
                    {pattern && (
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground font-mono">
                        {pattern.length}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="replaceText" className="text-sm font-mono">替换文本</Label>
                  <Input
                    id="replaceText"
                    value={replaceText}
                    onChange={(e) => setReplaceText(e.target.value)}
                    placeholder="要替换成的文本，可以使用 $1, $2 等引用捕获组"
                    className="font-mono mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="replace-testText" className="text-sm font-mono">测试文本</Label>
                  <Textarea
                    id="replace-testText"
                    value={testText}
                    onChange={(e) => setTestText(e.target.value)}
                    placeholder="输入要测试的文本..."
                    rows={4}
                    className="font-mono mt-1"
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={replaceRegex} className="flex-1 font-mono">
                    执行替换
                  </Button>
                </div>

                {result && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-mono">替换结果</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyResult}
                        className="text-xs font-mono"
                      >
                        {copied ? "已复制" : "复制"}
                      </Button>
                    </div>
                    <div className="p-3 bg-muted rounded-md max-h-32 overflow-y-auto">
                      <pre className="whitespace-pre-wrap font-mono text-sm">{result}</pre>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                    <XCircle className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-red-700 font-mono">{error}</span>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-sm font-mono">常用模式</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {commonPatterns.map((item) => (
              <Button
                key={item.name}
                variant="outline"
                size="sm"
                onClick={() => setPattern(item.pattern)}
                className="justify-start text-left h-auto p-2 min-h-[50px]"
              >
                <div className="w-full min-w-0">
                  <div className="font-medium text-xs mb-1 font-mono">{item.name}</div>
                  <div className="text-xs text-muted-foreground font-mono break-words leading-tight">{item.pattern}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
