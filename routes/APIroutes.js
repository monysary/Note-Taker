const router = require("express").Router();
const path = require("path");
const fs = require("fs");

// Function to return a random string
const randomStr = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

// GET request to return saved notes
router.get("/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "..", "db", "db.json"), (err, data) => {
        if (err) {
            console.error("Error: ", err);
        } else {
            res.json(JSON.parse(data));
        }
    })
})

// POST request to add new notes to the database
router.post("/notes", (req, res) => {
    const { title, text } = req.body;
    
    // Assigning the notes to a new object so we can pass in a unique ID
    const newRequest = {
        title,
        text,
        id: randomStr()
    }
    
    // Updating database with newly added notes
    fs.readFile(path.join(__dirname, "..", "db", "db.json"), (err, data) => {
        if (err) {
            console.error("Error: ", err);
        } else {
            const parseData = JSON.parse(data);
            parseData.push(newRequest);
            
            // Adding new notes to database
            fs.writeFile(path.join(__dirname, "..", "db", "db.json"), JSON.stringify(parseData), (err, data) => {
                if (err) {
                    console.error("Error: ", err);
                } else {
                    res.json(data);
                    console.log("New note added to database");
                }
            });
        }
    })
})

// DELETE request to remove saved notes when user clicks delete next to the note
router.delete("/notes/:id", (req, res) => {
    fs.readFile(path.join(__dirname, "..", "db", "db.json"), (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parseData = JSON.parse(data);
            filterData = parseData.filter((obj) => {
                return obj.id !== req.params.id
            });
            
            // Replace notes in database with removed note
            fs.writeFile(path.join(__dirname, "..", "db", "db.json"), JSON.stringify(filterData), (err, data) => {
                if (err) {
                    console.error(err);
                } else {
                    res.json(data);
                    console.log("Note deleted from database");
                }
            });
        }
    })
})

module.exports = router