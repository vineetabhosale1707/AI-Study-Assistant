import PdfUpload from "./PdfUpload";
import ChatBot from "./ChatBot";
import MCQGenerator from "./MCQGenerator";




function StudyWorkspace() {

  return (

    <section>

      <h2>
        📄 Study Workspace
      </h2>


      <PdfUpload />

      <MCQGenerator />


      <ChatBot />


    </section>

  );

}


export default StudyWorkspace;