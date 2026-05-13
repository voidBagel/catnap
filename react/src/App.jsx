import React, { useState } from "react";

import Timer from "./components/Timer";
import Kitty from "./components/Kitty.jsx";
import TaskList from "./components/TaskList.jsx";

export default function App() {

  const [mode, setMode] = useState("work");
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  return (
    <>
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
      <TaskList />
    </>
  );
}