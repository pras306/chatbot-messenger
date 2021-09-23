const express = require("express");
const bcrypt = require("bcrypt");

const db = require("../config/connection");

const router = express.Router();
const error = new Error();

router.post("/", (req, res, next) => {
    const { name, email, password, isGoogleSignIn } = req.body;

    if(!email) {
        error.message = "Incorrect form submission";
        error.status = 400;
        next(error);
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
                .catch(err => {
                    error.message = "User not found";
                    error.status = 400;
                    next(error);
                });
            } else {
                error.message = "Email and Password do not match.";
                error.status = 400;
                next(error);
            }
        })
        .catch(err => {
            error.message = "User not found";
            error.status = 400;
            next(error);
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
                    error.message = "Unable to signin user. Please try again later.";
                    error.status = 400;
                    next(error);
                });
            } else {
                res.json(data[0])
            }
        })
        .catch(err => {
            error.message = "Unable to signin user. Please try again later.";
            error.status = 400;
            next(error);
        });
    }

});

module.exports = router;