import { useState } from "react";
import "../styles/login.css";
import useAuth from "../hooks/useAuth";

export default function Login({ onLogin }) {

    const { login } = useAuth();

    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleLogin = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await login(form);

            onLogin(data.username);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <input
                name="username"
                placeholder="username"
                value={form.username}
                onChange={handleChange}
            />

            <input
                name="password"
                type="password"
                placeholder="password"
                value={form.password}
                onChange={handleChange}
            />

            <button onClick={handleLogin} disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </button>

            {error && <p className="error">{error}</p>}
        </div>
    );
}