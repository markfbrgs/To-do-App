import React from "react";

const DateTime = ({ timestamp }) => {
  // Convert timestamp string to Date object
  const date = new Date(timestamp);

  // Format date in mm/dd/yy format
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
  });

  // Format time in 12-hour format with AM/PM
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return <p>{formattedDate}, {formattedTime}</p>;
};

export default DateTime;