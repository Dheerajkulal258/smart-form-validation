const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
    res.render("index");
});

app.post("/submit", (req, res) => {
    const { name, email, password } = req.body;

    res.send(`
        <h2>Form Submitted Successfully</h2>
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
    `);
});

// Start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});