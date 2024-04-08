const express = require("express");
const app = express();
const PORT = 8080;
const cors = require("cors");
const authRoutes = require("./Routes/authRoutes");

require("dotenv").config();
require("./db");

app.use(cors());
app.use(express.json());
app.use("/users", authRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "welcome to the APi"
    })
});

app.listen(PORT, () => {
    console.log(`app is listen at port at ${PORT}`)
})