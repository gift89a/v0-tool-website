"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { QrCode, Download, Sparkles } from "lucide-react"

export function QRCodeGenerator() {
  const [text, setText] = useState("")
  const [qrUrl, setQrUrl] = useState("")

  const generateQR = () => {
    if (text.trim()) {
      const encodedText = encodeURIComponent(text)
      setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodedText}`)
    }
  }

  const downloadQR = () => {
    if (qrUrl) {
      const link = document.createElement("a")
      link.href = qrUrl
      link.download = "qrcode.png"
      link.click()
    }
  }

  return (
    <div className="grid gap-6">
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-mono text-lg">
            <QrCode className="w-5 h-5 text-primary" />
            <span>$ generate qr-code</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="qr-text" className="font-mono text-sm text-muted-foreground">
              # 文本或URL
            </Label>
            <Input
              id="qr-text"
              placeholder="https://example.com 或任何文本..."
              className="font-mono bg-secondary/50 border-border focus:border-primary/50 transition-colors"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && generateQR()}
            />
          </div>
          <Button onClick={generateQR} className="w-full gap-2 font-mono">
            <Sparkles className="w-4 h-4" />
            生成二维码
          </Button>
        </CardContent>
      </Card>

      {qrUrl && (
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="font-mono text-lg">$ output.png</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center bg-secondary/30 p-8 rounded-md border border-border">
              <div className="bg-white p-4 rounded-md shadow-lg">
                <img src={qrUrl || "/placeholder.svg"} alt="QR Code" className="max-w-[300px]" />
              </div>
            </div>
            <Button
              onClick={downloadQR}
              variant="outline"
              className="w-full gap-2 font-mono hover:bg-accent hover:text-accent-foreground bg-transparent"
            >
              <Download className="w-4 h-4" />
              下载二维码
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
