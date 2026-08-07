import { useState, useEffect } from "react";
import { UserIcon, BarChartIcon, FileTextIcon, NoteEditIcon, ListChecksIcon, LayersIcon } from "./Icons";

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

  const initial = name && name.trim() !== "" ? name.trim().charAt(0).toUpperCase() : "A";
  const displayName = name && name.trim() !== "" ? name : "Your Name";

  return (

    <>

      <span className="page-eyebrow">
        <UserIcon size={14} />
        Profile
      </span>

      <div className="page-header">
        <h1>Your account & progress</h1>
        <p>Manage your details and track your study stats.</p>
      </div>

      <div className="profile-grid-2">

        <div className="panel profile-card">

          <div className="profile-identity">
            <span className="avatar-circle">{initial}</span>
            <div>
              <h3>{displayName}</h3>
              <p>Student</p>
            </div>
          </div>

          <div className="profile-section-title">Personal Information</div>

          <label className="field-label">Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="field-label">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="field-label">Role</label>
          <input
            type="text"
            value="Student"
            disabled
          />

          <button className="btn-primary btn-block" onClick={saveProfile}>
            Save Profile
          </button>

        </div>

        <div className="panel stats-card">

          <div className="card-heading">
            <span className="card-icon-circle">
              <BarChartIcon size={18} />
            </span>
            <div>
              <h2>Learning Statistics</h2>
              <p>Your activity at a glance.</p>
            </div>
          </div>

          <div className="stats-grid">

            <div className="stat-card">
              <span className="card-icon-circle">
                <FileTextIcon size={17} />
              </span>
              <div className="stat-value">{pdfCount}</div>
              <div className="stat-label">PDFs Studied</div>
            </div>

            <div className="stat-card">
              <span className="card-icon-circle">
                <NoteEditIcon size={17} />
              </span>
              <div className="stat-value">{notesCount}</div>
              <div className="stat-label">Notes Created</div>
            </div>

            <div className="stat-card">
              <span className="card-icon-circle">
                <ListChecksIcon size={17} />
              </span>
              <div className="stat-value">{mcqCount}</div>
              <div className="stat-label">MCQs Generated</div>
            </div>

            <div className="stat-card">
              <span className="card-icon-circle">
                <LayersIcon size={17} />
              </span>
              <div className="stat-value">{flashcardCount}</div>
              <div className="stat-label">Flashcards Generated</div>
            </div>

          </div>

        </div>

      </div>

    </>

  );

}

export default Profile;
