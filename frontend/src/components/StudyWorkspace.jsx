import PdfUpload from "./PdfUpload";
import MCQGenerator from "./MCQGenerator";
import Flashcards from "./Flashcards";
import ChatBot from "./ChatBot";
import EasyExplanation from "./EasyExplanation";

function StudyWorkspace() {
  return (
    <div className="study-workspace">

      <h1>📚 Study Workspace</h1>

      <p>
        Upload your study notes and use AI-powered tools to learn faster.
      </p>

      <hr />

      <section>

        <h2>📂 Upload & Summarize Notes</h2>

        <PdfUpload />

      </section>

      <hr />

      <section>

        <h2>🧠 AI Study Tools</h2>

        <p>
          Use the tools below to revise and understand your uploaded notes.
        </p>

        <MCQGenerator />

        <Flashcards />

        <ChatBot />

        <EasyExplanation />

      </section>

    </div>
  );
}

export default StudyWorkspace;