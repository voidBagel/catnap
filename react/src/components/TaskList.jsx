import React, { useMemo, useState, useEffect } from "react";
import AddTask from "./AddTask.jsx";

import useTasks from "../hooks/useTasks";


export default function TaskList() {
  const [newTask, setNewTask] = useState("");

  const {
    tasks,
    addTask,
    removeTask,
    toggleTask,
  } = useTasks();

  async function handleAddTask() {
    await addTask(newTask);

    setNewTask("");
  }

  const sortedTasks = useMemo(() => {
    return [...tasks].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [tasks]);

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
      <AddTask
        newTask={newTask}
        setNewTask={setNewTask}
        onTaskAdded={handleAddTask}
      />
      <div
        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      >
        {sortedTasks.map((task) => (
          <div
            key={task.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px",
              border: "1px solid #ddd",
              marginBottom: "8px",
              borderRadius: "8px"
            }}
          >
            <div
              style={
                {
                  display: 'flex',
                  flexDirection: 'row'
                }
              }>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />

              <div>
                <p >
                  {task.description}
                </p>

                <p>
                  Created: {formatDate(task.createdAt)}
                </p>
              </div>
            </div>

            <button
              onClick={() => removeTask(task.id)}
            >
              Delete
            </button>
          </div>
        ))}

        {sortedTasks.length === 0 && (
          <div >
            No tasks yet.
          </div>
        )}
      </div>
    </div>
  );
}