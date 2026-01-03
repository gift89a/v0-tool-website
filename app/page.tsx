import { TopNav } from "@/components/top-nav"
import { Terminal, Sparkles, Shield, Zap } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "DevTools 开发者工具箱 - 免费在线开发者工具集合",
  description:
    "免费在线开发者工具集合，包含JSON格式化、Base64编解码、二维码生成、MD5加密、URL编解码、时间戳转换等实用工具。所有工具本地运行，保护隐私安全。",
  keywords: [
    "开发者工具",
    "在线工具",
    "JSON格式化",
    "Base64编码",
    "二维码生成",
    "MD5加密",
    "URL编码",
    "时间戳转换",
    "开发工具",
    "程序员工具",
  ],
  openGraph: {
    title: "DevTools 开发者工具箱 - 免费在线开发者工具集合",
    description:
      "免费在线开发者工具集合，包含JSON格式化、Base64编解码、二维码生成等实用工具。所有工具本地运行，保护隐私安全。",
    type: "website",
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />

      <main className="container mx-auto px-8 py-12 max-w-4xl">
        <div className="space-y-12">
          {/* Hero Section */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary/10 border border-primary/20">
              <Terminal className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-mono text-primary">~/devtools</span>
            </div>

            <div>
              <h1 className="text-6xl md:text-7xl font-bold mb-6 text-balance tracking-tight">
                Developer
                <br />
                <span className="text-primary">Utilities</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl font-mono leading-relaxed">
                $ 快速、安全的客户端工具集
                <br />$ 无需服务器，隐私优先
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            <div className="group p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-all hover:-translate-y-1">
              <Zap className="w-8 h-8 text-primary mb-4 transition-transform group-hover:scale-110" />
              <h3 className="font-bold mb-2 font-mono">极速响应</h3>
              <p className="text-sm text-muted-foreground font-mono">所有工具本地运行，毫秒级处理</p>
            </div>

            <div className="group p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-all hover:-translate-y-1">
              <Shield className="w-8 h-8 text-primary mb-4 transition-transform group-hover:scale-110" />
              <h3 className="font-bold mb-2 font-mono">隐私保护</h3>
              <p className="text-sm text-muted-foreground font-mono">数据不上传，完全在浏览器处理</p>
            </div>

            <div className="group p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-all hover:-translate-y-1">
              <Sparkles className="w-8 h-8 text-primary mb-4 transition-transform group-hover:scale-110" />
              <h3 className="font-bold mb-2 font-mono">开箱即用</h3>
              <p className="text-sm text-muted-foreground font-mono">无需安装，打开即用</p>
            </div>
          </div>

          {/* Getting Started */}
          <div className="mt-12 p-8 rounded-lg border border-border bg-card/50">
            <h2 className="text-2xl font-bold mb-4 font-mono flex items-center gap-2">
              <Terminal className="w-6 h-6 text-primary" />
              快速开始
            </h2>
            <div className="space-y-3 font-mono text-sm text-muted-foreground">
              <p className="flex items-start gap-2">
                <span className="text-primary">$</span>
                <span>从顶部菜单选择你需要的工具</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-primary">$</span>
                <span>输入或粘贴你的数据</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-primary">$</span>
                <span>点击按钮处理，即刻获得结果</span>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
