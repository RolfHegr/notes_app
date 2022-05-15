import React from "react";
import CreateNote from "./CreateNote";
import "./css/NotesContainer.css";

export default function NotesContainer({ onDelete, notes, setNoteState, onAdd }) {
  const notesArr = Object.values(notes).flat();

  function editNote(editedNoteObj) {
    setNoteState((prevNotes) => {
      prevNotes.filter((noteItem) => {
        const {id, content, title, date} = editedNoteObj
        if (noteItem.id === id) {
          noteItem.content = content
          noteItem.title = title
          noteItem.date = date
        }
      });
      return [...prevNotes];
    });
  }

  return (
    <div className="notes-container">
      {notes && notes.map((note) => {
        return (
          <CreateNote
            editNote={editNote}
            onAdd={onAdd}
            notes={notes}
            setNoteState={setNoteState}
            onDelete={onDelete}
            title={note.title}
            key={note.id}
            id={note.id}
            date={note.date}
            content={note.content}
          />
        );
      })}
    </div>
  );
}
