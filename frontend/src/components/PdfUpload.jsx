import { useState } from "react";
import jsPDF from "jspdf";

function PdfUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleFileChange(event) {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file);
      setSummary(null);
    }
  }

  function downloadPDF() {

  const doc = new jsPDF();

  let y = 20;

  doc.setFontSize(16);
 doc.text("StudyMate AI Summary", 20, y);

  y += 15;

  doc.setFontSize(12);

  doc.text(
    `Overview:\n${summary.overview}`,
    20,
    y
  );

  y += 30;


  doc.text(
    "Key Points:",
    20,
    y
  );

  y += 10;


  summary.keyPoints.forEach((point) => {

    doc.text(
      "• " + point,
      20,
      y
    );

    y += 8;

  });


  y += 10;

  doc.text(
    "Exam Notes:",
    20,
    y
  );


  y += 10;


  summary.examNotes.forEach((note)=>{

    doc.text(
      "• " + note,
      20,
      y
    );

    y += 8;

  });


  doc.save("StudyMate-AI-Summary.pdf");

}

  async function generateSummary() {
    if (!selectedFile) {
      alert("Please upload a PDF first!");
      return;
    }

    setLoading(true);
    setSummary(null);

    try {
      const formData = new FormData();

      formData.append("pdf", selectedFile);

      const response = await fetch("http://localhost:5000/summary", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setSummary(data.summary);
        const count = Number(localStorage.getItem("pdfCount") || 0);
localStorage.setItem("pdfCount", count + 1);
      } else {
        alert(data.error || "Something went wrong.");
      }

    } catch (error) {
      console.error(error);
      alert("Could not connect to backend.");
    }

    setLoading(false);
  }
function clearPDF() {
  setSelectedFile(null);
  setSummary(null);
  setLoading(false);
}

  return (
    <section>

      <h2>📄 Upload Notes</h2>

      <label className="upload-box">

  📂 Upload PDF Notes

  <input
    type="file"
    accept=".pdf"
    onChange={handleFileChange}
  />

  <p>Click here to select your PDF</p>

</label>
      <br />

      <button onClick={generateSummary}>
  ✨ Generate AI Summary
</button>


      {selectedFile && (
        <div className="pdf-card">
          <h3>📁 Selected File</h3>
          <p>{selectedFile.name}</p>
        </div>
      )}

{loading && (
  <div className="loading-card">

    <div className="loader"></div>

    <h3>
      🤖 AI is reading your notes...
    </h3>

    <p>
      Extracting important concepts and creating your summary.
    </p>

  </div>
)}



      {summary && (
        <div className="pdf-card">

          <h3>📄 AI Summary</h3>
          <button onClick={downloadPDF}>
  ⬇ Download Summary
</button>
<button 
  className="secondary-button"
  onClick={clearPDF}
>
  🔄 Upload Another PDF
</button>


          <div className="summary-section">
            <h4>📌 Overview</h4>
            <p>{summary.overview}</p>
          </div>



          <div className="summary-section">
            <h4>⭐ Key Points</h4>

            <ul>
              {summary.keyPoints?.map((point, index) => (
                <li key={index}>
                  {point}
                </li>
              ))}
            </ul>

          </div>




          <div className="summary-section">
            <h4>📚 Important Definitions</h4>

            {summary.definitions?.map((item, index) => (
              <p key={index}>
                <b>{item.term}:</b> {item.meaning}
              </p>
            ))}

          </div>




          <div className="summary-section">
            <h4>📝 Exam Notes</h4>

            <ul>
              {summary.examNotes?.map((note, index) => (
                <li key={index}>
                  {note}
                </li>
              ))}
            </ul>

          </div>




          <div className="summary-section">
            <h4>🧠 Quick Revision</h4>

            <ul>
              {summary.quickRevision?.map((point, index) => (
                <li key={index}>
                  {point}
                </li>
              ))}
            </ul>

          </div>


        </div>
      )}


    </section>
  );
}

export default PdfUpload;