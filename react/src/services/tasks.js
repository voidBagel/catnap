const API_URL = "http://localhost:3001";

export async function getTasks() {
    const res = await fetch(`${API_URL}/tasks`, {
        credentials: "include",
    });

    return res.json();
}

export async function createTask(description) {
    const res = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ description }),
    });

    return res.json();
}

export async function deleteTask(id) {
    await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE",
        credentials: "include",
    });
}

export async function toggleTask(id) {
    await fetch(`${API_URL}/tasks/${id}/toggle`, {
        method: "PATCH",
        credentials: "include",
    });
}