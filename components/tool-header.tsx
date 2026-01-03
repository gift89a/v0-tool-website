import Link from "next/link"
import { Terminal } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function ToolHeader() {
  return (
    <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="p-1.5 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 border border-primary/20 group-hover:scale-110">
              <Terminal className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold font-mono tracking-tight group-hover:text-primary transition-colors">
                devtools
              </h1>
            </div>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
