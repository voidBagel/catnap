import React, { useState } from "react";

import Timer from "./components/Timer";
import Kitty from "./components/Kitty.jsx";
import TaskList from "./components/TaskList.jsx";
import Login from "./components/Login.jsx";

import "./App.css";

export default function App() {

  const [mode, setMode] = useState("work");
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [username, setUsername] = useState('guest');

  const [loginformVisibility, setLoginFormVisibility] = useState(false)

  return (
    <>
      {username !== 'guest' ? (
        <>
          Hello {username}
          <TaskList />
        </>
      ) : loginformVisibility ? (
        <Login
          onLogin={(username) => {
            setUsername(username);
            setLoginFormVisibility(false);
          }}
        />
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end"
          }}
        >
          <button
            onClick={() => setLoginFormVisibility(true)}
            className="login-link"
          >
            Login
          </button>

        </div>
      )}
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