const express = require("express");
const app = express();
const router = require("./userRoutes.js");
const notRouter = require("./noteRouter.js");
const mongoose = require("mongoose");

app.use(express.json());
app.use("/user", router);
app.use("/note", notRouter);

app.use((req, res, next) => {
  console.log("http method" + req.method + "url" + req.url);
  next();
});

app.get("/", (req, res) => {
  res.send("hello");
});

mongoose
  .connect("mongodb+srv://jangidwinter:jangid@deepak.5w3lnf5.mongodb.net/")
  .then(() => {
    app.listen(8080, () => {
      console.log("app is listen ");
    });
  })
  .then((error) => {
    console.log(error);
  });
