const express = require('express');
const router = express.Router();
const { validate } = require('../models/userModel');
const { save, get, verifyUser } = require('../services/userService');
const { generateJWT, verifyJWT } = require('../services/authService');

const userValidator = (req, res, next) => {
    let { error } = validate(req.body);

    if (error) {
        return res.status(400).send(error.message);
    }

    next();
}

router.post('/login', userValidator, async (req, res) => {
    verifyUser(req.body, 
        (err) => res.status(400).send(err), 
        (user) => {
            let jwt = generateJWT(user.uuid);
            res.status(200).send(jwt);
        })
})

router.post('/register', userValidator, async (req, res) => {
    save(req.body, 
        (err) => res.status(400).send(err), 
        () => { res.status(200).send("Sucessfully registered");
    })
})

module.exports = router

