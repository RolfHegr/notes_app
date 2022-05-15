import React, { useState } from "react";
import Header from "./Header";
import InputField from "./InputField";
import NotesContainer from "./NotesContainer";
import "./css/App.css";

function App() {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );

  function addNote(newNote) {
    setNotes((prevNotes) => {
      localStorage.setItem("notes", JSON.stringify([...prevNotes, newNote]));
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    if (window.confirm("Are you sure you want to delete your note?")) {
      setNotes(notes.filter((note) => note.id !== id));
      const newNotes = notes.filter((note) => note.id !== id);
      localStorage.removeItem("notes");
      localStorage.setItem("notes", JSON.stringify(newNotes));
    }
  }

  return (
    <div className="wrapper">
      <Header />
      <InputField onAdd={addNote}>Hello</InputField>
      <NotesContainer
        onAdd={addNote}
        notes={notes}
        setNoteState={setNotes}
        onDelete={deleteNote}
      />
    </div>
  );
}

export default App;
