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

    <div className="settings-container">

      <h1>⚙️ Settings</h1>

      <button onClick={clearNotes}>
        🗑 Clear Notes
      </button>

      <br /><br />

      <button onClick={clearProfile}>
        🔄 Reset Study Data
      </button>

      <hr />

      <h2>About StudyMate AI</h2>

      <p>
        Version 1.0
      </p>

      <p>
        StudyMate AI is an AI-powered study assistant that helps students
        summarize notes, generate MCQs, create flashcards, chat with PDFs,
        and understand concepts in simple language.
      </p>

    </div>

  );

}

export default Settings;