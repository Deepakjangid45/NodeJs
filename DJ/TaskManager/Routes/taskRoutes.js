const express = require("express");
const router = express.Router();
const auth = require("../MIDDLEWARES/auth");
const Task = require("../MODELS/Task");


router.get("/test", auth, (req, res) => {
    res.json({ message: "Task is working", user: req.user })
})

// CURD Task for authenticated users

// CREATE task
router.post("/", auth, async (req, res) => {
    try {
        const task = new Task({ ...req.body, owner: req.user._id })
        await task.save();
        res.status(201).json({ task, message: "Task Created Succesfully" })
    } catch (err) {
        res.status(400).json({ error: err })
    }
})

// get user Task

router.get("/", auth, async (req, res) => {
    try {
        const tasks = await Task.find({ owner: req.user._id });
        res.status(200).json({ tasks, count: tasks.length })
    } catch (error) {
        res.status(500).json({ error: err })

    }
})

// fetch the task By id

router.get("/:id", auth, async (req, res) => {
    const taskId = req.params.id;
    try {
        const task = await Task.findOne({ _id: taskId, owner: req.user._id });
        if (!task) {
            return res.status(404).json({ message: "Task Not Found" })
        }
        res.status(200).json({ task, message: "Task Featched Succesfully" })
    } catch (err) {
        res.status(400).json({ error: err })
    }
})

// update a task by id - description , completed

router.patch("/:id", auth, async (req, res) => {
    const taskId = req.params.id;
    const updates = Object.keys(req.body);
    /**
     * 
    { description: "new descrapctions",
    complated: true,
    owner: "kuch bhi"
}   
*/

    const allowedUpdates = ["description", "compalted"];
    const isValidOperation = updates.every(updates => allowedUpdates.includes(updates))

    if (!isValidOperation) {
        return res.status(404).json({ message: "Invalud Updates" })
    }

    try {
        const task = await Task.findOne({
            _id: taskId,
            owner: req.user._id
        });

        if (!Task) {
            return res.status(404).json({ message: "Task is Not Found" })
        }

        updates.forEach(update => task[update] = req.body[update]);
        await task.save();

        res.json({ message: "Task update succesfully" })

    } catch (err) {
        res.status(400).json({ error: err })
    }
})


module.exports = router;