const express = require("express");

const db = require("../config/connection");

const router = express.Router();
const error = new Error();

router.get("/", (req, res) => {
    res.json([]);
});

router.get("/:roomName", (req, res, next) => {
    const roomName = req.params.roomName;

    const subQuery = db.select("room_id").from("rooms").where("room_name", "=", roomName);

    db("messages").join("users", "messages.user_id", "=", "users.id")
    .select("users.name", "messages.message", "messages.message_time")
    .where("messages.room_id", "in", subQuery)
    .orderBy("messages.message_time")
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        error.message = "Unable to get any messages for the current chat room. Please try again later.";
        error.status = 400;
        next(error);
    });
});

router.post("/", (req, res, next) => {
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
    .catch(err => {
        error.message = "Unable to send messages in this chat room currently. Please try again later.";
        error.status = 400;
        next(error);
    });
});

module.exports = router;