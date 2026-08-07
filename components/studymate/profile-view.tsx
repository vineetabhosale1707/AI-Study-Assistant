"use client"

import { useEffect, useState } from "react"
import { BarChart3, FileText, Layers, ListChecks, NotebookPen, Save, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Field, GlassCard, Pill, SectionHeading, TextInput } from "./glass"
import { useStudy } from "./store"

export function ProfileView() {
  const { profile, setProfile, stats } = useStudy()
  const [form, setForm] = useState(profile)
  const [saved, setSaved] = useState(false)

  useEffect(() => setForm(profile), [profile])

  const save = () => {
    setProfile(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 1800)
  }

  const statCards = [
    { icon: FileText, label: "PDFs Studied", value: stats.pdfsStudied },
    { icon: NotebookPen, label: "Notes Created", value: stats.notesCreated },
    { icon: ListChecks, label: "MCQs Generated", value: stats.mcqsGenerated },
    { icon: Layers, label: "Flashcards Generated", value: stats.flashcardsGenerated },
  ]

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="animate-float-in space-y-2">
        <Pill>
          <User className="size-3.5" />
          Profile
        </Pill>
        <h1 className="text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">Your account & progress</h1>
        <p className="text-sm text-muted-foreground text-pretty">Manage your details and track your study stats.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Personal Information */}
        <div className="lg:col-span-2">
          <GlassCard className="p-6 sm:p-7">
            <div className="flex items-center gap-4">
              <span className="flex size-16 items-center justify-center rounded-3xl bg-primary text-2xl font-extrabold text-primary-foreground shadow-lg shadow-primary/25">
                {form.name.trim().charAt(0).toUpperCase() || "S"}
              </span>
              <div>
                <p className="text-lg font-bold leading-tight">{form.name || "Your Name"}</p>
                <p className="text-sm text-muted-foreground">{form.role || "Student"}</p>
              </div>
            </div>

            <div className="mt-6">
              <SectionHeading title="Personal Information" />
              <div className="mt-4 space-y-4">
                {/* Name */}
                <Field label="Name">
                  <TextInput value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </Field>
                {/* Email */}
                <Field label="Email">
                  <TextInput
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </Field>
                {/* Role */}
                <Field label="Role">
                  <TextInput value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
                </Field>
                {/* Save Profile */}
                <Button className="h-11 w-full rounded-xl shadow-md shadow-primary/20" onClick={save}>
                  <Save className="size-4" />
                  {saved ? "Saved!" : "Save Profile"}
                </Button>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Learning Statistics */}
        <div className="lg:col-span-3">
          <GlassCard className="p-6 sm:p-7">
            <SectionHeading icon={BarChart3} title="Learning Statistics" subtitle="Your activity at a glance." />
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {statCards.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="glass-hover rounded-3xl border border-border bg-card/60 p-5"
                >
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <p className="mt-4 text-3xl font-extrabold tracking-tight">{value}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
