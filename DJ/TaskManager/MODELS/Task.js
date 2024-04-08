const monggose = require("mongoose");

const taskSchema = new monggose.Schema({
    description: { type: String, require: true },
    complated: { type: Boolean, default: false },
    owner: { type: monggose.Schema.Types.ObjectId, require: true, ref: "User" },
}, { timestamps: true });

const Task = monggose.model("Task", taskSchema);
module.exports = Task;