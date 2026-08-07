"use client"

import { useState } from "react"
import { NotebookPen, Pencil, Plus, Save, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Field, GlassCard, Pill, SectionHeading, TextArea, TextInput } from "./glass"
import { useStudy, type Note } from "./store"

export function MyNotesView() {
  const { notes, addNote, updateNote, deleteNote, bumpStat } = useStudy()
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState("")
  const [editBody, setEditBody] = useState("")

  const submit = () => {
    if (!title.trim()) return
    addNote({ id: `n-${Date.now()}`, title: title.trim(), body: body.trim(), updatedAt: Date.now() })
    bumpStat("notesCreated")
    setTitle("")
    setBody("")
  }

  const startEdit = (n: Note) => {
    setEditingId(n.id)
    setEditTitle(n.title)
    setEditBody(n.body)
  }

  const saveEdit = () => {
    if (!editingId) return
    updateNote({ id: editingId, title: editTitle.trim(), body: editBody.trim(), updatedAt: Date.now() })
    setEditingId(null)
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="animate-float-in space-y-2">
        <Pill>
          <NotebookPen className="size-3.5" />
          My Notes
        </Pill>
        <h1 className="text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">Your personal notebook</h1>
        <p className="text-sm text-muted-foreground text-pretty">Capture, edit, and organize your study notes.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Add Note */}
        <div className="lg:col-span-2">
          <GlassCard className="p-6 sm:p-7">
            <SectionHeading icon={Plus} title="Add Note" subtitle="Write a new study note." />
            <div className="mt-5 space-y-4">
              <Field label="Title">
                <TextInput value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Note title" />
              </Field>
              <Field label="Details">
                <TextArea
                  rows={5}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Write your note…"
                />
              </Field>
              <Button className="h-11 w-full rounded-xl shadow-md shadow-primary/20" onClick={submit}>
                <Plus className="size-4" />
                Add Note
              </Button>
            </div>
          </GlassCard>
        </div>

        {/* Saved Notes */}
        <div className="lg:col-span-3">
          <GlassCard className="p-6 sm:p-7">
            <SectionHeading
              icon={NotebookPen}
              title="Saved Notes"
              subtitle={`${notes.length} note${notes.length === 1 ? "" : "s"} saved.`}
            />
            <div className="mt-5 space-y-3">
              {notes.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                  No notes yet. Add your first note to get started.
                </div>
              ) : (
                notes.map((n) => (
                  <div key={n.id} className="rounded-2xl border border-border bg-card/60 p-4">
                    {editingId === n.id ? (
                      <div className="space-y-3">
                        <TextInput value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                        <TextArea rows={4} value={editBody} onChange={(e) => setEditBody(e.target.value)} />
                        <div className="flex gap-2">
                          <Button size="sm" className="rounded-lg" onClick={saveEdit}>
                            <Save className="size-3.5" />
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="rounded-lg"
                            onClick={() => setEditingId(null)}
                          >
                            <X className="size-3.5" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-base font-bold tracking-tight">{n.title}</h3>
                          <div className="flex shrink-0 gap-1">
                            {/* Edit Note */}
                            <Button
                              size="icon-sm"
                              variant="ghost"
                              className="rounded-lg"
                              onClick={() => startEdit(n)}
                              aria-label="Edit Note"
                            >
                              <Pencil className="size-3.5" />
                            </Button>
                            {/* Delete Note */}
                            <Button
                              size="icon-sm"
                              variant="destructive"
                              className="rounded-lg"
                              onClick={() => deleteNote(n.id)}
                              aria-label="Delete Note"
                            >
                              <Trash2 className="size-3.5" />
                            </Button>
                          </div>
                        </div>
                        {n.body ? (
                          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">{n.body}</p>
                        ) : null}
                        <p className="mt-3 text-xs text-muted-foreground/70">
                          Updated {new Date(n.updatedAt).toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
