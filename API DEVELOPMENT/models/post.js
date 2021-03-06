const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "title is must",
    // minlength: 4,
    // maxlength: 150,
  },
  body: {
    type: String,
    required: "body is must",
    // minlength: 4,
    // maxlength: 250,
  },
  updated: Date,
  photo: {
    data: Buffer,
    contentType: String,
  },
  postedBy: {
    type: ObjectId,
    ref: "User",
  },
  created: {
    type: Date,
    default: Date.now,
  },
  likes: [{ type: ObjectId, ref: "User" }],
  comments: [
    {
      text: String,
      created: { type: Date, default: Date.now },
      postedBy: { type: ObjectId, ref: "User" },
    },
  ],
});

module.exports = mongoose.model("Post", postSchema);
