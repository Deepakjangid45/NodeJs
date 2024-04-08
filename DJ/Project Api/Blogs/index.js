const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const PORT = 8080;
const authRoutes = require("./Router/auth.js")
require("./db.js");
const User = require("./Models/userSchema.js");

//.2
app.use(bodyParser.json());
app.use(cors());
app.use("/auth", authRoutes);
app.use(cookieParser())



app.listen(PORT, () => {
    console.log(`server is running at Port ${PORT}`)
})