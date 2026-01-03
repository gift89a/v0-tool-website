"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator } from "lucide-react"

export function NumberBaseTool() {
  const [binary, setBinary] = useState("")
  const [octal, setOctal] = useState("")
  const [decimal, setDecimal] = useState("")
  const [hexadecimal, setHexadecimal] = useState("")
  const [error, setError] = useState("")

  const updateFromBinary = (value: string) => {
    setBinary(value)
    if (!value) {
      setOctal("")
      setDecimal("")
      setHexadecimal("")
      setError("")
      return
    }

    if (!/^[01]+$/.test(value)) {
      setError("二进制只能包含0和1")
      return
    }

    setError("")
    const dec = Number.parseInt(value, 2)
    setDecimal(dec.toString())
    setOctal(dec.toString(8))
    setHexadecimal(dec.toString(16).toUpperCase())
  }

  const updateFromOctal = (value: string) => {
    setOctal(value)
    if (!value) {
      setBinary("")
      setDecimal("")
      setHexadecimal("")
      setError("")
      return
    }

    if (!/^[0-7]+$/.test(value)) {
      setError("八进制只能包含0-7")
      return
    }

    setError("")
    const dec = Number.parseInt(value, 8)
    setDecimal(dec.toString())
    setBinary(dec.toString(2))
    setHexadecimal(dec.toString(16).toUpperCase())
  }

  const updateFromDecimal = (value: string) => {
    setDecimal(value)
    if (!value) {
      setBinary("")
      setOctal("")
      setHexadecimal("")
      setError("")
      return
    }

    if (!/^\d+$/.test(value)) {
      setError("十进制只能包含数字")
      return
    }

    setError("")
    const dec = Number.parseInt(value, 10)
    setBinary(dec.toString(2))
    setOctal(dec.toString(8))
    setHexadecimal(dec.toString(16).toUpperCase())
  }

  const updateFromHexadecimal = (value: string) => {
    setHexadecimal(value.toUpperCase())
    if (!value) {
      setBinary("")
      setOctal("")
      setDecimal("")
      setError("")
      return
    }

    if (!/^[0-9A-Fa-f]+$/.test(value)) {
      setError("十六进制只能包含0-9和A-F")
      return
    }

    setError("")
    const dec = Number.parseInt(value, 16)
    setDecimal(dec.toString())
    setBinary(dec.toString(2))
    setOctal(dec.toString(8))
  }

  return (
    <div className="grid gap-6">
      <Card className="border-primary/20 transition-all duration-300 hover:border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-mono text-lg">
            <Calculator className="w-5 h-5 text-primary" />
            <span>$ number converter</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-mono text-muted-foreground mb-2 block">二进制 (Binary)</label>
            <Input
              placeholder="例如: 1010"
              className="font-mono bg-secondary/50 border-border focus:border-primary/50 transition-all duration-300"
              value={binary}
              onChange={(e) => updateFromBinary(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-mono text-muted-foreground mb-2 block">八进制 (Octal)</label>
            <Input
              placeholder="例如: 12"
              className="font-mono bg-secondary/50 border-border focus:border-primary/50 transition-all duration-300"
              value={octal}
              onChange={(e) => updateFromOctal(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-mono text-muted-foreground mb-2 block">十进制 (Decimal)</label>
            <Input
              placeholder="例如: 10"
              className="font-mono bg-secondary/50 border-border focus:border-primary/50 transition-all duration-300"
              value={decimal}
              onChange={(e) => updateFromDecimal(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-mono text-muted-foreground mb-2 block">十六进制 (Hexadecimal)</label>
            <Input
              placeholder="例如: A"
              className="font-mono bg-secondary/50 border-border focus:border-primary/50 transition-all duration-300"
              value={hexadecimal}
              onChange={(e) => updateFromHexadecimal(e.target.value)}
            />
          </div>

          {error && <p className="text-destructive font-mono text-sm">! {error}</p>}
        </CardContent>
      </Card>
    </div>
  )
}
