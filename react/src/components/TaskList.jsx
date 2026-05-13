import React, { useMemo, useState, useEffect } from "react";
import AddTask from "./AddTask.jsx";


export default function TaskList() {


  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/tasks")
      .then((res) => res.json())
      .then(setTasks);
  }, []);

  const fetchTasks = () => {
    fetch("http://localhost:3001/tasks")
      .then((res) => res.json())
      .then(setTasks);
  };

  const sortedTasks = useMemo(() => {
    return [...tasks].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [tasks]);

  const addTask = () => {
    if (!newTask.trim()) return;

    const task = {
      id: Date.now(),
      description: newTask.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => [task, ...prev]);
    setNewTask("");
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
      <AddTask
        newTask={newTask}
        setNewTask={setNewTask}
        onTaskAdded={fetchTasks}
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
              onClick={() => deleteTask(task.id)}
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