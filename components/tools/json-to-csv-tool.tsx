"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Copy, FileSpreadsheet, Download, Trash2 } from "lucide-react"

export function JsonToCsvTool() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  const jsonToCsv = () => {
    if (!input) return

    try {
      const data = JSON.parse(input)

      if (!Array.isArray(data) || data.length === 0) {
        setError("JSON必须是非空数组")
        setOutput("")
        return
      }

      // Get all unique keys
      const keys = Array.from(new Set(data.flatMap((obj) => Object.keys(obj))))

      // Create CSV header
      const header = keys.join(",")

      // Create CSV rows
      const rows = data.map((obj) => {
        return keys
          .map((key) => {
            const value = obj[key]
            if (value === null || value === undefined) return ""
            const str = String(value)
            // Escape quotes and wrap in quotes if contains comma or newline
            if (str.includes(",") || str.includes("\n") || str.includes('"')) {
              return `"${str.replace(/"/g, '""')}"`
            }
            return str
          })
          .join(",")
      })

      const csv = [header, ...rows].join("\n")
      setOutput(csv)
      setError("")
    } catch (e) {
      setError("无效的JSON格式")
      setOutput("")
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadCsv = () => {
    const blob = new Blob([output], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = "data.csv"
    link.click()
  }

  const clearInput = () => {
    setInput("")
    setOutput("")
    setError("")
  }

  return (
    <div className="grid gap-6">
      <Card className="border-primary/20 transition-all duration-300 hover:border-primary/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 font-mono text-lg">
              <FileSpreadsheet className="w-5 h-5 text-primary" />
              <span>$ input.json</span>
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
            placeholder='[{"name":"张三","age":25},{"name":"李四","age":30}]'
            className="font-mono min-h-[240px] bg-secondary/50 border-border focus:border-primary/50 transition-all duration-300 focus:shadow-lg focus:shadow-primary/5"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={jsonToCsv}
            disabled={!input}
            className="w-full gap-2 font-mono transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <FileSpreadsheet className="w-4 h-4" />
            转换为 CSV
          </Button>
        </CardContent>
      </Card>

      {error && (
        <Card className="border-destructive/50">
          <CardContent className="pt-6">
            <p className="text-destructive font-mono text-sm">! {error}</p>
          </CardContent>
        </Card>
      )}

      {output && (
        <Card className="border-primary/20 animate-in transition-all duration-300 hover:border-primary/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-mono text-lg">$ output.csv</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={downloadCsv}
                  className="gap-2 font-mono hover:bg-primary/10 hover:text-primary transition-all duration-300"
                >
                  <Download className="w-4 h-4" />
                  download
                </Button>
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
