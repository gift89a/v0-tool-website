"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileSearch } from "lucide-react"

export function TextDiffTool() {
  const [text1, setText1] = useState("")
  const [text2, setText2] = useState("")

  const getDiff = () => {
    if (!text1 || !text2) return null

    const lines1 = text1.split("\n")
    const lines2 = text2.split("\n")
    const maxLength = Math.max(lines1.length, lines2.length)
    const diff: Array<{ line1: string; line2: string; status: "same" | "different" | "added" | "removed" }> = []

    for (let i = 0; i < maxLength; i++) {
      const l1 = lines1[i] || ""
      const l2 = lines2[i] || ""

      if (l1 === l2) {
        diff.push({ line1: l1, line2: l2, status: "same" })
      } else if (l1 && l2) {
        diff.push({ line1: l1, line2: l2, status: "different" })
      } else if (l1) {
        diff.push({ line1: l1, line2: "", status: "removed" })
      } else {
        diff.push({ line1: "", line2: l2, status: "added" })
      }
    }

    return diff
  }

  const diff = getDiff()

  return (
    <div className="grid gap-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-primary/20 transition-all duration-300 hover:border-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-mono text-lg">
              <FileSearch className="w-5 h-5 text-primary" />
              <span>$ text1.txt</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="输入第一段文本..."
              className="font-mono min-h-[300px] bg-secondary/50 border-border focus:border-primary/50 transition-all duration-300 focus:shadow-lg focus:shadow-primary/5"
              value={text1}
              onChange={(e) => setText1(e.target.value)}
            />
          </CardContent>
        </Card>

        <Card className="border-primary/20 transition-all duration-300 hover:border-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-mono text-lg">
              <FileSearch className="w-5 h-5 text-primary" />
              <span>$ text2.txt</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="输入第二段文本..."
              className="font-mono min-h-[300px] bg-secondary/50 border-border focus:border-primary/50 transition-all duration-300 focus:shadow-lg focus:shadow-primary/5"
              value={text2}
              onChange={(e) => setText2(e.target.value)}
            />
          </CardContent>
        </Card>
      </div>

      {diff && diff.length > 0 && (
        <Card className="border-primary/20 animate-in transition-all duration-300 hover:border-primary/30">
          <CardHeader>
            <CardTitle className="font-mono text-lg">$ diff result</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {diff.map((item, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-2 gap-4 p-2 rounded font-mono text-sm ${
                    item.status === "same"
                      ? "bg-secondary/30"
                      : item.status === "different"
                        ? "bg-yellow-500/10 border-l-2 border-yellow-500"
                        : item.status === "removed"
                          ? "bg-red-500/10 border-l-2 border-red-500"
                          : "bg-green-500/10 border-l-2 border-green-500"
                  }`}
                >
                  <div className="break-all">{item.line1 || <span className="text-muted-foreground">—</span>}</div>
                  <div className="break-all">{item.line2 || <span className="text-muted-foreground">—</span>}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-4 text-xs font-mono">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500/50 rounded" />
                <span>已修改</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500/50 rounded" />
                <span>已删除</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500/50 rounded" />
                <span>已添加</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
