const express = require("express");

const db = require("../config/connection");

const router = express.Router();

router.get("/", (req, res) => {
    res.json([]);
});

router.get("/:roomName", (req, res) => {
    const roomName = req.params.roomName;

    const subQuery = db.select("room_id").from("rooms").where("room_name", "=", roomName);

    db("messages").join("users", "messages.user_id", "=", "users.id")
    .select("users.name", "messages.message", "messages.message_time")
    .where("messages.room_id", "in", subQuery)
    .orderBy("messages.message_time")
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json({ Error: "Unable to get messages from server. Please try again later." }));
});

router.post("/", (req,res) => {
    const { email, roomName, message } = req.body;

    const userQuery = db.select("id").from("users").where("email", "=", email);
    const roomQuery = db.select("room_id").from("rooms").where("room_name", "=", roomName);

    db("messages")
    .returning("message_time")
    .insert({
        user_id: userQuery,
        room_id: roomQuery,
        message: message,
        message_time: new Date()
    })
    .then(data => {
        res.json({roomName: roomName, message_time: data[0]});
    })
    .catch(err => res.status(400).json({ Error: "Unable to send messages at the moment. Please try again later." }))
});

module.exports = router;