import React, { useState } from "react";

import Timer from "./components/Timer";
import Kitty from "./components/Kitty.jsx";
import TaskList from "./components/TaskList.jsx";
import Login from "./components/Login.jsx";

import "./styles/globals.css";
import "./styles/modal.css";
import "./styles/login.css";

export default function App() {

  const [mode, setMode] = useState("work");
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [username, setUsername] = useState('guest');

  const [loginformVisibility, setLoginFormVisibility] = useState(false)

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {username === "guest" && (
          <button
            onClick={() => setLoginFormVisibility(true)}
            className="login-link"
          >
            Login
          </button>
        )}

        {username !== "guest" && (
          <p>Hello {username}</p>
        )}
      </div>

      {loginformVisibility && (
        <div
          className="modal-overlay"
          onClick={() => setLoginFormVisibility(false)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setLoginFormVisibility(false)}
            >
              ×
            </button>

            <Login
              onLogin={(username) => {
                setUsername(username);
                setLoginFormVisibility(false);
              }}
            />
          </div>
        </div>
      )}

      {username !== "guest" && <TaskList />}
      <Kitty
        mode={mode}
        isRunning={isRunning}
        isFinished={isFinished} />
      <Timer
        mode={mode}
        setMode={setMode}
        isRunning={isRunning}
        setIsRunning={setIsRunning}
        isFinished={isFinished}
        setIsFinished={setIsFinished} />
    </>
  );
}