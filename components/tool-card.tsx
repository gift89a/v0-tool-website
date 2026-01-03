import Link from "next/link"
import { Card } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"
import { ArrowUpRight } from "lucide-react"

interface ToolCardProps {
  tool: {
    id: string
    title: string
    description: string
    icon: LucideIcon
    href: string
    color: string
  }
}

export function ToolCard({ tool }: ToolCardProps) {
  const Icon = tool.icon

  return (
    <Link href={tool.href} className="group">
      <Card className="h-full p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 cursor-pointer relative overflow-hidden hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
        <div className="relative space-y-4">
          <div className="flex items-start justify-between">
            <div className="p-2.5 rounded-md bg-secondary border border-border group-hover:border-primary/30 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
              <Icon className="w-5 h-5 text-primary transition-transform duration-300 group-hover:scale-110" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors duration-300">
              {tool.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed font-mono">{tool.description}</p>
          </div>
        </div>
      </Card>
    </Link>
  )
}
