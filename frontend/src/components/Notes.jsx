import { useState, useEffect } from "react";

function Notes() {

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

    if (noteText.trim() === "") {
      return;
    }


    if (editId !== null) {

      const updatedNotes = notes.map((note) =>
        note.id === editId
          ? { ...note, text: noteText }
          : note
      );

      setNotes(updatedNotes);
      setEditId(null);

    } 
    else {

      const newNote = {
        id: Date.now(),
        text: noteText
      };

      setNotes([...notes, newNote]);

    }


    setNoteText("");
  }


  function deleteNote(id) {

    const updatedNotes = notes.filter((note) => note.id !== id);

    setNotes(updatedNotes);
  }


  function editNote(note) {

    setNoteText(note.text);
    setEditId(note.id);

  }


  return (
    <>
      <h2>My Notes</h2>


      <input
        type="text"
        placeholder="Write your note..."
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
      />


      <button onClick={addOrUpdateNote}>
        {editId !== null ? "Update Note" : "Add Note"}
      </button>



      <div className="notes-container">

        {notes.map((note) => (

          <div className="note-card" key={note.id}>

            <p>
              📝 {note.text}
            </p>


            <button onClick={() => editNote(note)}>
              Edit
            </button>


            <button onClick={() => deleteNote(note.id)}>
              Delete
            </button>


          </div>

        ))}

      </div>

    </>
  );
}

export default Notes;