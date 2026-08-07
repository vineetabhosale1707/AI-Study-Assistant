"use client"

import { useEffect, useState } from "react"
import { BookOpen, GraduationCap, Home, Moon, NotebookPen, Settings, Sun, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { useStudy, type PageKey } from "./store"

const NAV: { key: PageKey; label: string; icon: typeof Home }[] = [
  { key: "home", label: "Home", icon: Home },
  { key: "workspace", label: "Study Workspace", icon: BookOpen },
  { key: "notes", label: "My Notes", icon: NotebookPen },
  { key: "profile", label: "Profile", icon: User },
  { key: "settings", label: "Settings", icon: Settings },
]

export function NavBar() {
  const { page, setPage } = useStudy()
  const [dark, setDark] = useState(true)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle("dark", dark)
    root.classList.toggle("light", !dark)
  }, [dark])

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-4">
      <div className="glass mx-auto flex max-w-6xl items-center gap-2 rounded-full px-3 py-2 sm:px-4">
        {/* Brand */}
        <button
          onClick={() => setPage("home")}
          className="flex items-center gap-2 rounded-full pr-2 outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
          aria-label="StudyMate AI home"
        >
          <span className="flex size-9 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
            <GraduationCap className="size-5" />
          </span>
          <span className="hidden text-base font-extrabold tracking-tight sm:block">
            StudyMate <span className="text-gradient">AI</span>
          </span>
        </button>

        {/* Nav */}
        <nav className="ml-auto flex items-center gap-0.5 overflow-x-auto" aria-label="Primary">
          {NAV.map(({ key, label, icon: Icon }) => {
            const active = page === key
            return (
              <button
                key={key}
                onClick={() => setPage(key)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group relative flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                    : "text-muted-foreground hover:bg-primary/10 hover:text-foreground",
                )}
              >
                <Icon className="size-4" />
                <span className="hidden md:inline">{label}</span>
              </button>
            )
          })}
        </nav>

        {/* Theme toggle */}
        <button
          onClick={() => setDark((d) => !d)}
          aria-label="Toggle color theme"
          className="ml-1 flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-card/60 text-foreground transition hover:bg-primary/10"
        >
          {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </button>
      </div>
    </header>
  )
}
