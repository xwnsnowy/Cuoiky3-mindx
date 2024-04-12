import { useState } from "react";

const Form = ({ handleFormSubmit }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskTitle.trim() !== "") {
      handleFormSubmit(taskTitle, dueDate);
      setTaskTitle("");
      setDueDate("");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        placeholder="Enter task ..."
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
