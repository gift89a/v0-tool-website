"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Copy, FileCode2, Minimize2, Trash2 } from "lucide-react"

export function XmlFormatter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const formatXml = () => {
    setIsProcessing(true)
    setTimeout(() => {
      try {
        const formatted = formatXmlString(input, 2)
        setOutput(formatted)
        setError("")
      } catch (e) {
        setError("无效的XML格式")
        setOutput("")
      }
      setIsProcessing(false)
    }, 200)
  }

  const compressXml = () => {
    setIsProcessing(true)
    setTimeout(() => {
      try {
        const compressed = input.replace(/>\s+</g, "><").trim()
        setOutput(compressed)
        setError("")
      } catch (e) {
        setError("处理失败")
        setOutput("")
      }
      setIsProcessing(false)
    }, 200)
  }

  const formatXmlString = (xml: string, indent = 2): string => {
    const PADDING = " ".repeat(indent)
    const reg = /(>)(<)(\/*)/g
    let formatted = ""
    let pad = 0

    xml = xml.replace(reg, "$1\n$2$3")
    xml.split("\n").forEach((node) => {
      let indent = 0
      if (node.match(/.+<\/\w[^>]*>$/)) {
        indent = 0
      } else if (node.match(/^<\/\w/)) {
        if (pad !== 0) {
          pad -= 1
        }
      } else if (node.match(/^<\w[^>]*[^/]>.*$/)) {
        indent = 1
      } else {
        indent = 0
      }

      formatted += PADDING.repeat(pad) + node + "\n"
      pad += indent
    })

    return formatted.trim()
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const clearInput = () => {
    setInput("")
    setError("")
  }

  const clearOutput = () => {
    setOutput("")
    setError("")
  }

  return (
    <div className="grid gap-6">
      <Card className="border-primary/20 transition-all duration-300 hover:border-primary/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 font-mono text-lg">
              <FileCode2 className="w-5 h-5 text-primary" />
              <span>$ input.xml</span>
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
            placeholder="<root><item>内容</item></root>"
            className="font-mono min-h-[240px] bg-secondary/50 border-border focus:border-primary/50 transition-all duration-300 focus:shadow-lg focus:shadow-primary/5"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="flex gap-3">
            <Button
              onClick={formatXml}
              disabled={isProcessing || !input}
              className="flex-1 gap-2 font-mono transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <FileCode2 className={`w-4 h-4 ${isProcessing ? "animate-spin" : ""}`} />
              {isProcessing ? "处理中..." : "格式化"}
            </Button>
            <Button
              onClick={compressXml}
              disabled={isProcessing || !input}
              variant="outline"
              className="flex-1 gap-2 font-mono hover:bg-accent hover:text-accent-foreground bg-transparent transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Minimize2 className={`w-4 h-4 ${isProcessing ? "animate-spin" : ""}`} />
              {isProcessing ? "处理中..." : "压缩"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {(output || error) && (
        <Card className="border-primary/20 animate-in transition-all duration-300 hover:border-primary/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-mono text-lg">{error ? "$ error" : "$ output.xml"}</CardTitle>
              <div className="flex gap-2">
                {output && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={copyToClipboard}
                      className={`gap-2 font-mono hover:bg-primary/10 hover:text-primary transition-all duration-300 ${copied ? "pulse-success" : ""}`}
                    >
                      {copied ? (
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
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearOutput}
                      className="gap-2 font-mono hover:bg-destructive/10 hover:text-destructive transition-all duration-300"
                    >
                      <Trash2 className="w-4 h-4" />
                      clear
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {error ? (
              <p className="text-destructive font-mono text-sm">! {error}</p>
            ) : (
              <pre className="bg-secondary/50 p-4 rounded-md overflow-x-auto border border-border transition-all duration-300 hover:border-primary/30">
                <code className="font-mono text-sm text-foreground">{output}</code>
              </pre>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
