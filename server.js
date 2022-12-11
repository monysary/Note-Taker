// Setting up express and other tools
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.listen(3001, () => console.log("Application listening at http://localhost:3001"))

// Get request to direct client to index.html page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"), (err) => 
    err ? console.error(err) : console.log("Path successfully directed to index.html"))
})

// Get request to direct client to notes.html page
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "notes.html"), (err) => 
    err ? console.error(err) : console.log("Path successfully directed to notes.html"))
})

// Get request to return saved notes
app.get("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "db", "db.json"), (err, data) => {
        if (err) {
            console.error("Error: ", err);
        } else {
            res.json(JSON.parse(data));
        }
    })
})