const express = require("express");
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.listen(3001, () => console.log("Application listening at http://localhost:3001"))

app.get("/api/notes", (req, res) => {
    
})