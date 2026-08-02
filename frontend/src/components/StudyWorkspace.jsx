import PdfUpload from "./PdfUpload";
import ChatBot from "./ChatBot";
import MCQGenerator from "./MCQGenerator";
import Flashcards from "./Flashcards";
import EasyExplanation from "./EasyExplanation";



function StudyWorkspace() {

  return (

    <section>

      <h2>
        📄 Study Workspace
      </h2>


      <PdfUpload />

      <MCQGenerator />
      <Flashcards />



      <ChatBot />
      <EasyExplanation />


    </section>

  );

}


export default StudyWorkspace;