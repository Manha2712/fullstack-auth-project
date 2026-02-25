const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, "public")));

// Database setup
const db = new sqlite3.Database("./database.db");

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            email TEXT UNIQUE,
            password TEXT
        )
    `);
});

// Signup Route
app.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.json({ success: false, message: "All fields are required" });
    }

    if (password.length < 6) {
        return res.json({ success: false, message: "Password must be at least 6 characters" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;

    db.run(query, [username, email, hashedPassword], function(err) {
        if (err) {
            return res.json({ success: false, message: "User already exists" });
        }
        res.json({ success: true, message: "Account created successfully" });
    });
});

// Login Route
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const query = `SELECT * FROM users WHERE email = ?`;

    db.get(query, [email], async (err, user) => {
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const match = await bcrypt.compare(password, user.password);

        if (match) {
            req.session.user = user;
            res.json({ success: true, message: "Login successful" });
        } else {
            res.json({ success: false, message: "Wrong password" });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});