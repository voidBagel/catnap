const express = require("express");
const db = require("../db");

const router = express.Router();

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    db.get(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        [username, password],
        (err, user) => {
            if (err) {
                return res.status(500).json({
                    error: "Database error",
                });
            }

            if (!user) {
                return res.status(401).json({
                    error: "Invalid credentials",
                });
            }

            req.session.userId = user.id;
            req.session.username = user.username;

            res.json({
                username: user.username,
            });
        }
    );
});

router.get("/me", (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({
            error: "Not authenticated",
        });
    }

    res.json({
        username: req.session.username,
    });
});

module.exports = router;