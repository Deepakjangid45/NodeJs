const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL, {
    dbName: "todoApp",
})
    .then(() => {
        console.log("Monggose Connecated")
    })
    .catch((err) => {
        console.log("Monggose Connecated Failed", err)
    })