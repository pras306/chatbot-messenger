const { json } = require("express");
const express = require("express");

const db = require("../config/connection");

const router = express.Router();
const error = new Error();

router.get("/", (req, res) => {
    res.json([]);
});

router.get("/:email", (req, res, next) => {
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
    .catch(err => {
        error.message = "Unable to find any chat rooms for the current user.";
        error.status = 400;
        next(error);
    });
});

router.post("/", (req, res, next) => {
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
            error.message = "Room Name is used by another user.";
            error.status = 400;
            next(error);
        } else {
            error.message = "Unable to find nay chat rooms for the current user.";
            error.status = 400;
            next(error);
        }
    });
});

router.delete("/:roomName", (req, res, next) => {
    const roomName = req.params.roomName;

    db("rooms")
    .where("room_name", roomName)
    .delete()
    .then(response => {
        res.json({ Success: `${response} Room was successfully deleted.` });
    })
    .catch(err => {
        error.message = "Unable to find any rooms to delete for the current user.";
        error.status = 400;
        next(error);
    });
});

module.exports = router;