"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CaseSensitive, Check, Copy, Trash2 } from "lucide-react"

export function TextCaseTool() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)

  const toUpperCase = () => {
    setOutput(input.toUpperCase())
  }

  const toLowerCase = () => {
    setOutput(input.toLowerCase())
  }

  const toCapitalize = () => {
    setOutput(
      input
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
    )
  }

  const toCamelCase = () => {
    const words = input.toLowerCase().split(/[\s_-]+/)
    const camel =
      words[0] +
      words
        .slice(1)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("")
    setOutput(camel)
  }

  const toPascalCase = () => {
    const words = input.toLowerCase().split(/[\s_-]+/)
    const pascal = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join("")
    setOutput(pascal)
  }

  const toSnakeCase = () => {
    setOutput(input.toLowerCase().replace(/[\s-]+/g, "_"))
  }

  const toKebabCase = () => {
    setOutput(input.toLowerCase().replace(/[\s_]+/g, "-"))
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const clearInput = () => {
    setInput("")
    setOutput("")
  }

  return (
    <div className="grid gap-6">
      <Card className="border-primary/20 transition-all duration-300 hover:border-primary/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 font-mono text-lg">
              <CaseSensitive className="w-5 h-5 text-primary" />
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
            placeholder="输入要转换的文本..."
            className="font-mono min-h-[180px] bg-secondary/50 border-border focus:border-primary/50 transition-all duration-300 focus:shadow-lg focus:shadow-primary/5"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={toUpperCase}
              disabled={!input}
              variant="outline"
              className="font-mono hover:bg-accent hover:text-accent-foreground bg-transparent transition-all duration-300 hover:scale-105 active:scale-95"
            >
              全部大写
            </Button>
            <Button
              onClick={toLowerCase}
              disabled={!input}
              variant="outline"
              className="font-mono hover:bg-accent hover:text-accent-foreground bg-transparent transition-all duration-300 hover:scale-105 active:scale-95"
            >
              全部小写
            </Button>
            <Button
              onClick={toCapitalize}
              disabled={!input}
              variant="outline"
              className="font-mono hover:bg-accent hover:text-accent-foreground bg-transparent transition-all duration-300 hover:scale-105 active:scale-95"
            >
              首字母大写
            </Button>
            <Button
              onClick={toCamelCase}
              disabled={!input}
              variant="outline"
              className="font-mono hover:bg-accent hover:text-accent-foreground bg-transparent transition-all duration-300 hover:scale-105 active:scale-95"
            >
              驼峰命名
            </Button>
            <Button
              onClick={toPascalCase}
              disabled={!input}
              variant="outline"
              className="font-mono hover:bg-accent hover:text-accent-foreground bg-transparent transition-all duration-300 hover:scale-105 active:scale-95"
            >
              帕斯卡命名
            </Button>
            <Button
              onClick={toSnakeCase}
              disabled={!input}
              variant="outline"
              className="font-mono hover:bg-accent hover:text-accent-foreground bg-transparent transition-all duration-300 hover:scale-105 active:scale-95"
            >
              蛇形命名
            </Button>
            <Button
              onClick={toKebabCase}
              disabled={!input}
              variant="outline"
              className="font-mono hover:bg-accent hover:text-accent-foreground bg-transparent transition-all duration-300 hover:scale-105 active:scale-95"
            >
              短横线命名
            </Button>
          </div>
        </CardContent>
      </Card>

      {output && (
        <Card className="border-primary/20 animate-in transition-all duration-300 hover:border-primary/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-mono text-lg">$ output.txt</CardTitle>
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
            </div>
          </CardHeader>
          <CardContent>
            <pre className="bg-secondary/50 p-4 rounded-md overflow-x-auto border border-border transition-all duration-300 hover:border-primary/30">
              <code className="font-mono text-sm text-foreground">{output}</code>
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
