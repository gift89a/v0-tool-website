"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3 } from "lucide-react"

export function TextStatsTool() {
  const [text, setText] = useState("")

  const getStats = () => {
    if (!text)
      return {
        chars: 0,
        charsNoSpaces: 0,
        words: 0,
        lines: 0,
        paragraphs: 0,
      }

    const chars = text.length
    const charsNoSpaces = text.replace(/\s/g, "").length
    const words = text
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0).length
    const lines = text.split("\n").length
    const paragraphs = text.split(/\n\n+/).filter((p) => p.trim().length > 0).length

    return { chars, charsNoSpaces, words, lines, paragraphs }
  }

  const stats = getStats()

  return (
    <div className="grid gap-6">
      <Card className="border-primary/20 transition-all duration-300 hover:border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-mono text-lg">
            <BarChart3 className="w-5 h-5 text-primary" />
            <span>$ input.txt</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="输入要统计的文本..."
            className="font-mono min-h-[300px] bg-secondary/50 border-border focus:border-primary/50 transition-all duration-300 focus:shadow-lg focus:shadow-primary/5"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </CardContent>
      </Card>

      <Card className="border-primary/20 transition-all duration-300 hover:border-primary/30">
        <CardHeader>
          <CardTitle className="font-mono text-lg">$ statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 bg-secondary/50 rounded-md border border-border">
              <p className="text-sm font-mono text-muted-foreground mb-1">字符数</p>
              <p className="text-2xl font-bold font-mono text-primary">{stats.chars.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-secondary/50 rounded-md border border-border">
              <p className="text-sm font-mono text-muted-foreground mb-1">字符数（无空格）</p>
              <p className="text-2xl font-bold font-mono text-primary">{stats.charsNoSpaces.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-secondary/50 rounded-md border border-border">
              <p className="text-sm font-mono text-muted-foreground mb-1">单词数</p>
              <p className="text-2xl font-bold font-mono text-primary">{stats.words.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-secondary/50 rounded-md border border-border">
              <p className="text-sm font-mono text-muted-foreground mb-1">行数</p>
              <p className="text-2xl font-bold font-mono text-primary">{stats.lines.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-secondary/50 rounded-md border border-border">
              <p className="text-sm font-mono text-muted-foreground mb-1">段落数</p>
              <p className="text-2xl font-bold font-mono text-primary">{stats.paragraphs.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
