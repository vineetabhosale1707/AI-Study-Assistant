import { useState, useEffect } from "react";

function Profile() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {

    const savedName = localStorage.getItem("profileName");
    const savedEmail = localStorage.getItem("profileEmail");

    if (savedName) setName(savedName);
    if (savedEmail) setEmail(savedEmail);

  }, []);

  function saveProfile() {

    localStorage.setItem("profileName", name);
    localStorage.setItem("profileEmail", email);

    alert("Profile saved successfully!");

  }

  const pdfCount = Number(localStorage.getItem("pdfCount")) || 0;
  const mcqCount = Number(localStorage.getItem("mcqCount")) || 0;
  const flashcardCount = Number(localStorage.getItem("flashcardCount")) || 0;
  const notesCount = (JSON.parse(localStorage.getItem("notes")) || []).length;

  return (

    <div className="profile-container">

      <h1>👤 My Profile</h1>

      <label>Full Name</label>
      <br />

      <input
        type="text"
        placeholder="Enter your full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <label>Email</label>
      <br />

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <label>Role</label>
      <br />

      <input
        type="text"
        value="Student"
        disabled
      />

      <br /><br />

      <button onClick={saveProfile}>
        💾 Save Profile
      </button>

      <hr />

      <h2>📊 Learning Statistics</h2>

      <p>📄 PDFs Studied: {pdfCount}</p>
      <p>📝 Notes Created: {notesCount}</p>
      <p>❓ MCQs Generated: {mcqCount}</p>
      <p>🃏 Flashcards Generated: {flashcardCount}</p>

    </div>

  );

}

export default Profile;