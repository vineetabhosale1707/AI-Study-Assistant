import { useState } from "react";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Profile from "./components/Profile";
import StudyWorkspace from "./components/StudyWorkspace";
import Notes from "./components/Notes";
import Settings from "./components/Settings";
import Footer from "./components/Footer";
import FeatureCard from "./components/FeatureCard";
import {
  SparkleIcon,
  ArrowRightIcon,
  FileTextIcon,
  ListChecksIcon,
  LayersIcon,
  ChatIcon,
} from "./components/Icons";
import "./App.css";


function App() {

  const [activePage, setActivePage] = useState("home");

  const savedName = localStorage.getItem("profileName");
  const displayName = savedName && savedName.trim() !== "" ? savedName.trim() : "Student";

  return (

    <>

      <header className="topbar">
        <Navbar />
        <Sidebar setActivePage={setActivePage} activePage={activePage} />
      </header>


      <main>


        <section
          style={{
            display: activePage === "home" ? "block" : "none"
          }}
        >

          <div className="panel hero-card">

            <span className="page-eyebrow">
              <SparkleIcon size={14} />
              Your premium AI study companion
            </span>

            <h1>
              Welcome back, <span className="highlight">{displayName}</span>.
              <br />
              Study smarter with StudyMate AI.
            </h1>

            <p className="hero-copy">
              Upload your notes and let AI summarize them, generate MCQs and flashcards,
              explain hard topics in simple words, and answer your questions — all inside
              one beautiful, focused workspace.
            </p>

            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => setActivePage("workspace")}>
                <SparkleIcon size={16} />
                Go to Study Workspace
                <ArrowRightIcon size={16} />
              </button>

              <button className="btn-secondary" onClick={() => setActivePage("notes")}>
                View My Notes
              </button>
            </div>

          </div>

          <div className="home-features-grid">

            <FeatureCard
              icon={<FileTextIcon size={18} />}
              title="Upload & Summarize"
              description="Turn dense PDFs into clean, structured AI summaries in seconds."
            />

            <FeatureCard
              icon={<ListChecksIcon size={18} />}
              title="MCQ Generator"
              description="Auto-generate exam-style multiple choice questions to test yourself."
            />

            <FeatureCard
              icon={<LayersIcon size={18} />}
              title="Flashcards"
              description="Click-to-flip flashcards that make active recall effortless."
            />

            <FeatureCard
              icon={<ChatIcon size={18} />}
              title="Chat with PDF"
              description="Ask anything about your document and get instant answers."
            />

          </div>

        </section>



        <section
          style={{
            display: activePage === "workspace" ? "block" : "none"
          }}
        >

          <StudyWorkspace />

        </section>




        <section
          style={{
            display: activePage === "notes" ? "block" : "none"
          }}
        >

          <Notes />

        </section>




        <section
          id="settings"
          style={{
            display: activePage === "settings" ? "block" : "none"
          }}
        >
          <Settings />
        </section>




        <section
          id="profile"
          style={{
            display: activePage === "profile" ? "block" : "none"
          }}
        >
          <Profile />
        </section>


      </main>

      <Footer />

    </>

  );

}


export default App;
