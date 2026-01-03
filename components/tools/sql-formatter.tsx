"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Copy, Database, Trash2 } from "lucide-react"

export function SqlFormatter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const formatSql = () => {
    setIsProcessing(true)
    setTimeout(() => {
      try {
        const formatted = formatSqlString(input)
        setOutput(formatted)
        setError("")
      } catch (e) {
        setError("处理失败")
        setOutput("")
      }
      setIsProcessing(false)
    }, 200)
  }

  const formatSqlString = (sql: string): string => {
    const keywords = [
      "SELECT",
      "FROM",
      "WHERE",
      "JOIN",
      "LEFT JOIN",
      "RIGHT JOIN",
      "INNER JOIN",
      "ON",
      "AND",
      "OR",
      "ORDER BY",
      "GROUP BY",
      "HAVING",
      "LIMIT",
      "OFFSET",
      "INSERT INTO",
      "VALUES",
      "UPDATE",
      "SET",
      "DELETE FROM",
      "CREATE TABLE",
      "ALTER TABLE",
      "DROP TABLE",
    ]

    let formatted = sql.trim()

    // Replace multiple spaces with single space
    formatted = formatted.replace(/\s+/g, " ")

    // Add newlines before major keywords
    keywords.forEach((keyword) => {
      const regex = new RegExp(`\\b${keyword}\\b`, "gi")
      formatted = formatted.replace(regex, `\n${keyword}`)
    })

    // Add indentation
    const lines = formatted.split("\n")
    let result = ""
    const indent = 0

    lines.forEach((line) => {
      line = line.trim()
      if (line) {
        if (line.match(/^(FROM|WHERE|JOIN|LEFT JOIN|RIGHT JOIN|INNER JOIN|ON|ORDER BY|GROUP BY|HAVING|LIMIT)/i)) {
          result += "  ".repeat(indent) + line + "\n"
        } else {
          result += line + "\n"
        }
      }
    })

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
              <Database className="w-5 h-5 text-primary" />
              <span>$ input.sql</span>
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
            placeholder="SELECT * FROM users WHERE age > 18 ORDER BY name"
            className="font-mono min-h-[240px] bg-secondary/50 border-border focus:border-primary/50 transition-all duration-300 focus:shadow-lg focus:shadow-primary/5"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={formatSql}
            disabled={isProcessing || !input}
            className="w-full gap-2 font-mono transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Database className={`w-4 h-4 ${isProcessing ? "animate-spin" : ""}`} />
            {isProcessing ? "处理中..." : "格式化"}
          </Button>
        </CardContent>
      </Card>

      {(output || error) && (
        <Card className="border-primary/20 animate-in transition-all duration-300 hover:border-primary/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-mono text-lg">{error ? "$ error" : "$ output.sql"}</CardTitle>
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
