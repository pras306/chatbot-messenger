const express = require("express");
const bcrypt = require("bcrypt");

const db = require("../config/connection");

const router = express.Router();
const error = new Error();


router.post("/", (req, res, next) => {
    const { name, email, password } = req.body;
    
    if(!email || !name || !password) {
        error.message = "Incorrect Form Submission";
        error.status = 400;
        next(error);
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
    .then(user => {
        res.json({
            message: "User was signed in successfully",
            data: user[0]
        });
    })
    .catch( err => {
        if(err.detail.includes("already exists")) {
            error.message = "Email is used by another user.";
            error.status = 400;
            next(error);
        } else {
            error.message = "Unable to register user. Please try again later.";
            error.status = 400;
            next(error);
        }
    });
});

module.exports = router;