const API_URL = "http://localhost:3001";

export async function login({ username, password }) {
    const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
    });

    if (!res.ok) throw new Error("Login failed");

    return res.json();
}

export async function logout() {
    await fetch(`${API_URL}/logout`, {
        method: "POST",
        credentials: "include",
    });
}

export async function getSession() {
    const res = await fetch(`${API_URL}/me`, {
        credentials: "include",
    });

    if (!res.ok) {
        return null;
    }

    return res.json();
}