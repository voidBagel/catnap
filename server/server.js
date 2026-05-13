const express = require("express");
const session = require("express-session");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(express.json());

const USERNAME = "kittycat";

/**
 * Get or create user (for safety)
 */
function getUserId(cb) {
    db.get(
        `SELECT id FROM users WHERE username = ?`,
        [USERNAME],
        (err, row) => {
            if (row) return cb(row.id);
            cb(null);
        }
    );
}

/**
 * Get tasks
 */
app.get("/tasks", (req, res) => {
    getUserId((userId) => {
        db.all(
            `SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC`,
            [userId],
            (err, rows) => {
                res.json(rows);
            }
        );
    });
});

/**
 * Add task
 */
app.post("/tasks", (req, res) => {
    const { description } = req.body;

    getUserId((userId) => {
        db.run(
            `INSERT INTO tasks (user_id, description, completed, created_at)
       VALUES (?, ?, 0, ?)`,
            [userId, description, new Date().toISOString()],
            function () {
                res.json({ id: this.lastID });
            }
        );
    });
});

/**
 * Toggle task
 */
app.patch("/tasks/:id", (req, res) => {
    db.run(
        `UPDATE tasks SET completed = NOT completed WHERE id = ?`,
        [req.params.id],
        () => res.json({ ok: true })
    );
});

/**
 * Delete task
 */
app.delete("/tasks/:id", (req, res) => {
    db.run(`DELETE FROM tasks WHERE id = ?`, [req.params.id], () =>
        res.json({ ok: true })
    );
});

app.listen(3001, () => {
    console.log("Server running on http://localhost:3001");
});

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

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    db.get(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        [username, password],
        (err, user) => {
            if (err) return res.status(500).json({ error: "db error" });

            if (!user) {
                return res.status(401).json({ error: "invalid credentials" });
            }

            req.session.userId = user.id;
            req.session.username = user.username;

            res.json({ username: user.username });
        }
    );
});

function requireAuth(req, res, next) {
    if (!req.session.userId) {
        return res.status(401).json({ error: "unauthorized" });
    }
    next();
}

app.get("/tasks", requireAuth, (req, res) => {
    db.all(
        "SELECT * FROM tasks WHERE user_id = ?",
        [req.session.userId],
        (err, rows) => res.json(rows)
    );
});