const express = require('express');
const router = express.Router();
const { validate } = require('../models/userModel');
const { save } = require('../services/userService');

const userValidator = (req, res, next) => {
    let { error } = validate(req.body);

    if (error) {
        return res.status(400).send("Missing parameters");
    }

    next();
}

router.post('/register', userValidator, async (req, res) => {
    const { status, body } = await save(req.body);
    res.status(status).send(body);
})

module.exports = router

