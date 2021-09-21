const express = require("express");
const bcrypt = require("bcrypt");

const db = require("../config/connection");

const router = express.Router();


router.post("/", (req, res) => {
    const { name, email, password } = req.body;
    
    if(!email || !name || !password) {
        return res.status(400).json({ Error: "Incorrect Form submission" });
    }

    const hash_pwd = bcrypt.hashSync(password, 10);


    db("users")
    .returning([ "name", "email" ])
    .insert({
        name: name,
        email: email,
        password: hash_pwd,
        is_google_signin: false
    })
    .then(name => {
        console.log(name);
        res.json(name[0]);
    })
    .catch( err => {
        console.log(err);
        if(err.detail.includes("already exists")) {
            res.status(400).json({ Error: "Email is used by another user." });
        } else {
            res.status(400).json({ Error: "Unable to register user. Please try again later." });
        }
    });
});

module.exports = router;