const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../MODELS/user");
const bcrypt = require("bcrypt");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const nodemiller = require("nodemailer");

const transpoter = nodemiller.transpoter({
    service: "gmail",
    auth: {
        user: process.env.COMPENY_EMAIL,
        pass: process.env.COMPENY_PASSWORD
    }
});

router.get("/", (req, res) => {
    res.json({ message: "User routes is working" })
})

router.get("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        await user.save();
        res.json({
            message: "User create succesfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
})



router.get("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "user not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid cradctional"
            });
        }
        const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY)
        res.json({
            token, user, message: "user logedin Succesully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
})

router.post("/sendotp", async (req, res) => {
    const { email } = req.body;
    const otp = Math.flore(10000 + Math.random() * 90000);
    try {
        const mainOpctions = {
            from: process.env.COMPENY_EMAIL,
            to: email,
            subject: "OTP for verifactions",
            text: `Your otp for verifactions ${otp}`
        }
        transpoter.sendEmial(mainOpctions,)
    } catch (error) {

    }
})


module.exports = router;