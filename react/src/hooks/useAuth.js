import { useEffect, useState } from "react";
import * as authService from "../services/auth";

export default function useAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkSession();
    }, []);

    async function checkSession() {
        try {
            const data = await authService.getSession();

            if (data) {
                setUser(data.username);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    async function login(credentials) {
        const data = await authService.login(credentials);
        setUser(data.username);
        return data;
    }

    async function logout() {
        await authService.logout();

        setUser(null);
    }

    return {
        user,
        loading,
        login,
        logout,
    };
}