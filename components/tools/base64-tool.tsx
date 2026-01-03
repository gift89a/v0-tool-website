"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Copy, Lock, Unlock } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function Base64Tool() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)

  const encode = () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(input)))
      setOutput(encoded)
    } catch (e) {
      setOutput("编码失败")
    }
  }

  const decode = () => {
    try {
      const decoded = decodeURIComponent(escape(atob(input)))
      setOutput(decoded)
    } catch (e) {
      setOutput("解码失败，请检查输入是否为有效的Base64字符串")
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid gap-6">
      <Card className="border-primary/20">
        <CardContent className="pt-6">
          <Tabs defaultValue="encode" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-secondary/50">
              <TabsTrigger
                value="encode"
                className="gap-2 font-mono data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Lock className="w-4 h-4" />
                encode
              </TabsTrigger>
              <TabsTrigger
                value="decode"
                className="gap-2 font-mono data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Unlock className="w-4 h-4" />
                decode
              </TabsTrigger>
            </TabsList>
            <TabsContent value="encode" className="space-y-4">
              <Textarea
                placeholder="输入要编码的文本..."
                className="font-mono min-h-[240px] bg-secondary/50 border-border focus:border-primary/50 transition-colors"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Button onClick={encode} className="w-full gap-2 font-mono">
                <Lock className="w-4 h-4" />
                编码为 Base64
              </Button>
            </TabsContent>
            <TabsContent value="decode" className="space-y-4">
              <Textarea
                placeholder="输入Base64字符串..."
                className="font-mono min-h-[240px] bg-secondary/50 border-border focus:border-primary/50 transition-colors"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Button onClick={decode} className="w-full gap-2 font-mono">
                <Unlock className="w-4 h-4" />
                解码 Base64
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {output && (
        <Card className="border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-mono text-lg">$ output</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={copyToClipboard}
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
              <code className="font-mono text-sm text-foreground break-all whitespace-pre-wrap">{output}</code>
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
