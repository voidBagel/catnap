//Kitty naps while user works
//Kitty has states: asleep while timer is running, awake when timer is paused or finished

import React, { useState, useEffect } from "react";


export default function Kitty({ mode, isRunning, isFinished }) {
    if (mode === "work" && isRunning) {
        return <p>Kitty is watching you focus 😼</p>;
    }

    if (mode === "break" && isRunning) {
        return <p>Kitty is relaxing with you 💤</p>;
    }

    if (isFinished) {
        return <p>Kitty says: time to switch 🐾</p>;
    }

    return <p>Kitty is waiting 🐱</p>;
}