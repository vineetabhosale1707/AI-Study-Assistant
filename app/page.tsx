"use client"

import { HomeView } from "@/components/studymate/home-view"
import { MyNotesView } from "@/components/studymate/my-notes-view"
import { NavBar } from "@/components/studymate/nav-bar"
import { ProfileView } from "@/components/studymate/profile-view"
import { SettingsView } from "@/components/studymate/settings-view"
import { StudyProvider, useStudy } from "@/components/studymate/store"
import { StudyWorkspaceView } from "@/components/studymate/study-workspace-view"

function Pages() {
  const { page } = useStudy()
  return (
    <main className="px-3 py-6 sm:px-5 sm:py-8">
      {page === "home" && <HomeView />}
      {page === "workspace" && <StudyWorkspaceView />}
      {page === "notes" && <MyNotesView />}
      {page === "profile" && <ProfileView />}
      {page === "settings" && <SettingsView />}
    </main>
  )
}

export default function Page() {
  return (
    <StudyProvider>
      <div className="aurora-bg min-h-svh">
        <NavBar />
        <Pages />
        <footer className="px-3 pb-8 pt-4 text-center text-xs text-muted-foreground sm:px-5">
          StudyMate AI · Study smarter, not harder.
        </footer>
      </div>
    </StudyProvider>
  )
}
