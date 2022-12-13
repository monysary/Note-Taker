const router = require("express").Router();
const path = require("path");

// GET request to route client to notes.html page
router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "notes.html"), (err) =>
    err ? console.error(err) : console.log("Path successfully directed to notes.html"))
})

// GET request to route client to index.html page for all other url extensions
router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"), (err) =>
    err ? console.error(err) : console.log("Path successfully directed to index.html"))
})

module.exports = router