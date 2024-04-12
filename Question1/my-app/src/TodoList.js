import React from "react";
import { FaRegCircle, FaRegCheckCircle } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TodoList = ({ tasks, handleTaskToggle, handleDragEnd }) => {
  const calculateDaysLeft = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const timeDiff = due.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysLeft;
  };
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <div
            className="todo-list-container"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef} 
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`todo-item-container ${task.done ? "done" : ""}`}
                  >
                    {task.done ? (
                      <FaRegCheckCircle
                        className="item-done-button"
                        color="#9a9a9a"
                        onClick={() => handleTaskToggle(task.id)}
                      />
                    ) : (
                      <FaRegCircle
                        className="item-done-button"
                        color="#9a9a9a"
                        onClick={() => handleTaskToggle(task.id)}
                      />
                    )}
                    <div className="item-details">
                      <div className="item-title">{task.title}</div>
                      {task.dueDate && (
                        <div className="due-date">
                          ( Due in {calculateDaysLeft(task.dueDate)} days )
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TodoList;
