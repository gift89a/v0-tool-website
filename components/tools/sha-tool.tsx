"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Copy, Shield, Trash2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ShaTool() {
  const [input, setInput] = useState("")
  const [sha1Output, setSha1Output] = useState("")
  const [sha256Output, setSha256Output] = useState("")
  const [sha512Output, setSha512Output] = useState("")
  const [copied, setCopied] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)

  const generateSHA = async () => {
    if (!input) return
    setIsProcessing(true)

    const encoder = new TextEncoder()
    const data = encoder.encode(input)

    try {
      // SHA-1
      const sha1Buffer = await crypto.subtle.digest("SHA-1", data)
      const sha1Array = Array.from(new Uint8Array(sha1Buffer))
      const sha1Hex = sha1Array.map((b) => b.toString(16).padStart(2, "0")).join("")
      setSha1Output(sha1Hex)

      // SHA-256
      const sha256Buffer = await crypto.subtle.digest("SHA-256", data)
      const sha256Array = Array.from(new Uint8Array(sha256Buffer))
      const sha256Hex = sha256Array.map((b) => b.toString(16).padStart(2, "0")).join("")
      setSha256Output(sha256Hex)

      // SHA-512
      const sha512Buffer = await crypto.subtle.digest("SHA-512", data)
      const sha512Array = Array.from(new Uint8Array(sha512Buffer))
      const sha512Hex = sha512Array.map((b) => b.toString(16).padStart(2, "0")).join("")
      setSha512Output(sha512Hex)
    } catch (error) {
      console.error("SHA generation error:", error)
    }

    setIsProcessing(false)
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(""), 2000)
  }

  const clearInput = () => {
    setInput("")
    setSha1Output("")
    setSha256Output("")
    setSha512Output("")
  }

  return (
    <div className="grid gap-6">
      <Card className="border-primary/20 transition-all duration-300 hover:border-primary/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 font-mono text-lg">
              <Shield className="w-5 h-5 text-primary" />
              <span>$ input.txt</span>
            </CardTitle>
            {input && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearInput}
                className="gap-2 font-mono hover:bg-destructive/10 hover:text-destructive transition-all duration-300"
              >
                <Trash2 className="w-4 h-4" />
                clear
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="输入要加密的文本..."
            className="font-mono min-h-[240px] bg-secondary/50 border-border focus:border-primary/50 transition-all duration-300 focus:shadow-lg focus:shadow-primary/5"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={generateSHA}
            disabled={isProcessing || !input}
            className="w-full gap-2 font-mono transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Shield className={`w-4 h-4 ${isProcessing ? "animate-spin" : ""}`} />
            {isProcessing ? "处理中..." : "生成 SHA 哈希"}
          </Button>
        </CardContent>
      </Card>

      {(sha1Output || sha256Output || sha512Output) && (
        <Card className="border-primary/20 animate-in transition-all duration-300 hover:border-primary/30">
          <CardHeader>
            <CardTitle className="font-mono text-lg">$ output</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="sha256" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="sha1" className="font-mono">
                  SHA-1
                </TabsTrigger>
                <TabsTrigger value="sha256" className="font-mono">
                  SHA-256
                </TabsTrigger>
                <TabsTrigger value="sha512" className="font-mono">
                  SHA-512
                </TabsTrigger>
              </TabsList>
              <TabsContent value="sha1" className="space-y-3">
                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(sha1Output, "sha1")}
                    className={`gap-2 font-mono hover:bg-primary/10 hover:text-primary transition-all duration-300 ${copied === "sha1" ? "pulse-success" : ""}`}
                  >
                    {copied === "sha1" ? (
                      <>
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-green-500">copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        copy
                      </>
                    )}
                  </Button>
                </div>
                <pre className="bg-secondary/50 p-4 rounded-md overflow-x-auto border border-border transition-all duration-300 hover:border-primary/30">
                  <code className="font-mono text-sm text-foreground break-all">{sha1Output}</code>
                </pre>
              </TabsContent>
              <TabsContent value="sha256" className="space-y-3">
                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(sha256Output, "sha256")}
                    className={`gap-2 font-mono hover:bg-primary/10 hover:text-primary transition-all duration-300 ${copied === "sha256" ? "pulse-success" : ""}`}
                  >
                    {copied === "sha256" ? (
                      <>
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-green-500">copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        copy
                      </>
                    )}
                  </Button>
                </div>
                <pre className="bg-secondary/50 p-4 rounded-md overflow-x-auto border border-border transition-all duration-300 hover:border-primary/30">
                  <code className="font-mono text-sm text-foreground break-all">{sha256Output}</code>
                </pre>
              </TabsContent>
              <TabsContent value="sha512" className="space-y-3">
                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(sha512Output, "sha512")}
                    className={`gap-2 font-mono hover:bg-primary/10 hover:text-primary transition-all duration-300 ${copied === "sha512" ? "pulse-success" : ""}`}
                  >
                    {copied === "sha512" ? (
                      <>
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-green-500">copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        copy
                      </>
                    )}
                  </Button>
                </div>
                <pre className="bg-secondary/50 p-4 rounded-md overflow-x-auto border border-border transition-all duration-300 hover:border-primary/30">
                  <code className="font-mono text-sm text-foreground break-all">{sha512Output}</code>
                </pre>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
