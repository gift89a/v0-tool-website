"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Copy, Fingerprint, RefreshCw } from "lucide-react"

export function UuidTool() {
  const [uuids, setUuids] = useState<string[]>([])
  const [count, setCount] = useState(1)
  const [copied, setCopied] = useState<number | null>(null)

  const generateUUID = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0
      const v = c === "x" ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  const generateUUIDs = () => {
    const newUuids = Array.from({ length: count }, () => generateUUID())
    setUuids(newUuids)
  }

  const copyToClipboard = (uuid: string, index: number) => {
    navigator.clipboard.writeText(uuid)
    setCopied(index)
    setTimeout(() => setCopied(null), 2000)
  }

  const copyAllToClipboard = () => {
    navigator.clipboard.writeText(uuids.join("\n"))
    setCopied(-1)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="grid gap-6">
      <Card className="border-primary/20 transition-all duration-300 hover:border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-mono text-lg">
            <Fingerprint className="w-5 h-5 text-primary" />
            <span>$ uuid generator</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-mono text-muted-foreground mb-2 block">生成数量</label>
            <Input
              type="number"
              min="1"
              max="100"
              placeholder="1"
              className="font-mono bg-secondary/50 border-border focus:border-primary/50 transition-all duration-300"
              value={count}
              onChange={(e) => setCount(Math.min(100, Math.max(1, Number.parseInt(e.target.value) || 1)))}
            />
          </div>
          <Button
            onClick={generateUUIDs}
            className="w-full gap-2 font-mono transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <RefreshCw className="w-4 h-4" />
            生成 UUID
          </Button>
        </CardContent>
      </Card>

      {uuids.length > 0 && (
        <Card className="border-primary/20 animate-in transition-all duration-300 hover:border-primary/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-mono text-lg">$ output ({uuids.length})</CardTitle>
              {uuids.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyAllToClipboard}
                  className={`gap-2 font-mono hover:bg-primary/10 hover:text-primary transition-all duration-300 ${copied === -1 ? "pulse-success" : ""}`}
                >
                  {copied === -1 ? (
                    <>
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-green-500">copied all!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      copy all
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {uuids.map((uuid, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-3 bg-secondary/50 rounded-md border border-border hover:border-primary/30 transition-all duration-300"
                >
                  <code className="flex-1 font-mono text-sm text-foreground">{uuid}</code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(uuid, index)}
                    className={`gap-2 font-mono hover:bg-primary/10 hover:text-primary transition-all duration-300 ${copied === index ? "pulse-success" : ""}`}
                  >
                    {copied === index ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
