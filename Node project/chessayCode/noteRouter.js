const express = require("express");
const {
  getNote,
  createNote,
  deleteNote,
  updateNote,
} = require("./controlers/noteControler");
const auth = require("./middleware/auth");
const notRouter = express.Router();

notRouter.get("/", auth, getNote);

notRouter.post("/", auth, createNote);

notRouter.delete("/:id", auth, deleteNote);

notRouter.put("/:id", auth, updateNote);

module.exports = notRouter;
