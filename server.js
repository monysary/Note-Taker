// Setting up express and other tools
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.listen(3001, () => console.log("Application listening at http://localhost:3001"))

// Function to return a random string
const randomStr = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}

// GET request to direct client to index.html page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"), (err) =>
        err ? console.error(err) : console.log("Path successfully directed to index.html"))
})

// GET request to direct client to notes.html page
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "notes.html"), (err) =>
        err ? console.error(err) : console.log("Path successfully directed to notes.html"))
})

// GET request to return saved notes
app.get("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "db", "db.json"), (err, data) => {
        if (err) {
            console.error("Error: ", err);
        } else {
            res.json(JSON.parse(data));
        }
    })
})

// POST request to add new notes to the database
app.post("/api/notes", (req, res) => {
    const { title, text } = req.body;

    // Assigning the notes to a new object so we can pass in a unique ID
    const newRequest = {
        title,
        text,
        resID: randomStr()
    }

    fs.readFile(path.join(__dirname, "db", "db.json"), (err, data) => {
        if (err) {
            console.error("Error: ", err);
        } else {
            const parseData = JSON.parse(data);
            parseData.push(newRequest);

            // Adding new notes to database
            fs.writeFile(path.join(__dirname, "db", "db.json"), JSON.stringify(parseData), (err, data) => {
                if (err) {
                    console.error("Error: ", err);
                } else {
                    console.log("New notes successfully added to Database!");
                }
            })
        }
    })
})