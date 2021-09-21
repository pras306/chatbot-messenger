const express = require("express");
const path = require("path");

const signin = require(path.join(__dirname, "./controllers/signin"));
const register = require(path.join(__dirname, "./controllers/register"));
const rooms = require(path.join(__dirname, "./controllers/rooms"));
const messages = require(path.join(__dirname, "./controllers/messages"));


const router = express.Router();

router.get("/", (req, res) => {
    res.json({ success: "Chat Messenger Routes Home" });
});

router.use('/users/signin', signin);
router.use("/users/register", register);
router.use("/rooms", rooms);
router.use("/messages", messages);

module.exports = router;