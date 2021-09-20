const express = require("express");

const signin = require("../controllers/signin");
const register = require("../controllers/register");
const rooms = require("../controllers/rooms");
const messages = require("../controllers/messages");

const router = express.Router();

router.get("/", (req, res) => {
    res.json({ success: "Chat Messenger Routes Home" });
});

router.use('/users/signin', signin);
router.use("/users/register", register);
router.use("/rooms", rooms);
router.use("/messages", messages);

module.exports = router;