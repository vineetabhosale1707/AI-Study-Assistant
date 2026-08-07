import { useState } from "react";
import jsPDF from "jspdf";
import { UploadCloudIcon, SparkleIcon, DownloadIcon, RefreshIcon } from "./Icons";

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
    <>

      <div className="panel ws-card">

        <div className="card-heading">
          <span className="card-icon-circle">
            <UploadCloudIcon size={18} />
          </span>
          <div>
            <h2>Upload & Summarize Notes</h2>
            <p>Drop a PDF and let StudyMate build a structured summary.</p>
          </div>
        </div>

        <label className="upload-dropzone">

          <span className="card-icon-circle">
            <UploadCloudIcon size={20} />
          </span>

          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
          />

          <strong>Upload PDF</strong>
          <p>PDF up to 20MB</p>

        </label>

        <p className="upload-filename">
          {selectedFile ? <strong>{selectedFile.name}</strong> : "No file selected yet."}
        </p>

        <div className="upload-actions">
          <button className="btn-primary" onClick={generateSummary}>
            <SparkleIcon size={15} />
            Generate AI Summary
          </button>
        </div>

        {summary && (
          <div className="upload-actions" style={{ marginTop: 10 }}>
            <button className="btn-secondary" onClick={downloadPDF}>
              <DownloadIcon size={15} />
              Download Summary
            </button>
            <button className="btn-secondary" onClick={clearPDF}>
              <RefreshIcon size={15} />
              Upload Another PDF
            </button>
          </div>
        )}

      </div>


      <div className="panel ws-card">

        {loading && (
          <div className="loading-state">
            <div className="loader"></div>
            <h3>AI is reading your notes...</h3>
            <p>Extracting important concepts and creating your summary.</p>
          </div>
        )}

        {!loading && !summary && (
          <div className="summary-placeholder">
            <span className="card-icon-circle">
              <SparkleIcon size={20} />
            </span>
            <h3>AI Summary</h3>
            <p>Your structured summary will appear here once you upload a PDF and generate a summary.</p>
          </div>
        )}

        {!loading && summary && (
          <div className="summary-scroll">

            <div className="summary-block">
              <h4>Overview</h4>
              <p>{summary.overview}</p>
            </div>

            <div className="summary-block">
              <h4>Key Points</h4>
              <ul>
                {summary.keyPoints?.map((point, index) => (
                  <li key={index}>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="summary-block">
              <h4>Important Definitions</h4>
              {summary.definitions?.map((item, index) => (
                <p key={index}>
                  <b>{item.term}:</b> {item.meaning}
                </p>
              ))}
            </div>

            <div className="summary-block">
              <h4>Exam Notes</h4>
              <ul>
                {summary.examNotes?.map((note, index) => (
                  <li key={index}>
                    {note}
                  </li>
                ))}
              </ul>
            </div>

            <div className="summary-block">
              <h4>Quick Revision</h4>
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

      </div>

    </>
  );
}

export default PdfUpload;
