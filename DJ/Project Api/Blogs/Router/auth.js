const express = require("express");
const router = express.Router();
const User = require("../Models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemiller = require("nodemailer"); // sending email for verifactions
const errorMiddleware = require("../Middlewares/errorMiddleware");

//.2

const transport = nodemiller.createTransport({
    service: "gmail",
    auth: {
        user: "deepak@gmail.com",
        pass: "qwertyuiop"
    }
});


router.get("/test", (req, res) => {
    res.json({
        message: "Auth api is working"
    });
})


router.post("/sendotp", async (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000);
    try {
        const mailOpcations = {
            from: process.env.COMPENY_EMAIL,
            to: email,
            subject: "OTP for verifactions",
            text: `your otp verifactions is ${otp}`
        }

        transport.sendMail(mailOpcations, async (err, info) => {
            if (err) {
                console.log(err);
                res.status(500).json({
                    message: err.message
                });
            } else { }
        })

    } catch (error) {
        next(error)
    }
})


router.post("/register", async (req, res, next) => {

    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(409).json({ message: "email allredy exist" })
        }
        const newUser = new User({
            name, email, password
        });
        await newUser.save();
        res.status(201).json({
            message: "user register succesfully"
        });

    } catch (error) {
        next(error)
    }
})


router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "invalid username and password"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "invalid cradancationl"
            });
        }

        const authToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "10m" });
        const refreshToken = jwt.sign({ userId: user._id }, process.env.JEW_REFRASHE_KEY, { expiresIn: "40s" });
        res.cookie("authToken", authToken, { httpOnly: true });
        res.cookie("authToken", refreshToken, { httpOnly: true });
        res.status(200).json({
            message: "Login succesfully"
        })

    } catch (error) {
        next(error)
    }
})


router.use(errorMiddleware);



// router.post("/register", async (req, res) => {
//     try {
//         const { name, email, password } = req.body;
//         const existingUser = await User.findOne({ email: email });
//         if (existingUser) {
//             return res.status(409).json({ message: "email allrey exist" });
//         }

//         const newUser = new User({
//             name, email, password
//         });
//         new newUser.save();
//         res.status(201).json({
//             message: "user register succesfully"
//         });

//     } catch (error) {
//         res.status(5000).json({ message: error.message });
//     }
// })




module.exports = router;

