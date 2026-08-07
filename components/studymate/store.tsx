"use client"

import { createContext, useContext, useMemo, useState, type ReactNode } from "react"

export type PageKey = "home" | "workspace" | "notes" | "profile" | "settings"

export type Note = {
  id: string
  title: string
  body: string
  updatedAt: number
}

export type Mcq = {
  id: string
  question: string
  options: string[]
  answerIndex: number
}

export type Flashcard = {
  id: string
  front: string
  back: string
}

export type ChatMessage = {
  id: string
  role: "user" | "ai"
  text: string
}

export type Profile = {
  name: string
  email: string
  role: string
}

export type Stats = {
  pdfsStudied: number
  notesCreated: number
  mcqsGenerated: number
  flashcardsGenerated: number
}

type StudyState = {
  // navigation
  page: PageKey
  setPage: (p: PageKey) => void

  // upload + summary
  fileName: string | null
  setFileName: (n: string | null) => void
  summaryReady: boolean
  setSummaryReady: (b: boolean) => void

  // study tools
  mcqs: Mcq[]
  setMcqs: (m: Mcq[]) => void
  flashcards: Flashcard[]
  setFlashcards: (f: Flashcard[]) => void
  chat: ChatMessage[]
  addChat: (m: ChatMessage) => void
  explanation: string
  setExplanation: (s: string) => void

  // notes
  notes: Note[]
  addNote: (n: Note) => void
  updateNote: (n: Note) => void
  deleteNote: (id: string) => void
  clearNotes: () => void

  // profile + stats
  profile: Profile
  setProfile: (p: Profile) => void
  stats: Stats
  bumpStat: (key: keyof Stats, by?: number) => void
  resetStudyData: () => void
}

const StudyContext = createContext<StudyState | null>(null)

const INITIAL_NOTES: Note[] = [
  {
    id: "n1",
    title: "Photosynthesis — Light Reactions",
    body: "Occurs in the thylakoid membrane. Converts light energy into ATP and NADPH used later in the Calvin cycle.",
    updatedAt: Date.now() - 1000 * 60 * 60 * 5,
  },
  {
    id: "n2",
    title: "Newton's Laws of Motion",
    body: "1) Inertia. 2) F = ma. 3) Every action has an equal and opposite reaction.",
    updatedAt: Date.now() - 1000 * 60 * 60 * 26,
  },
]

const INITIAL_STATS: Stats = {
  pdfsStudied: 12,
  notesCreated: 2,
  mcqsGenerated: 48,
  flashcardsGenerated: 30,
}

export function StudyProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<PageKey>("home")
  const [fileName, setFileName] = useState<string | null>(null)
  const [summaryReady, setSummaryReady] = useState(false)
  const [mcqs, setMcqs] = useState<Mcq[]>([])
  const [flashcards, setFlashcards] = useState<Flashcard[]>([])
  const [chat, setChat] = useState<ChatMessage[]>([])
  const [explanation, setExplanation] = useState("")
  const [notes, setNotes] = useState<Note[]>(INITIAL_NOTES)
  const [profile, setProfile] = useState<Profile>({
    name: "Aarav Sharma",
    email: "aarav@studymate.ai",
    role: "Student",
  })
  const [stats, setStats] = useState<Stats>(INITIAL_STATS)

  const value = useMemo<StudyState>(
    () => ({
      page,
      setPage,
      fileName,
      setFileName,
      summaryReady,
      setSummaryReady,
      mcqs,
      setMcqs,
      flashcards,
      setFlashcards,
      chat,
      addChat: (m) => setChat((prev) => [...prev, m]),
      explanation,
      setExplanation,
      notes,
      addNote: (n) => setNotes((prev) => [n, ...prev]),
      updateNote: (n) => setNotes((prev) => prev.map((x) => (x.id === n.id ? n : x))),
      deleteNote: (id) => setNotes((prev) => prev.filter((x) => x.id !== id)),
      clearNotes: () => setNotes([]),
      profile,
      setProfile,
      stats,
      bumpStat: (key, by = 1) => setStats((prev) => ({ ...prev, [key]: prev[key] + by })),
      resetStudyData: () => {
        setStats({ pdfsStudied: 0, notesCreated: 0, mcqsGenerated: 0, flashcardsGenerated: 0 })
        setMcqs([])
        setFlashcards([])
        setChat([])
        setExplanation("")
        setSummaryReady(false)
        setFileName(null)
      },
    }),
    [page, fileName, summaryReady, mcqs, flashcards, chat, explanation, notes, profile, stats],
  )

  return <StudyContext.Provider value={value}>{children}</StudyContext.Provider>
}

export function useStudy() {
  const ctx = useContext(StudyContext)
  if (!ctx) throw new Error("useStudy must be used within StudyProvider")
  return ctx
}
