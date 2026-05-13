import React from "react";

export default function AddTask({ newTask, setNewTask, onTaskAdded }) {
    const addTask = async () => {
        if (!newTask.trim()) return;

        await fetch("http://localhost:3001/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ description: newTask }),
        });

        setNewTask("");

        onTaskAdded?.();
    };

    return (
        <div style={{ display: "flex", gap: "8px" }}>
            <input
                style={{ flex: 1, padding: "8px" }}
                type="text"
                placeholder="Add a task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
            />

            <button onClick={addTask}>+</button>
        </div>
    );
}