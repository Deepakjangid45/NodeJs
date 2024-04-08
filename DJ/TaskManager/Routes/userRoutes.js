const express = require("express");
const User = require("../MODELS/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
    res.json("user roues are Working")
})

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ user, message: "user created succesfully" })
    } catch (error) {
        res.status(400).send({ error })
    }

})

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("unable to login", "user not Found")
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error("unable to login", "Invalid Cradactional")
        };

        const token = jwt.sign({
            _id: user._id.toString()
        }, process.env.jWT_SECRET_KEY);

        res.send({ user, token, message: "logedin succesfully" })

    } catch (error) {
        res.status(400).send({ error })

    }
})

module.exports = router;