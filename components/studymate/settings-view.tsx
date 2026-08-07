"use client"

import { useState } from "react"
import { Eraser, GraduationCap, Info, RotateCcw, Settings, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlassCard, Pill, SectionHeading } from "./glass"
import { useStudy } from "./store"

export function SettingsView() {
  const { clearNotes, resetStudyData } = useStudy()
  const [msg, setMsg] = useState<string | null>(null)

  const flash = (text: string) => {
    setMsg(text)
    setTimeout(() => setMsg(null), 2000)
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="animate-float-in space-y-2">
        <Pill>
          <Settings className="size-3.5" />
          Settings
        </Pill>
        <h1 className="text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">Preferences & data</h1>
        <p className="text-sm text-muted-foreground text-pretty">Manage your data and learn about StudyMate AI.</p>
      </div>

      {msg ? (
        <div className="animate-float-in rounded-2xl border border-primary/25 bg-primary/10 px-4 py-3 text-sm font-medium text-primary">
          {msg}
        </div>
      ) : null}

      {/* Data management */}
      <GlassCard className="p-6 sm:p-7">
        <SectionHeading icon={Eraser} title="Data Management" subtitle="Clear or reset your study data." />
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card/60 p-5">
            <h3 className="text-base font-bold">Clear Notes</h3>
            <p className="mt-1 text-sm text-muted-foreground text-pretty">
              Permanently remove all saved notes from your notebook.
            </p>
            {/* Clear Notes */}
            <Button
              variant="destructive"
              className="mt-4 h-10 rounded-xl"
              onClick={() => {
                clearNotes()
                flash("All notes cleared.")
              }}
            >
              <Trash2 className="size-4" />
              Clear Notes
            </Button>
          </div>

          <div className="rounded-2xl border border-border bg-card/60 p-5">
            <h3 className="text-base font-bold">Reset Study Data</h3>
            <p className="mt-1 text-sm text-muted-foreground text-pretty">
              Reset summaries, MCQs, flashcards, chat, and statistics.
            </p>
            {/* Reset Study Data */}
            <Button
              variant="destructive"
              className="mt-4 h-10 rounded-xl"
              onClick={() => {
                resetStudyData()
                flash("Study data has been reset.")
              }}
            >
              <RotateCcw className="size-4" />
              Reset Study Data
            </Button>
          </div>
        </div>
      </GlassCard>

      {/* About StudyMate AI */}
      <GlassCard className="p-6 sm:p-7">
        <SectionHeading icon={Info} title="About StudyMate AI" />
        <div className="mt-5 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <span className="flex size-14 items-center justify-center rounded-3xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
            <GraduationCap className="size-7" />
          </span>
          <div>
            <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
              StudyMate AI is your premium AI-powered study companion — built to help you summarize
              notes, generate practice questions and flashcards, chat with your documents, and
              understand tough topics with ease.
            </p>
            {/* Version */}
            <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-xs text-muted-foreground">
              Version 1.0.0
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}
