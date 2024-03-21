import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DateTime from "./DateTime.jsx";

const Done = ({ tasks }) => {
  return (
    <div className="done-list-container">
      <h2>Done Tasks</h2>
      <div className="done-list">
        {tasks.map((task, index) => (
          <div key={index} className="done-task">
            <div className="upper">
              <h4 style={{ textDecoration: 'line-through' }}>{task.title}</h4>
            </div>

            <div className="desc">
              <p style={{ textDecoration: 'line-through' }}>{task.description}</p>
            </div>

            <div className="date">
              <p>
                <DateTime timestamp={task.timestamp} />
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Done;