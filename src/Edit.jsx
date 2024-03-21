import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./Edit.css";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditModal = ({ task, show, handleClose, handleEdit }) => {
  const [editedTask, setEditedTask] = useState({ ...task });

  useEffect(() => {
    if (!show) {
      setEditedTask({ title: "", description: "" });
    }
  }, [show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleSubmit = () => {
    handleEdit(editedTask);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="editmodal">
      <Modal.Body className="editbody">
        <div className="form-group">
          <input
            type="text"
            placeholder="Title"
            className="form-control"
            name="title"
            value={editedTask.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Description"
            className="form-control"
            rows={5} 
            name="description"
            value={editedTask.description}
            onChange={handleChange}
          />
        </div>
      </Modal.Body>
      <Modal.Footer className="footer1">
        <Button variant="btn btn-outline-primary" onClick={handleSubmit}>
         <FontAwesomeIcon icon={faCheck}/>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;