const express = require("express");
const app = express()
const path = require("path")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.listen(3001, () => console.log("Application listening at http://localhost:3001"))

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "notes.html"), (err) => 
    err ? console.error(err) : console.log("Path successfully sent to notes.html"))
})