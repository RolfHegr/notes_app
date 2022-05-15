import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import Modal from "react-modal";
import "./css/CreateNote.css";
import "./css/Modal.css";
import InputField from "./InputField";

Modal.setAppElement("#root");

export default function CreateNote({
  onDelete,
  title,
  id,
  date,
  content,
  editNote,
}) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [noteObj, setNoteObj] = useState({
    title: "",
    content: "",
    id: "",
    date: "",
  });

  //Displays Date + Time
  function convertTimeStr(str) {
    return str.substr(0, 24);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setNoteObj((prevNote) => {
      return {
        ...prevNote,
        title: title,
        content: content,
        [name]: value,
        date: new Date()[Symbol.toPrimitive]("string"),
        id: id,
      };
    });
  }

  function confirmNoteEdit(event) {
    event.preventDefault();
    editNote(noteObj);
    closeModal();
  }

  //---- MODAL -----

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  function handleClick() {
    onDelete(id);
  }

  //----- MODAL -----

  return (
    <div className="note-entry">
      <div className="inner-note" >
        <div onClick={openModal}>
          <span>{convertTimeStr(date)}</span>
          <h2>{title}</h2>
          <p>{content}</p>
        </div>
        <button onClick={handleClick} name="delete">
          DELETE NOTE
        </button>
      </div>
      <Modal
        className="modal inner-modal"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
      {/* <InputField /> */}
        <form>
          <input
            onChange={handleChange}
            name="title"
            defaultValue={title}
            placeholder="Optional Title"
          ></input>
          <TextareaAutosize
            onChange={handleChange}
            defaultValue={content}
            className="text-area"
            name="content"
          ></TextareaAutosize>
          <button onClick={confirmNoteEdit}>Edit Note</button>
        </form>
      </Modal>
    </div>
  );
}
