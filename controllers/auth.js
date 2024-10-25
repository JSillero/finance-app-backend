const express = require('express');
const User = require('../models/user');
const router = express.Router();
require("dotenv/config")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



// !............ ROUTE...............

// SIGN UP

router.post("/signup", async ( req,res ) => {
    try {
        const {username, password, confirmPassword} = req.body

        // check if passwords match
        if (password !== confirmPassword) {
            return res.status(401).json({error: "Passwords do not match"})
        }


        // check if user already exists
        const userInDb = await User.findOne({username: username})


        if (userInDb) {
            return res.status(400).json({error: "Username already taken"})
        }

        // hash passwords
        req.body.password = bcrypt.hashSync(password, 12)

        const user = await User.create(req.body)

        // Generate JWT
        const payload = {
            username: user.username,
            _id: user.id,
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "24h"
        })
        

        return res.status(201).json({
            user: 
            payload,
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: error
        })
    }
})













module.exports = router