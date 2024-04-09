const express = require("express");
const Task = require("../Models/Task");
const auth = require("../Middleware/auth");
const router = express.Router();

router.get("/test", (req, res) => {
  res.json({ message: "task router are working", user: req.user });
});

//crete user

router.post("/", auth, async (req, res) => {
  try {
    // owner req.user._id
    const task = new Task({ ...req.body, owner: req.user._id });
    await task.save();
    res.status(201).json({ task, message: "task crete successfully" });
  } catch (error) {
    res.status(400).send({ error: err });
  }
});

// get user task
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user._id });
    res.status(200).json({
      tasks,
      count: tasks.length,
      message: "Task Fetched successfull",
    });
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

//fetch & find by id

router.get("/:id", auth, async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await Task.findOne({ _id: taskId, owner: req.user._id });
    if (!task) {
      res.status(404).json({ message: "task not found" });
    }
    res.status(200).json({ task, message: "task fetched successfully" });
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

// update a task by id   -   description , completed

// router.patch("/:id", auth, async (req, res) => {

// });

// delete a task by id

router.delete("/:id", auth, async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await Task.findOneAndDelete({
      _id: taskId,
      owner: req.user._id,
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ task, message: "Task Deleted Successfully" });
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

module.exports = router;
