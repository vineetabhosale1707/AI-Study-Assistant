"use client"

import { ArrowRight, Bot, FileText, Layers, ListChecks, Sparkles, Wand2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlassCard, Pill } from "./glass"
import { useStudy } from "./store"

const HIGHLIGHTS = [
  { icon: FileText, title: "Upload & Summarize", text: "Turn dense PDFs into clean, structured AI summaries in seconds." },
  { icon: ListChecks, title: "MCQ Generator", text: "Auto-generate exam-style multiple choice questions to test yourself." },
  { icon: Layers, title: "Flashcards", text: "Click-to-flip flashcards that make active recall effortless." },
  { icon: Bot, title: "Chat with PDF", text: "Ask anything about your document and get instant answers." },
]

export function HomeView() {
  const { setPage, profile } = useStudy()

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Welcome Banner */}
      <GlassCard className="animate-float-in overflow-hidden p-8 sm:p-12">
        <div className="flex flex-col items-start gap-6">
          <Pill>
            <Sparkles className="size-3.5" />
            Your premium AI study companion
          </Pill>

          {/* Welcome Banner heading */}
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-balance sm:text-6xl">
            Welcome back, <span className="text-gradient">{profile.name.split(" ")[0]}</span>.
            <br />
            Study smarter with StudyMate AI.
          </h1>

          {/* Short Description */}
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
            Upload your notes and let AI summarize them, generate MCQs and flashcards, explain hard
            topics in simple words, and answer your questions — all inside one beautiful, focused
            workspace.
          </p>

          {/* Go to Study Workspace Button */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Button
              size="lg"
              className="h-12 rounded-full px-6 text-sm shadow-lg shadow-primary/25"
              onClick={() => setPage("workspace")}
            >
              <Wand2 className="size-4" />
              Go to Study Workspace
              <ArrowRight className="size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-full px-6 text-sm"
              onClick={() => setPage("notes")}
            >
              View My Notes
            </Button>
          </div>
        </div>
      </GlassCard>

      {/* Highlights */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {HIGHLIGHTS.map(({ icon: Icon, title, text }, i) => (
          <GlassCard
            key={title}
            hover
            className="animate-float-in p-6"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <span className="flex size-11 items-center justify-center rounded-2xl bg-accent/15 text-accent-foreground ring-1 ring-accent/20">
              <Icon className="size-5 text-primary" />
            </span>
            <h3 className="mt-4 text-base font-bold tracking-tight">{title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">{text}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
