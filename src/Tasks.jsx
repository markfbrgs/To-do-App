import React, { useState } from "react";
import "./Tasks.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DateTime from "./DateTime.jsx";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Edit from "./Edit.jsx";

const Tasks = ({ tasks, selectedTasks, handleCheckboxChange, editTask }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleEdit = (editedTask) => {
    editTask(selectedTask.index, editedTask);
  };

  const handleEditClick = (task, index) => {
    setSelectedTask({ task, index });
    setShowEditModal(true);
  };

  return (
    <div className="task-list-container">
      <div className="task-list">
        {tasks.map((task, index) => (
          <div key={index} className={`task ${task.completed ? 'completed' : ''}`}>
            <div className="upper">
              <h4 style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title}</h4>
              <input
                class="form-check-input mt-0"
                type="checkbox"
                className="checktasks"
                id={`fillBodyCheckbox${index}`}
                checked={selectedTasks.includes(index)}
                onChange={() => handleCheckboxChange(index)}
              />
              <label htmlFor={`fillBodyCheckbox${index}`} className="custom-checkbox"></label>
            </div>

            <div className="desc">
              <p style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.description}</p>
            </div>

            <div className="date">
              <p style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                <DateTime timestamp={task.timestamp} />
              </p>
              <FontAwesomeIcon
                className="pencil-icon"
                type="button"
                icon={faPencil}
                onClick={() => handleEditClick(task, index)}
              />
            </div>
          </div>
        ))}
      </div>
      <Edit
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        handleEdit={handleEdit}
        task={selectedTask ? selectedTask.task : null}
      />
    </div>
  );
};

export default Tasks;