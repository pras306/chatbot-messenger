const { json } = require("express");
const express = require("express");

const db = require("../config/connection");

const router = express.Router();

router.get("/", (req, res) => {
    res.json([]);
});

router.get("/:email", (req, res) => {
    const email = req.params.email;

    const userQuery = db.select("id").from("users").where("email", "=", email);
    const roomQuery = db.select("room_id").from("rooms").where("user_id", "in", userQuery);

    db("rooms").leftJoin("messages", "rooms.room_id", "messages.room_id")
    .select("rooms.room_name")
    .max("messages.message_time")
    .where("rooms.room_id", "in", roomQuery)
    .groupBy("rooms.room_name")
    .then(rooms => {
        if(rooms.length <= 0){
            return res.json([]);
        } else {
            res.json(rooms);
        }
    })
    .catch(err => res.status(400).json({ Error: "Unable to find any chat rooms for the current user" }));
});

router.post("/", (req, res) => {
    const { roomName, email } = req.body;

    const subQuery = db.select("id").from("users").where("email", "=", email);

    db("rooms")
    .returning("room_name")
    .insert({
        user_id: subQuery,
        room_name: roomName
    })
    .then(room => {
        res.json(room);
    })
    .catch(err => {
        if(err.detail.includes("already exists")) {
            res.status(400).json({ Error: "Room Name is used by another user" });
        } else {
            res.status(400).json({ Error: "Unable to find any chat rooms for the current user" });
        }
    });
});

router.delete("/:roomName", (req, res) => {
    const roomName = req.params.roomName;

    db("rooms")
    .where("room_name", roomName)
    .delete()
    .then(response => {
        res.json({ Success: `${response} Room was successfully deleted.` });
    })
    .catch(err => res.status(400).json({ Error: "Unable to delete room. Please try again later" }));
});

module.exports = router;