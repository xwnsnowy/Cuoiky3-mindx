import "./styles.css";
import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import TodoList from "./TodoList";
import TodoListHeader from "./TodoListHeader";
import Form from "./Form";
import Footer from "./Footer";
import IsTaskFinished from "./IsTaskFinished";
import { DragDropContext } from "react-beautiful-dnd";

export default function App() {
  return (
    <div className="App ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:withDone" element={<Home />} />
        {/* Added a route with a parameter for showing done tasks */}
      </Routes>
    </div>
  );
}

const Home = () => {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const location = useLocation();
  const [showDoneTasks, setShowDoneTasks] = useState(true);
  const [showNotFinishedOnly, setShowNotFinishedOnly] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const withDoneParam = searchParams.get("withDone");
    setShowDoneTasks(withDoneParam === "1");
  }, [location.search]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleTaskToggle = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
  };

  const handleFormSubmit = (title, dueDate) => {
    const newTask = {
      id: tasks.length + 1,
      title: title,
      done: false,
      dueDate: dueDate,
    };
    setTasks([...tasks, newTask]);
  };

  const handleNotFinishedOnlyChange = (e) => {
    setShowNotFinishedOnly(e.target.checked);
  };

  const undoneTasksCount = tasks.filter((task) => !task.done).length;
  const filteredTasks = showDoneTasks
    ? tasks
    : tasks.filter((task) => !task.done);

  const filteredTasksToShow = showNotFinishedOnly
    ? tasks.filter((task) => !task.done)
    : filteredTasks;

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(filteredTasksToShow);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
  };

  return (
    <div className="App">
      <div className="container">
        <TodoListHeader undoneTasksCount={undoneTasksCount} />
        <IsTaskFinished
          checked={showNotFinishedOnly}
          onChange={handleNotFinishedOnlyChange}
        />
        <TodoList
          tasks={filteredTasksToShow}
          handleTaskToggle={handleTaskToggle}
          handleDragEnd={handleDragEnd}
        />
        <Form handleFormSubmit={handleFormSubmit} />
      </div>
      <Footer />
    </div>
  );
};
