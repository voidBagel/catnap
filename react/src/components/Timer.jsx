import { useEffect, useState } from "react";

const DURATIONS = {
    work: 0.1 * 60,
    break: 0.1 * 60,
};
export default function Timer({ mode, setMode, isRunning, setIsRunning, isFinished, setIsFinished }) {

    const [timeLeft, setTimeLeft] = useState(DURATIONS[mode]);

    useEffect(() => {
        setTimeLeft(DURATIONS[mode]);
    }, [mode]);

    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning]);

    useEffect(() => {
        if (timeLeft > 0) return;

        setIsRunning(false);
        setIsFinished(true);
        setMode((m) => (m === "work" ? "break" : "work"));
        handleTimerUp();
    }, [timeLeft]);

    function toggle() {
        setIsRunning((prev) => !prev);
        if (isFinished) setIsFinished(false);
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;

        return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }
    function handleTimerUp() {
        alert(`Time's up for ${mode}!`);
    }

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
                fontFamily: "sans-serif",
            }}
        >
            <h1>{mode.toUpperCase()}</h1>

            <div style={{ fontSize: "64px", fontWeight: "bold" }}>
                {formatTime(timeLeft)}
            </div>

            <button
                onClick={toggle}
                style={{
                    padding: "10px 20px",
                    fontSize: "18px",
                    cursor: "pointer",
                }}
            >
                {isRunning ? "Pause" : "Start"}
            </button>
        </div>
    );
}