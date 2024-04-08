const monggose = require("mongoose");
require("dotenv").config();
monggose.connect(process.env.MONGO_URL, {
    dbName: process.env.DB_NAME,
}).then(() => {
    console.log("connect to data base")
}).catch((error) => {
    console.log("error is somting database", error)
})