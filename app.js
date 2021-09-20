const express = require("express");
const cors = require("cors");

const api = require("./api");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));


//API Home Route

app.get("/", (req, res) => {
    res.json({ success: "Welcome to Chat Messenger API" });
});

app.use("/api", api);

module.exports = app;