"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Check, Copy, Lock, RefreshCw } from "lucide-react"

export function PasswordTool() {
  const [passwords, setPasswords] = useState<string[]>([])
  const [length, setLength] = useState(16)
  const [count, setCount] = useState(1)
  const [useUppercase, setUseUppercase] = useState(true)
  const [useLowercase, setUseLowercase] = useState(true)
  const [useNumbers, setUseNumbers] = useState(true)
  const [useSymbols, setUseSymbols] = useState(true)
  const [copied, setCopied] = useState<number | null>(null)

  const generatePassword = () => {
    let chars = ""
    if (useUppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (useLowercase) chars += "abcdefghijklmnopqrstuvwxyz"
    if (useNumbers) chars += "0123456789"
    if (useSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?"

    if (chars === "") return ""

    let password = ""
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return password
  }

  const generatePasswords = () => {
    const newPasswords = Array.from({ length: count }, () => generatePassword())
    setPasswords(newPasswords)
  }

  const copyToClipboard = (password: string, index: number) => {
    navigator.clipboard.writeText(password)
    setCopied(index)
    setTimeout(() => setCopied(null), 2000)
  }

  const copyAllToClipboard = () => {
    navigator.clipboard.writeText(passwords.join("\n"))
    setCopied(-1)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="grid gap-6">
      <Card className="border-primary/20 transition-all duration-300 hover:border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-mono text-lg">
            <Lock className="w-5 h-5 text-primary" />
            <span>$ password generator</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-mono text-muted-foreground mb-2 block">密码长度</label>
              <Input
                type="number"
                min="4"
                max="128"
                placeholder="16"
                className="font-mono bg-secondary/50 border-border focus:border-primary/50 transition-all duration-300"
                value={length}
                onChange={(e) => setLength(Math.min(128, Math.max(4, Number.parseInt(e.target.value) || 16)))}
              />
            </div>
            <div>
              <label className="text-sm font-mono text-muted-foreground mb-2 block">生成数量</label>
              <Input
                type="number"
                min="1"
                max="20"
                placeholder="1"
                className="font-mono bg-secondary/50 border-border focus:border-primary/50 transition-all duration-300"
                value={count}
                onChange={(e) => setCount(Math.min(20, Math.max(1, Number.parseInt(e.target.value) || 1)))}
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-mono text-muted-foreground">字符类型</label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="uppercase"
                  checked={useUppercase}
                  onCheckedChange={(checked) => setUseUppercase(checked as boolean)}
                />
                <label htmlFor="uppercase" className="text-sm font-mono cursor-pointer">
                  大写字母 (A-Z)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="lowercase"
                  checked={useLowercase}
                  onCheckedChange={(checked) => setUseLowercase(checked as boolean)}
                />
                <label htmlFor="lowercase" className="text-sm font-mono cursor-pointer">
                  小写字母 (a-z)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="numbers"
                  checked={useNumbers}
                  onCheckedChange={(checked) => setUseNumbers(checked as boolean)}
                />
                <label htmlFor="numbers" className="text-sm font-mono cursor-pointer">
                  数字 (0-9)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="symbols"
                  checked={useSymbols}
                  onCheckedChange={(checked) => setUseSymbols(checked as boolean)}
                />
                <label htmlFor="symbols" className="text-sm font-mono cursor-pointer">
                  符号 (!@#$...)
                </label>
              </div>
            </div>
          </div>

          <Button
            onClick={generatePasswords}
            disabled={!useUppercase && !useLowercase && !useNumbers && !useSymbols}
            className="w-full gap-2 font-mono transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <RefreshCw className="w-4 h-4" />
            生成密码
          </Button>
        </CardContent>
      </Card>

      {passwords.length > 0 && (
        <Card className="border-primary/20 animate-in transition-all duration-300 hover:border-primary/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-mono text-lg">$ output ({passwords.length})</CardTitle>
              {passwords.length > 1 && (
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
              {passwords.map((password, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-3 bg-secondary/50 rounded-md border border-border hover:border-primary/30 transition-all duration-300"
                >
                  <code className="flex-1 font-mono text-sm text-foreground break-all">{password}</code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(password, index)}
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
