const express = require("express");
const app = express();
const PORT = 8080;
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./Routes/userRoutes");
const tastRoutes = require("./Routes/taskRoutes");
require("dotenv").config();
require("./db");

app.use(bodyParser.json());
app.use(cors());
app.use("/users", userRoutes);
app.use("/tasks", tastRoutes);



app.get("/", (req, res) => {
    res.json({
        message: "Task Manager API is Working"
    })
})

app.listen(PORT, () => {
    console.log(`app is succesfully Listen at PORT 8080`)
})