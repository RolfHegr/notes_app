import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import "./css/InputField.css";

export default function InputField({onAdd}) {
  const [note, setNote] = useState({
    title: "",
    content: "",
    id: "",
    date: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
        date: new Date()[Symbol.toPrimitive]("string"),
        id: new Date().getTime(),
      };
    });
  }

  function submitNote(event) {
    onAdd(note);
    setNote({
      title: "",
      content: "",
      id: "",
      date: "",
    });
    event.preventDefault();
  }

  return (
    <div className="card">
      <form className="input-field">
        <input
          onChange={handleChange}
          name="title"
          value={note.title}
          placeholder="Optional Title"
        ></input>
        <TextareaAutosize
          onChange={handleChange}
          value={note.content}
          placeholder="Write something to make the button work"
          className="text-area"
          name="content"
        ></TextareaAutosize>
        <button disabled={!note.content} name="submitButton" onClick={submitNote} type="submit">
          ADD NOTE
        </button>
      </form>
    </div>
  );
}
