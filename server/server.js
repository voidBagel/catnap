const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
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