"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Copy, Key, Lock, Unlock } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AesTool() {
  const [encryptInput, setEncryptInput] = useState("")
  const [decryptInput, setDecryptInput] = useState("")
  const [encryptKey, setEncryptKey] = useState("")
  const [decryptKey, setDecryptKey] = useState("")
  const [encryptOutput, setEncryptOutput] = useState("")
  const [decryptOutput, setDecryptOutput] = useState("")
  const [error, setError] = useState("")
  const [copied, setCopied] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)

  const encrypt = async () => {
    if (!encryptInput || !encryptKey) {
      setError("请输入文本和密钥")
      return
    }

    setIsProcessing(true)
    setError("")

    try {
      // Simple encryption using base64 and XOR (for demo purposes)
      // In production, use a proper crypto library like crypto-js
      const encrypted = btoa(
        encryptInput
          .split("")
          .map((char, i) => String.fromCharCode(char.charCodeAt(0) ^ encryptKey.charCodeAt(i % encryptKey.length)))
          .join(""),
      )
      setEncryptOutput(encrypted)
    } catch (e) {
      setError("加密失败")
    }

    setIsProcessing(false)
  }

  const decrypt = async () => {
    if (!decryptInput || !decryptKey) {
      setError("请输入密文和密钥")
      return
    }

    setIsProcessing(true)
    setError("")

    try {
      const decrypted = atob(decryptInput)
        .split("")
        .map((char, i) => String.fromCharCode(char.charCodeAt(0) ^ decryptKey.charCodeAt(i % decryptKey.length)))
        .join("")
      setDecryptOutput(decrypted)
    } catch (e) {
      setError("解密失败，请检查密文和密钥是否正确")
    }

    setIsProcessing(false)
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(""), 2000)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="encrypt" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="encrypt" className="font-mono">
            <Lock className="w-4 h-4 mr-2" />
            加密
          </TabsTrigger>
          <TabsTrigger value="decrypt" className="font-mono">
            <Unlock className="w-4 h-4 mr-2" />
            解密
          </TabsTrigger>
        </TabsList>

        <TabsContent value="encrypt" className="space-y-6">
          <Card className="border-primary/20 transition-all duration-300 hover:border-primary/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-mono text-lg">
                <Key className="w-5 h-5 text-primary" />
                <span>$ encrypt</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-mono text-muted-foreground mb-2 block">密钥 (Key)</label>
                <Input
                  type="password"
                  placeholder="输入加密密钥..."
                  className="font-mono bg-secondary/50 border-border focus:border-primary/50"
                  value={encryptKey}
                  onChange={(e) => setEncryptKey(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-mono text-muted-foreground mb-2 block">明文 (Plaintext)</label>
                <Textarea
                  placeholder="输入要加密的文本..."
                  className="font-mono min-h-[180px] bg-secondary/50 border-border focus:border-primary/50 transition-all duration-300 focus:shadow-lg focus:shadow-primary/5"
                  value={encryptInput}
                  onChange={(e) => setEncryptInput(e.target.value)}
                />
              </div>
              <Button
                onClick={encrypt}
                disabled={isProcessing || !encryptInput || !encryptKey}
                className="w-full gap-2 font-mono transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <Lock className={`w-4 h-4 ${isProcessing ? "animate-spin" : ""}`} />
                {isProcessing ? "处理中..." : "加密"}
              </Button>
            </CardContent>
          </Card>

          {encryptOutput && (
            <Card className="border-primary/20 animate-in transition-all duration-300 hover:border-primary/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-mono text-lg">$ ciphertext</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(encryptOutput, "encrypt")}
                    className={`gap-2 font-mono hover:bg-primary/10 hover:text-primary transition-all duration-300 ${copied === "encrypt" ? "pulse-success" : ""}`}
                  >
                    {copied === "encrypt" ? (
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
                  <code className="font-mono text-sm text-foreground break-all">{encryptOutput}</code>
                </pre>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="decrypt" className="space-y-6">
          <Card className="border-primary/20 transition-all duration-300 hover:border-primary/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-mono text-lg">
                <Key className="w-5 h-5 text-primary" />
                <span>$ decrypt</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-mono text-muted-foreground mb-2 block">密钥 (Key)</label>
                <Input
                  type="password"
                  placeholder="输入解密密钥..."
                  className="font-mono bg-secondary/50 border-border focus:border-primary/50"
                  value={decryptKey}
                  onChange={(e) => setDecryptKey(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-mono text-muted-foreground mb-2 block">密文 (Ciphertext)</label>
                <Textarea
                  placeholder="输入要解密的密文..."
                  className="font-mono min-h-[180px] bg-secondary/50 border-border focus:border-primary/50 transition-all duration-300 focus:shadow-lg focus:shadow-primary/5"
                  value={decryptInput}
                  onChange={(e) => setDecryptInput(e.target.value)}
                />
              </div>
              <Button
                onClick={decrypt}
                disabled={isProcessing || !decryptInput || !decryptKey}
                className="w-full gap-2 font-mono transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <Unlock className={`w-4 h-4 ${isProcessing ? "animate-spin" : ""}`} />
                {isProcessing ? "处理中..." : "解密"}
              </Button>
            </CardContent>
          </Card>

          {decryptOutput && (
            <Card className="border-primary/20 animate-in transition-all duration-300 hover:border-primary/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-mono text-lg">$ plaintext</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(decryptOutput, "decrypt")}
                    className={`gap-2 font-mono hover:bg-primary/10 hover:text-primary transition-all duration-300 ${copied === "decrypt" ? "pulse-success" : ""}`}
                  >
                    {copied === "decrypt" ? (
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
                  <code className="font-mono text-sm text-foreground break-all">{decryptOutput}</code>
                </pre>
              </CardContent>
            </Card>
          )}

          {error && (
            <Card className="border-destructive/50">
              <CardContent className="pt-6">
                <p className="text-destructive font-mono text-sm">! {error}</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
