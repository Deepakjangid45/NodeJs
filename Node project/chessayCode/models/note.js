const mongoose = require("mongoose");
const noteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    uderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      return: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
