import type { ReactNode } from "react"
import { TopNav } from "@/components/top-nav"

interface ToolLayoutProps {
  title: string
  description: string
  children: ReactNode
}

export function ToolLayout({ title, description, children }: ToolLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />

      <main className="container mx-auto px-8 py-8 max-w-5xl">
        <div className="mb-8 border-l-2 border-primary pl-6 space-y-2">
          <h1 className="text-4xl font-bold tracking-tight font-mono">{title}</h1>
          <p className="text-muted-foreground font-mono text-sm">$ {description}</p>
        </div>
        {children}
      </main>
    </div>
  )
}
