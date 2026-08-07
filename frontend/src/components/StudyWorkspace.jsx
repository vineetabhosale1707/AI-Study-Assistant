import PdfUpload from "./PdfUpload";
import MCQGenerator from "./MCQGenerator";
import Flashcards from "./Flashcards";
import ChatBot from "./ChatBot";
import EasyExplanation from "./EasyExplanation";
import { BookIcon } from "./Icons";

function StudyWorkspace() {
  return (
    <div className="study-workspace">
      <span className="page-eyebrow">
        <BookIcon size={14} />
        Study Workspace
      </span>

      <div className="page-header">
        <h1>Your AI-powered study desk</h1>
        <p>
          Upload a PDF, generate a summary, and use the AI study tools to
          master your material.
        </p>
      </div>

      <div className="workspace-grid-2">
        <PdfUpload />
      </div>

      <div className="section-block card-heading">
        <span className="card-icon-circle">
          <BookIcon size={17} />
        </span>

        <div>
          <h2>AI Study Tools</h2>
          <p>Practice, test, and understand your material.</p>
        </div>
      </div>

      <div className="tools-grid-2">
        <MCQGenerator />
        <Flashcards />
      </div>

      <div className="tools-grid-2">
        <ChatBot />
        <EasyExplanation />
      </div>
    </div>
  );
}

export default StudyWorkspace;