const express = require("express");
const bcrypt = require("bcrypt");

const db = require("../config/connection");

const router = express.Router();


router.post("/", (req, res) => {
    const { name, email, password, isGoogleSignIn } = req.body;

    console.log(name, email, password);
    if(!email) {
        return res.status(400).json({ Error: "Incorrect form submission" });
    }

    if(!isGoogleSignIn) {
        db.select("email", "password").from("users")
        .where("email", "=", email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].password);

            if(isValid) {
                db.select("name", "email").from("users")
                .where("email", "=", email)
                .then(user => {
                    res.json(user[0]);
                })
                .catch(err => res.status(400).json({ Error: "User not found" }));
            } else {
                return res.status(400).json({ Error: "Email and Password do not match" });
            }
        })
        .catch(err => {
            res.status(400).json({ Error: "User not found" });
        });
    } else {
        db.select("name", "email").from("users")
        .where("email", email)
        .then(data => {
            if(data.length <= 0) {
                db("users")
                .returning("name", "email")
                .insert({
                    name: name,
                    email: email,
                    password: '',
                    is_google_signin: true
                })
                .then(user => {
                    res.json(user[0])
                })
                .catch( err => {
                    res.status(400).json({ Error: err });
                });
            } else {
                res.json(data[0])
            }
        })
        .catch(err => {
            res.status(400).json({ Error: err });
        });
    }

});

module.exports = router;