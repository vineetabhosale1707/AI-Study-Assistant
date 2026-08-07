import { SettingsIcon, DatabaseIcon, TrashIcon, RefreshIcon, InfoIcon } from "./Icons";

function Settings() {

  function clearNotes() {

    localStorage.removeItem("notes");

    alert("Notes cleared successfully.");

  }

  function clearProfile() {

  localStorage.removeItem("profileName");
  localStorage.removeItem("profileEmail");

  localStorage.removeItem("pdfCount");
  localStorage.removeItem("mcqCount");
  localStorage.removeItem("flashcardCount");

  alert("Profile data cleared successfully.");

  window.location.reload();

}

  return (

    <>

      <span className="page-eyebrow">
        <SettingsIcon size={14} />
        Settings
      </span>

      <div className="page-header">
        <h1>Preferences & data</h1>
        <p>Manage your data and learn about StudyMate AI.</p>
      </div>

      <div className="panel settings-panel">

        <div className="card-heading">
          <span className="card-icon-circle">
            <DatabaseIcon size={18} />
          </span>
          <div>
            <h2>Data Management</h2>
            <p>Clear or reset your study data.</p>
          </div>
        </div>

        <div className="data-mgmt-grid">

          <div className="subcard">
            <h3>Clear Notes</h3>
            <p>Permanently remove all saved notes from your notebook.</p>
            <button className="btn-danger" onClick={clearNotes}>
              <TrashIcon size={15} />
              Clear Notes
            </button>
          </div>

          <div className="subcard">
            <h3>Reset Study Data</h3>
            <p>Reset summaries, MCQs, flashcards, chat, and statistics.</p>
            <button className="btn-danger" onClick={clearProfile}>
              <RefreshIcon size={15} />
              Reset Study Data
            </button>
          </div>

        </div>

      </div>

      <div className="panel settings-panel about-card">

        <span className="card-icon-circle">
          <InfoIcon size={18} />
        </span>

        <div>
          <h2>About StudyMate AI</h2>
          <p>
            StudyMate AI is your premium AI-powered study companion — built to help you
            summarize notes, generate practice questions and flashcards, chat with your
            documents, and understand tough topics with ease.
          </p>
          <span className="version-pill">Version 1.0</span>
        </div>

      </div>

    </>

  );

}

export default Settings;
