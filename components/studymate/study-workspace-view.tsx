"use client"

import { useRef, useState } from "react"
import {
  BookMarked,
  Bot,
  Brain,
  CheckCircle2,
  Download,
  FileText,
  Layers,
  Lightbulb,
  ListChecks,
  RefreshCw,
  Send,
  Sparkles,
  UploadCloud,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Field, GlassCard, Pill, SectionHeading, TextInput } from "./glass"
import { useStudy, type Flashcard, type Mcq } from "./store"

export function StudyWorkspaceView() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="animate-float-in space-y-1">
        <Pill>
          <Sparkles className="size-3.5" />
          Study Workspace
        </Pill>
        <h1 className="pt-2 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
          Your AI-powered study desk
        </h1>
        <p className="text-sm text-muted-foreground text-pretty">
          Upload a PDF, generate a summary, and use the AI study tools to master your material.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <UploadSection />
        </div>
        <div className="lg:col-span-3">
          <SummarySection />
        </div>
      </div>

      <StudyToolsSection />
    </div>
  )
}

/* ---------------- Upload & Summarize Notes ---------------- */
function UploadSection() {
  const { fileName, setFileName, summaryReady, setSummaryReady, bumpStat } = useStudy()
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) {
      setFileName(f.name)
      setSummaryReady(false)
    }
  }

  const generate = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSummaryReady(true)
      bumpStat("pdfsStudied")
    }, 900)
  }

  const reset = () => {
    setFileName(null)
    setSummaryReady(false)
    if (inputRef.current) inputRef.current.value = ""
  }

  return (
    <GlassCard className="h-full p-6 sm:p-7">
      <SectionHeading
        icon={UploadCloud}
        title="Upload & Summarize Notes"
        subtitle="Drop a PDF and let StudyMate build a structured summary."
      />

      <div className="mt-6 space-y-4">
        {/* Upload PDF */}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 px-4 py-8 text-center transition hover:border-primary/60 hover:bg-primary/10"
        >
          <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <UploadCloud className="size-6" />
          </span>
          <span className="text-sm font-semibold">Upload PDF</span>
          <span className="text-xs text-muted-foreground">PDF up to 20MB</span>
        </button>
        <input ref={inputRef} type="file" accept="application/pdf" className="sr-only" onChange={onPick} />

        {/* Selected File */}
        {fileName ? (
          <div className="flex items-center gap-3 rounded-xl border border-border bg-card/70 px-3.5 py-3">
            <span className="flex size-9 items-center justify-center rounded-lg bg-accent/15 text-primary">
              <FileText className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{fileName}</p>
              <p className="text-xs text-muted-foreground">Selected File</p>
            </div>
            {summaryReady ? <CheckCircle2 className="size-5 text-primary" /> : null}
          </div>
        ) : (
          <p className="text-center text-xs text-muted-foreground">No file selected yet.</p>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-2">
          {/* Generate AI Summary */}
          <Button
            className="h-11 w-full rounded-xl shadow-md shadow-primary/20"
            disabled={!fileName || loading}
            onClick={generate}
          >
            {loading ? <RefreshCw className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
            {loading ? "Generating…" : "Generate AI Summary"}
          </Button>

          <div className="grid grid-cols-2 gap-2">
            {/* Download Summary */}
            <Button variant="outline" className="h-11 rounded-xl" disabled={!summaryReady}>
              <Download className="size-4" />
              Download Summary
            </Button>
            {/* Upload Another PDF */}
            <Button variant="secondary" className="h-11 rounded-xl" onClick={reset}>
              <RefreshCw className="size-4" />
              Upload Another PDF
            </Button>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}

/* ---------------- AI Summary ---------------- */
const SUMMARY = {
  overview:
    "This chapter introduces cellular respiration — how cells convert glucose into usable energy (ATP) through glycolysis, the Krebs cycle, and the electron transport chain.",
  keyPoints: [
    "Glycolysis occurs in the cytoplasm and yields a net 2 ATP.",
    "The Krebs cycle takes place in the mitochondrial matrix.",
    "The electron transport chain produces the majority of ATP.",
    "Oxygen is the final electron acceptor in aerobic respiration.",
  ],
  definitions: [
    { term: "ATP", def: "Adenosine triphosphate — the primary energy currency of the cell." },
    { term: "Glycolysis", def: "The breakdown of glucose into two pyruvate molecules." },
    { term: "Krebs Cycle", def: "A series of reactions producing NADH, FADH₂, and CO₂." },
  ],
  examNotes: [
    "Be able to state the net ATP yield of each stage.",
    "Compare aerobic vs anaerobic respiration.",
    "Know where in the cell each stage occurs.",
  ],
  quickRevision:
    "Glucose → Glycolysis → Pyruvate → Krebs Cycle → Electron Transport Chain → ~36–38 ATP total.",
}

function SummarySection() {
  const { summaryReady } = useStudy()

  if (!summaryReady) {
    return (
      <GlassCard className="flex h-full min-h-64 flex-col items-center justify-center p-8 text-center">
        <span className="flex size-14 items-center justify-center rounded-3xl bg-primary/10 text-primary">
          <Sparkles className="size-7" />
        </span>
        <h3 className="mt-4 text-lg font-bold">AI Summary</h3>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground text-pretty">
          Your structured summary will appear here once you upload a PDF and generate a summary.
        </p>
      </GlassCard>
    )
  }

  return (
    <GlassCard className="h-full p-6 sm:p-7">
      <SectionHeading icon={Sparkles} title="AI Summary" subtitle="Structured breakdown of your document." />

      <div className="mt-6 space-y-5">
        {/* Overview */}
        <SummaryBlock title="Overview">
          <p className="text-sm leading-relaxed text-muted-foreground">{SUMMARY.overview}</p>
        </SummaryBlock>

        {/* Key Points */}
        <SummaryBlock title="Key Points">
          <ul className="space-y-2">
            {SUMMARY.keyPoints.map((p) => (
              <li key={p} className="flex gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </SummaryBlock>

        {/* Definitions */}
        <SummaryBlock title="Definitions">
          <dl className="space-y-2">
            {SUMMARY.definitions.map((d) => (
              <div key={d.term} className="rounded-xl border border-border bg-card/60 px-3.5 py-2.5">
                <dt className="text-sm font-semibold text-foreground">{d.term}</dt>
                <dd className="text-sm text-muted-foreground">{d.def}</dd>
              </div>
            ))}
          </dl>
        </SummaryBlock>

        {/* Exam Notes */}
        <SummaryBlock title="Exam Notes">
          <ul className="space-y-2">
            {SUMMARY.examNotes.map((p) => (
              <li key={p} className="flex gap-2 text-sm text-muted-foreground">
                <BookMarked className="mt-0.5 size-4 shrink-0 text-accent-foreground" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </SummaryBlock>

        {/* Quick Revision */}
        <SummaryBlock title="Quick Revision">
          <p className="rounded-xl border border-primary/20 bg-primary/5 px-3.5 py-3 font-mono text-sm text-foreground">
            {SUMMARY.quickRevision}
          </p>
        </SummaryBlock>
      </div>
    </GlassCard>
  )
}

function SummaryBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h4 className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-primary">
        <span className="h-1 w-1 rounded-full bg-primary" />
        {title}
      </h4>
      {children}
    </section>
  )
}

/* ---------------- AI Study Tools ---------------- */
function StudyToolsSection() {
  return (
    <section className="space-y-5">
      <SectionHeading icon={Brain} title="AI Study Tools" subtitle="Practice, test, and understand your material." />
      <div className="grid gap-6 lg:grid-cols-2">
        <McqGenerator />
        <Flashcards />
        <ChatWithPdf />
        <EasyExplanation />
      </div>
    </section>
  )
}

/* ---- MCQ Generator ---- */
const SAMPLE_MCQS: Mcq[] = [
  {
    id: "m1",
    question: "Where does glycolysis take place?",
    options: ["Nucleus", "Cytoplasm", "Mitochondrial matrix", "Ribosome"],
    answerIndex: 1,
  },
  {
    id: "m2",
    question: "What is the final electron acceptor in aerobic respiration?",
    options: ["Water", "Carbon dioxide", "Oxygen", "Glucose"],
    answerIndex: 2,
  },
]

function McqGenerator() {
  const { mcqs, setMcqs, bumpStat } = useStudy()
  const [selected, setSelected] = useState<Record<string, number>>({})

  const create = () => {
    setMcqs(SAMPLE_MCQS)
    setSelected({})
    bumpStat("mcqsGenerated", SAMPLE_MCQS.length)
  }

  return (
    <GlassCard hover className="p-6">
      <SectionHeading icon={ListChecks} title="MCQ Generator" />
      {/* Create MCQs Button */}
      <Button className="mt-4 h-10 rounded-xl" onClick={create}>
        <Sparkles className="size-4" />
        Create MCQs
      </Button>

      {/* Generated MCQs */}
      <div className="mt-5 space-y-4">
        {mcqs.length === 0 ? (
          <p className="text-sm text-muted-foreground">Generated MCQs will appear here.</p>
        ) : (
          mcqs.map((q, qi) => (
            <div key={q.id} className="rounded-2xl border border-border bg-card/60 p-4">
              <p className="text-sm font-semibold">
                {qi + 1}. {q.question}
              </p>
              <div className="mt-3 grid gap-2">
                {q.options.map((opt, oi) => {
                  const picked = selected[q.id] === oi
                  const isAnswer = q.answerIndex === oi
                  const revealed = selected[q.id] !== undefined
                  return (
                    <button
                      key={opt}
                      onClick={() => setSelected((s) => ({ ...s, [q.id]: oi }))}
                      className={cn(
                        "flex items-center gap-2 rounded-xl border px-3 py-2 text-left text-sm transition",
                        revealed && isAnswer
                          ? "border-primary/50 bg-primary/10 text-foreground"
                          : picked
                            ? "border-destructive/40 bg-destructive/10 text-foreground"
                            : "border-border bg-card/50 hover:border-primary/40",
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-5 items-center justify-center rounded-full border text-xs font-bold",
                          revealed && isAnswer ? "border-primary bg-primary text-primary-foreground" : "border-border",
                        )}
                      >
                        {String.fromCharCode(65 + oi)}
                      </span>
                      {opt}
                    </button>
                  )
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </GlassCard>
  )
}

/* ---- Flashcards ---- */
const SAMPLE_CARDS: Flashcard[] = [
  { id: "f1", front: "What is ATP?", back: "The primary energy currency of the cell." },
  { id: "f2", front: "Where is the Krebs cycle?", back: "The mitochondrial matrix." },
  { id: "f3", front: "Net ATP from glycolysis?", back: "2 ATP." },
]

function Flashcards() {
  const { flashcards, setFlashcards, bumpStat } = useStudy()
  const [flipped, setFlipped] = useState<Record<string, boolean>>({})

  const generate = () => {
    setFlashcards(SAMPLE_CARDS)
    setFlipped({})
    bumpStat("flashcardsGenerated", SAMPLE_CARDS.length)
  }

  return (
    <GlassCard hover className="p-6">
      <SectionHeading icon={Layers} title="Flashcards" />
      {/* Generate Flashcards Button */}
      <Button className="mt-4 h-10 rounded-xl" onClick={generate}>
        <Sparkles className="size-4" />
        Generate Flashcards
      </Button>

      {/* Click-to-Flip Cards */}
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {flashcards.length === 0 ? (
          <p className="text-sm text-muted-foreground sm:col-span-3">Click-to-flip cards will appear here.</p>
        ) : (
          flashcards.map((c) => {
            const isFlipped = !!flipped[c.id]
            return (
              <button
                key={c.id}
                onClick={() => setFlipped((f) => ({ ...f, [c.id]: !f[c.id] }))}
                className="group relative h-32 [perspective:1000px]"
                aria-label="Flip flashcard"
              >
                <div
                  className={cn(
                    "relative h-full w-full rounded-2xl transition-transform duration-500 [transform-style:preserve-3d]",
                    isFlipped && "[transform:rotateY(180deg)]",
                  )}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-2xl border border-primary/25 bg-primary/10 p-3 text-center [backface-visibility:hidden]">
                    <span className="text-[10px] font-bold uppercase tracking-wide text-primary">Question</span>
                    <span className="text-sm font-semibold">{c.front}</span>
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-2xl border border-accent/30 bg-accent/15 p-3 text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                    <span className="text-[10px] font-bold uppercase tracking-wide text-primary">Answer</span>
                    <span className="text-sm font-semibold">{c.back}</span>
                  </div>
                </div>
              </button>
            )
          })
        )}
      </div>
    </GlassCard>
  )
}

/* ---- Chat with PDF ---- */
function ChatWithPdf() {
  const { chat, addChat } = useStudy()
  const [q, setQ] = useState("")

  const ask = () => {
    const text = q.trim()
    if (!text) return
    addChat({ id: `u-${Date.now()}`, role: "user", text })
    setQ("")
    setTimeout(() => {
      addChat({
        id: `a-${Date.now()}`,
        role: "ai",
        text: "Based on your PDF: cellular respiration converts glucose into ATP across glycolysis, the Krebs cycle, and the electron transport chain.",
      })
    }, 600)
  }

  return (
    <GlassCard hover className="flex flex-col p-6">
      <SectionHeading icon={Bot} title="Chat with PDF" />

      {/* AI Answer thread */}
      <div className="mt-4 flex-1 space-y-3 overflow-y-auto rounded-2xl border border-border bg-card/50 p-3">
        {chat.length === 0 ? (
          <p className="p-3 text-sm text-muted-foreground">Ask a question about your PDF to get an AI Answer.</p>
        ) : (
          chat.map((m) => (
            <div key={m.id} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-3.5 py-2 text-sm",
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-card text-foreground",
                )}
              >
                {m.text}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Ask Question */}
      <div className="mt-3 flex items-center gap-2">
        <TextInput
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.nativeEvent.isComposing && e.keyCode !== 229) ask()
          }}
          placeholder="Ask a question…"
        />
        <Button size="icon-lg" className="size-11 shrink-0 rounded-xl" onClick={ask} aria-label="Ask question">
          <Send className="size-4" />
        </Button>
      </div>
    </GlassCard>
  )
}

/* ---- Easy Explanation ---- */
function EasyExplanation() {
  const { explanation, setExplanation } = useStudy()
  const [topic, setTopic] = useState("")

  const explain = () => {
    const t = topic.trim()
    if (!t) return
    setExplanation(
      `Think of "${t}" like this: imagine it as a simple everyday process. Break it into small steps, connect each step to something you already know, and it becomes easy to remember.`,
    )
  }

  return (
    <GlassCard hover className="p-6">
      <SectionHeading icon={Lightbulb} title="Easy Explanation" />

      <div className="mt-4 space-y-3">
        {/* Topic Input */}
        <Field label="Topic Input">
          <div className="flex items-center gap-2">
            <TextInput
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.nativeEvent.isComposing && e.keyCode !== 229) explain()
              }}
              placeholder="e.g. The Krebs Cycle"
            />
            <Button className="h-11 shrink-0 rounded-xl" onClick={explain}>
              <Sparkles className="size-4" />
              Explain
            </Button>
          </div>
        </Field>

        {/* AI Explanation */}
        <div className="rounded-2xl border border-border bg-card/50 p-4">
          <span className="text-[10px] font-bold uppercase tracking-wide text-primary">AI Explanation</span>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">
            {explanation || "Enter a topic above and StudyMate will explain it in simple words."}
          </p>
        </div>
      </div>
    </GlassCard>
  )
}
