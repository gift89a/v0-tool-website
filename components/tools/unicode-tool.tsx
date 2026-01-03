"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Copy, Type, ArrowRight, ArrowLeft, Trash2 } from "lucide-react"

export function UnicodeTool() {
  const [textInput, setTextInput] = useState("")
  const [unicodeInput, setUnicodeInput] = useState("")
  const [textOutput, setTextOutput] = useState("")
  const [unicodeOutput, setUnicodeOutput] = useState("")
  const [error, setError] = useState("")
  const [copied, setCopied] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)

  const textToUnicode = () => {
    if (!textInput) return

    setIsProcessing(true)
    setError("")

    try {
      const unicode = textInput
        .split("")
        .map((char) => "\\u" + char.charCodeAt(0).toString(16).padStart(4, "0"))
        .join("")
      setUnicodeOutput(unicode)
    } catch (e) {
      setError("转换失败")
    }

    setIsProcessing(false)
  }

  const unicodeToText = () => {
    if (!unicodeInput) return

    setIsProcessing(true)
    setError("")

    try {
      // Handle both \uXXXX and plain unicode format
      const processedInput = unicodeInput.replace(/\\u/g, "\\u")
      const text = processedInput.replace(/\\u([\dA-Fa-f]{4})/g, (match, grp) => {
        return String.fromCharCode(Number.parseInt(grp, 16))
      })
      setTextOutput(text)
    } catch (e) {
      setError("解码失败，请检查Unicode格式")
    }

    setIsProcessing(false)
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(""), 2000)
  }

  const clearTextInput = () => {
    setTextInput("")
    setUnicodeOutput("")
    setError("")
  }

  const clearUnicodeInput = () => {
    setUnicodeInput("")
    setTextOutput("")
    setError("")
  }

  return (
    <div className="grid gap-6">
      {/* Text to Unicode */}
      <Card className="border-primary/20 transition-all duration-300 hover:border-primary/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 font-mono text-lg">
              <Type className="w-5 h-5 text-primary" />
              <span>$ text → unicode</span>
            </CardTitle>
            {textInput && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearTextInput}
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
            placeholder="输入文本 (例如: 你好)"
            className="font-mono min-h-[180px] bg-secondary/50 border-border focus:border-primary/50 transition-all duration-300 focus:shadow-lg focus:shadow-primary/5"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
          <Button
            onClick={textToUnicode}
            disabled={isProcessing || !textInput}
            className="w-full gap-2 font-mono transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <ArrowRight className={`w-4 h-4 ${isProcessing ? "animate-spin" : ""}`} />
            {isProcessing ? "处理中..." : "转换为 Unicode"}
          </Button>
        </CardContent>
      </Card>

      {unicodeOutput && (
        <Card className="border-primary/20 animate-in transition-all duration-300 hover:border-primary/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-mono text-lg">$ unicode output</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(unicodeOutput, "unicode")}
                className={`gap-2 font-mono hover:bg-primary/10 hover:text-primary transition-all duration-300 ${copied === "unicode" ? "pulse-success" : ""}`}
              >
                {copied === "unicode" ? (
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
          </CardHeader>
          <CardContent>
            <pre className="bg-secondary/50 p-4 rounded-md overflow-x-auto border border-border transition-all duration-300 hover:border-primary/30">
              <code className="font-mono text-sm text-foreground break-all">{unicodeOutput}</code>
            </pre>
          </CardContent>
        </Card>
      )}

      {/* Unicode to Text */}
      <Card className="border-primary/20 transition-all duration-300 hover:border-primary/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 font-mono text-lg">
              <Type className="w-5 h-5 text-primary" />
              <span>$ unicode → text</span>
            </CardTitle>
            {unicodeInput && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearUnicodeInput}
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
            placeholder="输入Unicode编码 (例如: \u4f60\u597d)"
            className="font-mono min-h-[180px] bg-secondary/50 border-border focus:border-primary/50 transition-all duration-300 focus:shadow-lg focus:shadow-primary/5"
            value={unicodeInput}
            onChange={(e) => setUnicodeInput(e.target.value)}
          />
          <Button
            onClick={unicodeToText}
            disabled={isProcessing || !unicodeInput}
            className="w-full gap-2 font-mono transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <ArrowLeft className={`w-4 h-4 ${isProcessing ? "animate-spin" : ""}`} />
            {isProcessing ? "处理中..." : "转换为文本"}
          </Button>
        </CardContent>
      </Card>

      {textOutput && (
        <Card className="border-primary/20 animate-in transition-all duration-300 hover:border-primary/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-mono text-lg">$ text output</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(textOutput, "text")}
                className={`gap-2 font-mono hover:bg-primary/10 hover:text-primary transition-all duration-300 ${copied === "text" ? "pulse-success" : ""}`}
              >
                {copied === "text" ? (
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
          </CardHeader>
          <CardContent>
            <pre className="bg-secondary/50 p-4 rounded-md overflow-x-auto border border-border transition-all duration-300 hover:border-primary/30">
              <code className="font-mono text-sm text-foreground break-all">{textOutput}</code>
            </pre>
          </CardContent>
        </Card>
      )}

      {error && (
        <Card className="border-destructive/50">
          <CardContent className="pt-6">
            <p className="text-destructive font-mono text-sm">! {error}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
