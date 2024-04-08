const express = require("express");
const router = express.Router();

const Todo = require("../MODELS/Todo");

router.get("/test", (req, res) => {
    res.json({
        message: "TODO routes api is working"
    })
})

router.post("/createtodo", async (req, res) => {
    try {
        const { title, description } = req.body
        const newTodo = new Todo({
            title, description
        })
        await newTodo.save();
        res.status(201).json({
            message: "todo create succesully"
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})


router.get("/getalltodos", async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(201).json({
            todos, message: "Todo fetch succesfully"
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})


router.get("/gettodos/:id", async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            res.status(400).json({
                message: "Todo not Found"
            })
        }
        res.status(201).json({
            todo, message: "Todo fetach succefully"
        })

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})


router.put("/updatetodo/:id", async (req, res) => {
    try {
        const { title, description, compllete } = req.body;
        const todo = await Todo.findByIdAndUpdate(req.params.id, {
            title, description, compllete
        }, { new: true });

        if (!todo) {
            res.status(400).json({
                message: "Todo not Found"
            })
        }
        res.status(201).json({
            todo, message: "Todo updtaed succefully"
        })

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})


router.delete("/deletetodo/:id", async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);

        if (!todo) {
            res.status(400).json({
                message: "Todo Not Found"
            })
        }
        res.status(201).json({
            message: "todo delete succesfully"
        })

    } catch (error) {
        res.status(500).json({
            message: err.message
        })
    }
})

module.exports = router;