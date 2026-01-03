"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pipette } from "lucide-react"

export function ColorConverterTool() {
  const [hex, setHex] = useState("#3b82f6")
  const [rgb, setRgb] = useState({ r: 59, g: 130, b: 246 })
  const [hsl, setHsl] = useState({ h: 217, s: 91, l: 60 })
  const [error, setError] = useState("")

  const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: Number.parseInt(result[1], 16),
          g: Number.parseInt(result[2], 16),
          b: Number.parseInt(result[3], 16),
        }
      : null
  }

  const rgbToHex = (r: number, g: number, b: number): string => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  }

  const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
    r /= 255
    g /= 255
    b /= 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0
    let s = 0
    const l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6
          break
        case g:
          h = ((b - r) / d + 2) / 6
          break
        case b:
          h = ((r - g) / d + 4) / 6
          break
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    }
  }

  const hslToRgb = (h: number, s: number, l: number): { r: number; g: number; b: number } => {
    h /= 360
    s /= 100
    l /= 100
    let r, g, b

    if (s === 0) {
      r = g = b = l
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1
        if (t > 1) t -= 1
        if (t < 1 / 6) return p + (q - p) * 6 * t
        if (t < 1 / 2) return q
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
        return p
      }

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s
      const p = 2 * l - q
      r = hue2rgb(p, q, h + 1 / 3)
      g = hue2rgb(p, q, h)
      b = hue2rgb(p, q, h - 1 / 3)
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    }
  }

  const updateFromHex = (value: string) => {
    setHex(value)
    if (!/^#?[0-9A-Fa-f]{6}$/.test(value)) {
      setError("HEX格式错误，例如: #3b82f6")
      return
    }

    setError("")
    const rgbValue = hexToRgb(value)
    if (rgbValue) {
      setRgb(rgbValue)
      setHsl(rgbToHsl(rgbValue.r, rgbValue.g, rgbValue.b))
    }
  }

  const updateFromRgb = (color: string, value: string) => {
    const num = Number.parseInt(value) || 0
    if (num < 0 || num > 255) {
      setError("RGB值必须在0-255之间")
      return
    }

    setError("")
    const newRgb = { ...rgb, [color]: num }
    setRgb(newRgb)
    setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b))
    setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b))
  }

  const updateFromHsl = (color: string, value: string) => {
    const num = Number.parseInt(value) || 0
    if ((color === "h" && (num < 0 || num > 360)) || ((color === "s" || color === "l") && (num < 0 || num > 100))) {
      setError("HSL值范围: H(0-360), S(0-100), L(0-100)")
      return
    }

    setError("")
    const newHsl = { ...hsl, [color]: num }
    setHsl(newHsl)
    const rgbValue = hslToRgb(newHsl.h, newHsl.s, newHsl.l)
    setRgb(rgbValue)
    setHex(rgbToHex(rgbValue.r, rgbValue.g, rgbValue.b))
  }

  return (
    <div className="grid gap-6">
      <Card className="border-primary/20 transition-all duration-300 hover:border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-mono text-lg">
            <Pipette className="w-5 h-5 text-primary" />
            <span>$ color converter</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            className="w-full h-32 rounded-md border border-border transition-all duration-300"
            style={{ backgroundColor: hex }}
          />

          <div>
            <label className="text-sm font-mono text-muted-foreground mb-2 block">HEX</label>
            <Input
              placeholder="#3b82f6"
              className="font-mono bg-secondary/50 border-border focus:border-primary/50 transition-all duration-300"
              value={hex}
              onChange={(e) => updateFromHex(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-mono text-muted-foreground mb-2 block">RGB</label>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Input
                  placeholder="R"
                  type="number"
                  min="0"
                  max="255"
                  className="font-mono bg-secondary/50 border-border focus:border-primary/50"
                  value={rgb.r}
                  onChange={(e) => updateFromRgb("r", e.target.value)}
                />
                <p className="text-xs text-muted-foreground font-mono mt-1 text-center">R: 0-255</p>
              </div>
              <div>
                <Input
                  placeholder="G"
                  type="number"
                  min="0"
                  max="255"
                  className="font-mono bg-secondary/50 border-border focus:border-primary/50"
                  value={rgb.g}
                  onChange={(e) => updateFromRgb("g", e.target.value)}
                />
                <p className="text-xs text-muted-foreground font-mono mt-1 text-center">G: 0-255</p>
              </div>
              <div>
                <Input
                  placeholder="B"
                  type="number"
                  min="0"
                  max="255"
                  className="font-mono bg-secondary/50 border-border focus:border-primary/50"
                  value={rgb.b}
                  onChange={(e) => updateFromRgb("b", e.target.value)}
                />
                <p className="text-xs text-muted-foreground font-mono mt-1 text-center">B: 0-255</p>
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-mono text-muted-foreground mb-2 block">HSL</label>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Input
                  placeholder="H"
                  type="number"
                  min="0"
                  max="360"
                  className="font-mono bg-secondary/50 border-border focus:border-primary/50"
                  value={hsl.h}
                  onChange={(e) => updateFromHsl("h", e.target.value)}
                />
                <p className="text-xs text-muted-foreground font-mono mt-1 text-center">H: 0-360</p>
              </div>
              <div>
                <Input
                  placeholder="S"
                  type="number"
                  min="0"
                  max="100"
                  className="font-mono bg-secondary/50 border-border focus:border-primary/50"
                  value={hsl.s}
                  onChange={(e) => updateFromHsl("s", e.target.value)}
                />
                <p className="text-xs text-muted-foreground font-mono mt-1 text-center">S: 0-100</p>
              </div>
              <div>
                <Input
                  placeholder="L"
                  type="number"
                  min="0"
                  max="100"
                  className="font-mono bg-secondary/50 border-border focus:border-primary/50"
                  value={hsl.l}
                  onChange={(e) => updateFromHsl("l", e.target.value)}
                />
                <p className="text-xs text-muted-foreground font-mono mt-1 text-center">L: 0-100</p>
              </div>
            </div>
          </div>

          {error && <p className="text-destructive font-mono text-sm">! {error}</p>}
        </CardContent>
      </Card>
    </div>
  )
}
