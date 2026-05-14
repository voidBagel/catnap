const express = require("express");
const db = require("../db");

const router = express.Router();

/**
 * Get tasks
 */
router.get("/tasks", (req, res) => {
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
router.post("/tasks", (req, res) => {
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
router.patch("/tasks/:id", (req, res) => {
    db.run(
        `UPDATE tasks SET completed = NOT completed WHERE id = ?`,
        [req.params.id],
        () => res.json({ ok: true })
    );
});

/**
 * Delete task
 */
router.delete("/tasks/:id", (req, res) => {
    db.run(`DELETE FROM tasks WHERE id = ?`, [req.params.id], () =>
        res.json({ ok: true })
    );
});

router.get("/tasks", requireAuth, (req, res) => {
    db.all(
        "SELECT * FROM tasks WHERE user_id = ?",
        [req.session.userId],
        (err, rows) => res.json(rows)
    );
});

module.exports = router;