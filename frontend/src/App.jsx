import Navbar from "./components/Navbar";
import Features from "./components/Features";
import Notes from "./components/Notes";
import PdfUpload from "./components/PdfUpload";
import ChatBot from "./components/ChatBot";
import "./App.css";


function App() {
  return (
    <>
      <Navbar />

      <main>
        <section id="home">
          <h1>Study Smarter with AI 🚀</h1>

          <p>
            Create notes, generate summaries, and learn efficiently.
          </p>
        </section>

        <section id="upload">
          <PdfUpload />
        </section>

        <section id="chat">
  <ChatBot />
</section>

        <section id="features">
          <Features />
        </section>

        <section id="notes">
          <Notes />
        </section>
      </main>
    </>
  );
}

export default App;