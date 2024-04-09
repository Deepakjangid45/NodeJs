const monggose = require("mongoose");
require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME;

monggose
  .connect(MONGO_URL, {
    dbName: DB_NAME,
  })
  .then(() => {
    console.log(`connect to detaBase`);
  })
  .catch((error) => {
    console.log(`error is :`, error);
  });
