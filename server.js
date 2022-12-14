// Setting up express and other tools
const express = require("express");
const app = express();
const path = require("path");

// Setting up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Setting up routing files
const htmlRouter = require(path.join(__dirname, "routes", "HTMLroutes.js"));
const apiRouter = require(path.join(__dirname, "routes", "APIroutes.js"));
app.use("/api", apiRouter);
app.use("/", htmlRouter);

// Application listening on port 3001
app.listen(3001, () => console.log("Application listening at http://localhost:3001"))