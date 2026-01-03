"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Check, Copy, Dices, RefreshCw } from "lucide-react"

export function RandomNumberTool() {
  const [numbers, setNumbers] = useState<number[]>([])
  const [min, setMin] = useState(1)
  const [max, setMax] = useState(100)
  const [count, setCount] = useState(10)
  const [allowDuplicates, setAllowDuplicates] = useState(true)
  const [copied, setCopied] = useState(false)

  const generateNumbers = () => {
    if (min >= max) {
      return
    }

    const newNumbers: number[] = []
    const available = max - min + 1

    if (!allowDuplicates && count > available) {
      setCount(available)
    }

    if (allowDuplicates) {
      for (let i = 0; i < count; i++) {
        newNumbers.push(Math.floor(Math.random() * (max - min + 1)) + min)
      }
    } else {
      const pool = Array.from({ length: available }, (_, i) => i + min)
      for (let i = 0; i < Math.min(count, available); i++) {
        const index = Math.floor(Math.random() * pool.length)
        newNumbers.push(pool[index])
        pool.splice(index, 1)
      }
    }

    setNumbers(newNumbers)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(numbers.join(", "))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid gap-6">
      <Card className="border-primary/20 transition-all duration-300 hover:border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-mono text-lg">
            <Dices className="w-5 h-5 text-primary" />
            <span>$ random number generator</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-mono text-muted-foreground mb-2 block">最小值</label>
              <Input
                type="number"
                placeholder="1"
                className="font-mono bg-secondary/50 border-border focus:border-primary/50 transition-all duration-300"
                value={min}
                onChange={(e) => setMin(Number.parseInt(e.target.value) || 0)}
              />
            </div>
            <div>
              <label className="text-sm font-mono text-muted-foreground mb-2 block">最大值</label>
              <Input
                type="number"
                placeholder="100"
                className="font-mono bg-secondary/50 border-border focus:border-primary/50 transition-all duration-300"
                value={max}
                onChange={(e) => setMax(Number.parseInt(e.target.value) || 100)}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-mono text-muted-foreground mb-2 block">生成数量</label>
            <Input
              type="number"
              min="1"
              max="1000"
              placeholder="10"
              className="font-mono bg-secondary/50 border-border focus:border-primary/50 transition-all duration-300"
              value={count}
              onChange={(e) => setCount(Math.min(1000, Math.max(1, Number.parseInt(e.target.value) || 10)))}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="duplicates"
              checked={allowDuplicates}
              onCheckedChange={(checked) => setAllowDuplicates(checked as boolean)}
            />
            <label htmlFor="duplicates" className="text-sm font-mono cursor-pointer">
              允许重复
            </label>
          </div>

          <Button
            onClick={generateNumbers}
            disabled={min >= max}
            className="w-full gap-2 font-mono transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <RefreshCw className="w-4 h-4" />
            生成随机数
          </Button>
        </CardContent>
      </Card>

      {numbers.length > 0 && (
        <Card className="border-primary/20 animate-in transition-all duration-300 hover:border-primary/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-mono text-lg">$ output ({numbers.length})</CardTitle>
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
            <div className="bg-secondary/50 p-4 rounded-md border border-border transition-all duration-300 hover:border-primary/30">
              <div className="flex flex-wrap gap-2">
                {numbers.map((number, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/10 rounded-md font-mono text-sm border border-primary/20"
                  >
                    {number}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
