import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Create.css";
import { faXmark, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Create = ({ showModal, handleModalClose, addTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Reset title and description when modal closes
  useEffect(() => {
    if (!showModal) {
      setTitle('');
      setDescription('');
    }
  }, [showModal]);

  const handleSubmit = () => {
    addTask(title, description);
    setTitle('');
    setDescription('');
    handleModalClose();
  };

  return (
    <Modal show={showModal} onHide={handleModalClose} centered className="custom-modal">
      <Modal.Body className="modal-body">
        <Form>
          <div className="title-container">
            <Form.Control 
              type="text" 
              placeholder="Title" 
              className="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
            />
          </div>
          <Form.Control 
            as="textarea" 
            rows={5} 
            placeholder="Description" 
            className="description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          />
        </Form>
      </Modal.Body>
      <Modal.Footer className="footer">
        <Button variant="btn btn-outline-primary" type="submit" className="addtask" onClick={handleSubmit}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Create;