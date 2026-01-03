"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Copy, Braces, Minimize2, Trash2 } from "lucide-react"

export function JsFormatter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const formatJs = () => {
    setIsProcessing(true)
    setTimeout(() => {
      try {
        const formatted = formatJsString(input)
        setOutput(formatted)
        setError("")
      } catch (e) {
        setError("处理失败")
        setOutput("")
      }
      setIsProcessing(false)
    }, 200)
  }

  const compressJs = () => {
    setIsProcessing(true)
    setTimeout(() => {
      try {
        const compressed = input
          .replace(/\/\*[\s\S]*?\*\//g, "")
          .replace(/\/\/.*/g, "")
          .replace(/\s+/g, " ")
          .replace(/\s*{\s*/g, "{")
          .replace(/\s*}\s*/g, "}")
          .replace(/\s*\(\s*/g, "(")
          .replace(/\s*\)\s*/g, ")")
          .replace(/\s*;\s*/g, ";")
          .trim()
        setOutput(compressed)
        setError("")
      } catch (e) {
        setError("处理失败")
        setOutput("")
      }
      setIsProcessing(false)
    }, 200)
  }

  const formatJsString = (js: string): string => {
    const formatted = js.replace(/\s+/g, " ").trim()
    let indent = 0
    let result = ""

    for (let i = 0; i < formatted.length; i++) {
      const char = formatted[i]

      if (char === "{") {
        result += " {\n"
        indent++
        result += "  ".repeat(indent)
      } else if (char === "}") {
        indent--
        result += "\n" + "  ".repeat(indent) + "}"
        if (formatted[i + 1] !== ";" && formatted[i + 1] !== ",") {
          result += "\n" + "  ".repeat(indent)
        }
      } else if (char === ";") {
        result += ";\n" + "  ".repeat(indent)
      } else {
        result += char
      }
    }

    return result.trim()
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
              <Braces className="w-5 h-5 text-primary" />
              <span>$ input.js</span>
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
            placeholder='function hello(){console.log("Hello");}'
            className="font-mono min-h-[240px] bg-secondary/50 border-border focus:border-primary/50 transition-all duration-300 focus:shadow-lg focus:shadow-primary/5"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="flex gap-3">
            <Button
              onClick={formatJs}
              disabled={isProcessing || !input}
              className="flex-1 gap-2 font-mono transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Braces className={`w-4 h-4 ${isProcessing ? "animate-spin" : ""}`} />
              {isProcessing ? "处理中..." : "格式化"}
            </Button>
            <Button
              onClick={compressJs}
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
              <CardTitle className="font-mono text-lg">{error ? "$ error" : "$ output.js"}</CardTitle>
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
