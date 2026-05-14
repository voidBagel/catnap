import React from "react";

export default function AddTask({ newTask, setNewTask, onTaskAdded }) {

    return (
        <div style={{ display: "flex", gap: "8px" }}>
            <input
                style={{ flex: 1, padding: "8px" }}
                type="text"
                placeholder="Add a task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onTaskAdded()}
            />

            <button onClick={onTaskAdded}>+</button>
        </div>
    );
}