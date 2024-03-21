import React, { useState, useEffect } from "react";
import "./App.css";
import Create from "./Create.jsx";
import Tasks from "./Tasks.jsx";
import ConfirmDelete from "./ConfirmDelete.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { faPlus, faTrashCan, faCheckDouble, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleModalShow = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const addTask = (title, description) => {
    const newTask = {
      title,
      description,
      completed: false,
      timestamp: new Date().toLocaleString(),
      id: tasks.length + 1, // Assigning a unique id to each task
    };
  
    const updatedTasks = [...tasks, newTask];
  
    // Move completed tasks to the end of the array
    updatedTasks.sort((a, b) => {
      if (a.completed && !b.completed) return 1; // Move completed tasks down
      if (!a.completed && b.completed) return -1; // Move incomplete tasks up
      return 0; // Maintain the original order for tasks with the same completion status
    });
  
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleCheckboxChange = (index) => {
    const isSelected = selectedTasks.includes(index);
    if (isSelected) {
      setSelectedTasks(selectedTasks.filter((i) => i !== index));
    } else {
      setSelectedTasks([...selectedTasks, index]);
    }
  };

  const handleDeleteSelectedTasks = () => {
    setShowConfirmDelete(true);
  };

  const confirmDelete = () => {
    const updatedTasks = tasks.filter((task, index) => !selectedTasks.includes(index));
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setSelectedTasks([]);
    setShowConfirmDelete(false);
  };

  const handleCloseConfirmDelete = () => {
    setShowConfirmDelete(false);
  };

  const handleSelectAllTasks = () => {
    const allTasksIndexes = tasks.map((_, index) => index);
    // Check if all tasks are already selected
    const allSelected = selectedTasks.length === tasks.length;
    setSelectedTasks(allSelected ? [] : allTasksIndexes);
  };

  const markAsDone = () => {
    const updatedTasks = tasks.map((task, index) => ({
      ...task,
      completed: selectedTasks.includes(index) ? true : task.completed,
    }));
    // Reorder completed tasks to move down
    updatedTasks.sort((a, b) => {
      if (a.completed && !b.completed) return 1; // Move completed tasks down
      if (!a.completed && b.completed) return -1; // Move incomplete tasks up
      return 0;
    });
    setTasks(updatedTasks);
    setSelectedTasks([]); // Clear selected tasks
  };

  const markAsUndone = () => {
    const updatedTasks = tasks.map((task, index) => ({
      ...task,
      completed: selectedTasks.includes(index) ? false : task.completed,
    }));
    // Reorder undone tasks to their original position based on creation time
    updatedTasks.sort((a, b) => {
      if (a.completed && !b.completed) return 1; // Move completed tasks down
      if (!a.completed && b.completed) return -1; // Move incomplete tasks up
      // If both tasks are incomplete, compare their creation time
      return new Date(a.timestamp) - new Date(b.timestamp);
    });
    setTasks(updatedTasks);
    setSelectedTasks([]); // Clear selected tasks
  };

  const editTask = (index, updatedTask) => {
    const updatedTasks = [...tasks];
    // Retain the original timestamp
    updatedTask.timestamp = tasks[index].timestamp;
    updatedTasks[index] = updatedTask;
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <>
      <div className="container">
        <div className="container-fluid">
          <h1 className="textlogo">
            <img src="public/img/3.png" alt="logo" className="logo" />
            LexMeet
          </h1>
          <h4 className="textlogo1">Legal help in a click!</h4>
          <span className="navbar-text1">To do List</span>
        </div>
        <div className="d-flex justify-content-between one">
          <div className="d-flex gap-2">
            <button type="button" className="btn btn-outline-primary" onClick={handleModalShow}>
              <FontAwesomeIcon icon={faPlus} className="plus" />
            </button>
            <button type="button" className="btn btn-outline-danger" onClick={handleDeleteSelectedTasks}>
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
            <button type="button" className="btn btn-outline-success" onClick={markAsDone}>
              Mark as Done
            </button>
            <button type="button" className="btn btn-outline-info" onClick={markAsUndone}>
              Undone
            </button>
          </div>
          <button type="button" className={`btn ${selectedTasks.length === tasks.length ? 'btn-secondary' : 'btn-outline-secondary'}`} onClick={handleSelectAllTasks}>
            <FontAwesomeIcon icon={faCheckDouble}/>
          </button>
        </div>
        <Tasks
          tasks={tasks}
          deleteTask={deleteTask}
          selectedTasks={selectedTasks}
          handleCheckboxChange={handleCheckboxChange}
          editTask={editTask} // Pass editTask function as a prop
        />
      </div>
      <Create showModal={showModal} handleModalClose={handleModalClose} addTask={addTask} />
      <ConfirmDelete show={showConfirmDelete} handleClose={handleCloseConfirmDelete} handleDelete={confirmDelete} />
    </>
  );
}