const monggose = require("mongoose");
const bcrypt = require("bcrypt");

const paragraphSchema = new monggose.Schema({
    title: { type: String, require: true },
    description: { type: String, require: true },
    image: { type: String, require: true },
});

const blogsSchema = new monggose.Schema({
    title: { type: String, require: true },
    description: { type: String, require: true },
    image: { type: String, require: true },
    paragraph: {
        type: [paragraphSchema],
        default: []
    },
    owner: {
        type: monggose.Schema.Types.ObjectId, require: true, ref: "User"
    },
}, { timestamps: true });


const User = monggose.model("User", blogsSchema);
module.exports = User;