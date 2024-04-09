const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./Routers/userRouter");
const taskRoutes = require("./Routers/taskRouter");
const app = express();
require("dotenv").config();
require("./db");
const PORT = process.env.PORT;

// middleware
app.use(bodyParser());
// app.use(express.json());
// app.use(express.urlencoded({
//   extended: true
// }));

app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

// routes
app.get("/", (req, res) => {
  res.status(201).json({ message: "APi is working" });
});

// listen Port

app.listen(PORT, () => {
  console.log(`server is runnign at port ${PORT}`);
});
