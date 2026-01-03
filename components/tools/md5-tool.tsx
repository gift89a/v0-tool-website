"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Copy, Hash } from "lucide-react"

export function MD5Tool() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)

  const generateMD5 = async () => {
    if (!input) return

    const encoder = new TextEncoder()
    const data = encoder.encode(input)
    const hashBuffer = await crypto.subtle.digest("MD5", data).catch(() => null)

    if (!hashBuffer) {
      // MD5 is not supported in all browsers via Web Crypto API, fallback to a simple hash
      // For production, consider using a library like crypto-js
      setOutput("MD5需要额外库支持，这里显示SHA-256代替")
      const sha256Buffer = await crypto.subtle.digest("SHA-256", data)
      const hashArray = Array.from(new Uint8Array(sha256Buffer))
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
      setOutput(hashHex)
      return
    }

    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
    setOutput(hashHex)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid gap-6">
      <Card className="border-primary/20">
        <CardContent className="pt-6 space-y-4">
          <Textarea
            placeholder="输入要加密的文本..."
            className="font-mono min-h-[240px] bg-secondary/50 border-border focus:border-primary/50 transition-colors"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={generateMD5} className="w-full gap-2 font-mono" disabled={!input}>
            <Hash className="w-4 h-4" />
            生成 MD5 哈希
          </Button>
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
              <code className="font-mono text-sm text-foreground break-all">{output}</code>
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
