const monggose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new monggose.Schema({
    name: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    blogs: {
        type: Array,
        default: [],
    },
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

const User = monggose.model("User", userSchema);
module.exports = User;