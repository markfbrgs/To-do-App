import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "./ConfirmDelete.css";

const ConfirmDelete = ({ show, handleClose, handleDelete }) => {
  return (
    <Modal show={show} onHide={handleClose} className="confirmmodal">
      <div className="confirmcontainer">
          <Modal.Body class="confirmtext">Are you sure you want to delete selected tasks?
          
          </Modal.Body>
      </div>
      <Modal.Footer className="footer">
        <Button variant="btn btn-outline-secondary" onClick={handleClose}>
          <span>Cancel</span>
        </Button>
        <Button variant="btn btn-outline-primary" onClick={handleDelete}>
        <span>Delete</span>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDelete;