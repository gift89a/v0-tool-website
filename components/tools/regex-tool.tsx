"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Info } from "lucide-react"

export function RegexTool() {
  const [pattern, setPattern] = useState("")
  const [flags, setFlags] = useState("g")
  const [testText, setTestText] = useState("")
  const [matches, setMatches] = useState<Array<{match: string, index: number, groups: string[]}>>([])
  const [error, setError] = useState("")
  const [replaceText, setReplaceText] = useState("")
  const [result, setResult] = useState("")

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
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 输入区域 */}
        <Card>
          <CardHeader>
            <CardTitle>正则表达式配置</CardTitle>
            <CardDescription>输入正则表达式和测试文本</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="pattern">正则表达式</Label>
              <Input
                id="pattern"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="例如: \\d+ 或 [a-zA-Z]+"
                className="font-mono"
              />
            </div>

            <div>
              <Label htmlFor="flags">标志</Label>
              <div className="flex gap-2 mt-2">
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
                  <span className="text-sm">g (全局)</span>
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
                  <span className="text-sm">i (忽略大小写)</span>
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
                  <span className="text-sm">m (多行)</span>
                </label>
              </div>
            </div>

            <div>
              <Label htmlFor="testText">测试文本</Label>
              <Textarea
                id="testText"
                value={testText}
                onChange={(e) => setTestText(e.target.value)}
                placeholder="输入要测试的文本..."
                rows={6}
                className="font-mono"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                <XCircle className="w-4 h-4 text-red-500" />
                <span className="text-sm text-red-700">{error}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 常用模式 */}
        <Card>
          <CardHeader>
            <CardTitle>常用正则模式</CardTitle>
            <CardDescription>点击快速使用常用模式</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {commonPatterns.map((item) => (
                <Button
                  key={item.name}
                  variant="outline"
                  size="sm"
                  onClick={() => setPattern(item.pattern)}
                  className="justify-start text-left h-auto p-3"
                >
                  <div className="w-full">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-muted-foreground font-mono break-all leading-tight">{item.pattern}</div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 功能选项卡 */}
      <Tabs defaultValue="match" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="match">匹配测试</TabsTrigger>
          <TabsTrigger value="replace">替换测试</TabsTrigger>
        </TabsList>

        <TabsContent value="match" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                匹配结果
                <Button onClick={testRegex} size="sm">
                  开始匹配
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {matches.length > 0 ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    找到 {matches.length} 个匹配项
                  </div>
                  <div className="space-y-2">
                    {matches.map((match, index) => (
                      <div key={index} className="p-3 bg-muted rounded-md">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary">匹配 {index + 1}</Badge>
                          <span className="text-sm text-muted-foreground">位置: {match.index}</span>
                        </div>
                        <div className="font-mono text-sm bg-background p-2 rounded border">
                          {match.match}
                        </div>
                        {match.groups.length > 0 && (
                          <div className="mt-2">
                            <div className="text-xs text-muted-foreground mb-1">捕获组:</div>
                            <div className="space-y-1">
                              {match.groups.map((group, i) => (
                                <div key={i} className="text-xs font-mono bg-blue-50 p-1 rounded">
                                  ${i + 1}: {group || "(空)"}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  {pattern ? "没有找到匹配项" : "请输入正则表达式并点击开始匹配"}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="replace" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>替换测试</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="replaceText">替换文本</Label>
                <Input
                  id="replaceText"
                  value={replaceText}
                  onChange={(e) => setReplaceText(e.target.value)}
                  placeholder="要替换成的文本，可以使用 $1, $2 等引用捕获组"
                  className="font-mono"
                />
              </div>
              <Button onClick={replaceRegex} className="w-full">
                执行替换
              </Button>
              {result && (
                <div>
                  <Label>替换结果</Label>
                  <div className="mt-2 p-3 bg-muted rounded-md">
                    <pre className="whitespace-pre-wrap font-mono text-sm">{result}</pre>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 帮助信息 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="w-5 h-5" />
            正则表达式参考
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">字符类</h4>
              <ul className="space-y-1 font-mono text-xs">
                <li>\d - 数字 [0-9]</li>
                <li>\w - 字母数字 [a-zA-Z0-9_]</li>
                <li>\s - 空白字符</li>
                <li>. - 任意字符</li>
                <li>[abc] - 字符集</li>
                <li>[^abc] - 反向字符集</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">量词</h4>
              <ul className="space-y-1 font-mono text-xs">
                <li>* - 0次或多次</li>
                <li>+ - 1次或多次</li>
                <li>? - 0次或1次</li>
                <li>{`{n}`} - 恰好n次</li>
                <li>{`{n,m}`} - n到m次</li>
                <li>{`{n,}`} - 至少n次</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">锚点</h4>
              <ul className="space-y-1 font-mono text-xs">
                <li>^ - 行开始</li>
                <li>$ - 行结束</li>
                <li>\b - 单词边界</li>
                <li>\B - 非单词边界</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">分组</h4>
              <ul className="space-y-1 font-mono text-xs">
                <li>(abc) - 捕获组</li>
                <li>(?:abc) - 非捕获组</li>
                <li>a|b - 或条件</li>
                <li>$1, $2 - 反向引用</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
