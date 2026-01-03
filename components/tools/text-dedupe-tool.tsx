"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Check, Copy, List, Trash2 } from "lucide-react"

export function TextDedupeTool() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [sortLines, setSortLines] = useState(false)
  const [ignoreCase, setIgnoreCase] = useState(false)
  const [copied, setCopied] = useState(false)

  const deduplicate = () => {
    if (!input) return

    let lines = input.split("\n")

    // Remove duplicates
    if (ignoreCase) {
      const seen = new Set<string>()
      lines = lines.filter((line) => {
        const lower = line.toLowerCase()
        if (seen.has(lower)) return false
        seen.add(lower)
        return true
      })
    } else {
      lines = [...new Set(lines)]
    }

    // Sort if needed
    if (sortLines) {
      lines.sort((a, b) => {
        if (ignoreCase) {
          return a.toLowerCase().localeCompare(b.toLowerCase())
        }
        return a.localeCompare(b)
      })
    }

    setOutput(lines.join("\n"))
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
              <List className="w-5 h-5 text-primary" />
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
            placeholder="输入文本（每行一条记录）..."
            className="font-mono min-h-[240px] bg-secondary/50 border-border focus:border-primary/50 transition-all duration-300 focus:shadow-lg focus:shadow-primary/5"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="sort" checked={sortLines} onCheckedChange={(checked) => setSortLines(checked as boolean)} />
              <label htmlFor="sort" className="text-sm font-mono cursor-pointer">
                排序结果
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="ignoreCase"
                checked={ignoreCase}
                onCheckedChange={(checked) => setIgnoreCase(checked as boolean)}
              />
              <label htmlFor="ignoreCase" className="text-sm font-mono cursor-pointer">
                忽略大小写
              </label>
            </div>
          </div>
          <Button
            onClick={deduplicate}
            disabled={!input}
            className="w-full gap-2 font-mono transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <List className="w-4 h-4" />
            去重
          </Button>
        </CardContent>
      </Card>

      {output && (
        <Card className="border-primary/20 animate-in transition-all duration-300 hover:border-primary/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-mono text-lg">$ output.txt ({output.split("\n").length} lines)</CardTitle>
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
