import { useState, useEffect } from "react";
import { PlusIcon, NoteEditIcon, EditIcon, TrashIcon } from "./Icons";

function Notes() {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteText, setNoteText] = useState("");

  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function addOrUpdateNote() {
    if (noteTitle.trim() === "" || noteText.trim() === "") {
      return;
    }

    if (editId !== null) {
      const updatedNotes = notes.map((note) =>
        note.id === editId
          ? {
              ...note,
              title: noteTitle,
              description: noteText,
            }
          : note
      );

      setNotes(updatedNotes);
      setEditId(null);
    } else {
      const newNote = {
        id: Date.now(),
        title: noteTitle,
        description: noteText,
      };

      setNotes([...notes, newNote]);
    }

    setNoteTitle("");
    setNoteText("");
  }

  function deleteNote(id) {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  }

  function editNote(note) {
    setNoteTitle(note.title);
    setNoteText(note.description);
    setEditId(note.id);
  }

  return (
    <>
      <span className="page-eyebrow">
        <NoteEditIcon size={14} />
        My Notes
      </span>

      <div className="page-header">
        <h1>Your Personal Notebook</h1>
        <p>Create, organize and manage all your study notes.</p>
      </div>

      <div className="notes-grid-2">
        {/* Add Note */}
        <div className="panel notes-card">
          <div className="card-heading">
            <span className="card-icon-circle">
              <PlusIcon size={17} />
            </span>

            <div>
              <h2>{editId ? "Edit Note" : "Add Note"}</h2>
              <p>Create a new study note.</p>
            </div>
          </div>

          <label className="field-label">Title</label>

          <input
            type="text"
            placeholder="Enter note title..."
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
          />

          <label
            className="field-label"
            style={{ marginTop: "16px" }}
          >
            Description
          </label>

          <textarea
            placeholder="Write your note..."
            rows={6}
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
          />

          <button
            className="btn-primary btn-block"
            style={{ marginTop: "18px" }}
            onClick={addOrUpdateNote}
          >
            <PlusIcon size={16} />
            {editId ? "Update Note" : "Add Note"}
          </button>
        </div>

        {/* Saved Notes */}
        <div className="panel notes-card">
          <div className="card-heading">
            <span className="card-icon-circle">
              <NoteEditIcon size={17} />
            </span>

            <div>
              <h2>Saved Notes</h2>
              <p>
                {notes.length} {notes.length === 1 ? "note" : "notes"} saved
              </p>
            </div>
          </div>

          {notes.length === 0 ? (
            <p className="notes-empty">
              No notes yet. Add your first note!
            </p>
          ) : (
            <div className="saved-notes-list">
              {notes.map((note) => (
                <div className="note-item" key={note.id}>
                  <div className="note-content">
                    <h3>{note.title}</h3>
                    <p>{note.description}</p>
                  </div>

                  <div className="note-item-actions">
                    <button
                      className="icon-btn"
                      onClick={() => editNote(note)}
                    >
                      <EditIcon size={15} />
                    </button>

                    <button
                      className="icon-btn danger"
                      onClick={() => deleteNote(note.id)}
                    >
                      <TrashIcon size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Notes;