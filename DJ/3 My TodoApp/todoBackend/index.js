const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const todoRoutes = require("./ROUTES/TodoRoute.js");
require("dotenv").config();
require("./db")
app.use(cors());
app.use(bodyParser.json());

app.use("/todosroutes", todoRoutes)


// coonect the frontend url = http://localhost:5173/
// app.use(cors({
//     origin: "http://localhost:5173"
// }));


app.get("/", (req, res) => {
    res.json({
        message: "api is working"
    })
})

app.listen(PORT, () => {
    console.log(`server is running at PORT at ${PORT}`)
})