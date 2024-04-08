const jwt = require("jsonwebtoken");
const User = require("../MODELS/User");

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer", " ");
        const decoded = jwt.verify(token, process.env.jWT_SECRET_KEY);

        const user = await User.findOne({ _id: decoded._id });

        if (!user) {
            throw new Error("Unable to Login", "invalid cradactional")
        }

        req.user = user;
        req.token = token;
        next();

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = auth;