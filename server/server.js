const express = require("express");
const session = require("express-session");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json());

app.use(
    session({
        secret: "dev-secret-key",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
        },
    })
);

app.use(authRoutes);
app.use(taskRoutes);

app.listen(3001, () => {
    console.log("Server running on http://localhost:3001");
});