import express from "express";
import Login from "./user.js";
const app = express();

const PORT = process.env.PORT || 8080;
app.use(express.json())
app.set("view engine", "ejs");

app.use(express.static("./public"))

// app.get("/", (req, res) => {
//     res.render("index")
// })



app.listen(PORT, () => {
    console.log(`app is listen at ${PORT}`)
})