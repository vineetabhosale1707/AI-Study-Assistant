"use client"

import type { ComponentProps, ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export function GlassCard({
  className,
  hover = false,
  children,
  ...props
}: ComponentProps<"div"> & { hover?: boolean }) {
  return (
    <div
      className={cn("glass rounded-3xl", hover && "glass-hover", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function SectionHeading({
  icon: Icon,
  title,
  subtitle,
  className,
}: {
  icon?: LucideIcon
  title: string
  subtitle?: string
  className?: string
}) {
  return (
    <div className={cn("flex items-start gap-3", className)}>
      {Icon ? (
        <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15">
          <Icon className="size-5" />
        </span>
      ) : null}
      <div className="min-w-0">
        <h2 className="text-lg font-bold tracking-tight text-balance">{title}</h2>
        {subtitle ? <p className="mt-0.5 text-sm text-muted-foreground text-pretty">{subtitle}</p> : null}
      </div>
    </div>
  )
}

export function Field({
  label,
  children,
  hint,
}: {
  label: string
  children: ReactNode
  hint?: string
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground/90">{label}</span>
      {children}
      {hint ? <span className="mt-1 block text-xs text-muted-foreground">{hint}</span> : null}
    </label>
  )
}

export function TextInput({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-xl border border-border bg-card/70 px-3.5 text-sm text-foreground shadow-sm outline-none transition",
        "placeholder:text-muted-foreground/70 focus:border-primary/60 focus:ring-4 focus:ring-primary/15",
        className,
      )}
      {...props}
    />
  )
}

export function TextArea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "w-full rounded-xl border border-border bg-card/70 px-3.5 py-2.5 text-sm text-foreground shadow-sm outline-none transition",
        "placeholder:text-muted-foreground/70 focus:border-primary/60 focus:ring-4 focus:ring-primary/15",
        className,
      )}
      {...props}
    />
  )
}

export function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary",
        className,
      )}
    >
      {children}
    </span>
  )
}
