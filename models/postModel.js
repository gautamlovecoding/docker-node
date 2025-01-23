const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Post mush have title"],
  },
  body: {
    type: String,
    required: [true, "Post mush have body"],
  }
});

module.exports = mongoose.model("Post", postSchema);
