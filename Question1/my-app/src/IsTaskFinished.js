import React from "react";

const IsTaskFinished = ({ checked, onChange }) => {
  return (
    <div className="todo-item-container">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span style={{ color: "black", fontFamily: "serif" }}>
        Not finished only
      </span>
    </div>
  );
};

export default IsTaskFinished;
