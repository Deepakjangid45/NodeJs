const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URL, {
    // new detabase banne k liye
    // dbName: process.env.DB_NAME
  })
  .then(() => {
    console.log(`connect to detabase`);
  })
  .catch((err) => {
    console.log(`error`);
  });
