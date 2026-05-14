import { useEffect, useMemo, useState } from "react";
import * as taskService from "../services/tasks";

export default function useTasks() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    async function fetchTasks() {
        const data = await taskService.getTasks();
        setTasks(data);
    }

    async function addTask(description) {
        if (!description.trim()) return;

        await taskService.createTask(description);

        fetchTasks();
    }

    async function removeTask(id) {
        await taskService.deleteTask(id);

        setTasks((prev) =>
            prev.filter((task) => task.id !== id)
        );
    }

    async function toggleTask(id) {
        await taskService.toggleTask(id);

        setTasks((prev) =>
            prev.map((task) =>
                task.id === id
                    ? {
                        ...task,
                        completed: !task.completed,
                    }
                    : task
            )
        );
    }

    const sortedTasks = useMemo(() => {
        return [...tasks].sort(
            (a, b) =>
                new Date(b.createdAt) -
                new Date(a.createdAt)
        );
    }, [tasks]);

    return {
        tasks: sortedTasks,
        addTask,
        removeTask,
        toggleTask,
    };
}