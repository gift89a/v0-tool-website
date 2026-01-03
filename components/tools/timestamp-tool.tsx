"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Copy, Clock, RefreshCw } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TimestampTool() {
  const [currentTimestamp, setCurrentTimestamp] = useState(Math.floor(Date.now() / 1000))
  const [timestamp, setTimestamp] = useState("")
  const [dateTime, setDateTime] = useState("")
  const [result, setResult] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTimestamp(Math.floor(Date.now() / 1000))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const timestampToDate = () => {
    try {
      const ts = Number.parseInt(timestamp)
      if (isNaN(ts)) {
        setResult("请输入有效的时间戳")
        return
      }
      const date = new Date(ts * 1000)
      setResult(date.toLocaleString("zh-CN", { hour12: false }))
    } catch (e) {
      setResult("转换失败")
    }
  }

  const dateToTimestamp = () => {
    try {
      const date = new Date(dateTime)
      if (isNaN(date.getTime())) {
        setResult("请输入有效的日期时间")
        return
      }
      setResult(Math.floor(date.getTime() / 1000).toString())
    } catch (e) {
      setResult("转换失败")
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid gap-6">
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="font-mono text-lg flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            当前时间戳
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-md border border-border">
            <code className="font-mono text-2xl font-bold text-primary">{currentTimestamp}</code>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(currentTimestamp.toString())}
              className="gap-2 font-mono hover:bg-primary/10 hover:text-primary"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  copied
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  copy
                </>
              )}
            </Button>
          </div>
          <p className="mt-2 text-sm text-muted-foreground font-mono text-center">
            {new Date(currentTimestamp * 1000).toLocaleString("zh-CN", { hour12: false })}
          </p>
        </CardContent>
      </Card>

      <Card className="border-primary/20">
        <CardContent className="pt-6">
          <Tabs defaultValue="to-date" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-secondary/50">
              <TabsTrigger
                value="to-date"
                className="gap-2 font-mono data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <RefreshCw className="w-4 h-4" />
                转日期
              </TabsTrigger>
              <TabsTrigger
                value="to-timestamp"
                className="gap-2 font-mono data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <RefreshCw className="w-4 h-4" />
                转时间戳
              </TabsTrigger>
            </TabsList>
            <TabsContent value="to-date" className="space-y-4">
              <Input
                type="text"
                placeholder="输入时间戳（秒）..."
                className="font-mono bg-secondary/50 border-border focus:border-primary/50 transition-colors"
                value={timestamp}
                onChange={(e) => setTimestamp(e.target.value)}
              />
              <Button onClick={timestampToDate} className="w-full gap-2 font-mono">
                <RefreshCw className="w-4 h-4" />
                转换为日期
              </Button>
            </TabsContent>
            <TabsContent value="to-timestamp" className="space-y-4">
              <Input
                type="datetime-local"
                className="font-mono bg-secondary/50 border-border focus:border-primary/50 transition-colors"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
              />
              <Button onClick={dateToTimestamp} className="w-full gap-2 font-mono">
                <RefreshCw className="w-4 h-4" />
                转换为时间戳
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {result && (
        <Card className="border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-mono text-lg">$ output</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(result)}
                className="gap-2 font-mono hover:bg-primary/10 hover:text-primary"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    copy
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="bg-secondary/50 p-4 rounded-md overflow-x-auto border border-border">
              <code className="font-mono text-lg text-foreground break-all">{result}</code>
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
