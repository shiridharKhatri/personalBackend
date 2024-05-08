const mongoose = require("mongoose");
const moment = require("moment");

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  points: [{
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  }],
  image: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  publishedOn: {
    type: String,
    default: moment().format("MMMM Do YYYY"),
  },
  time: {
    type: String,
    default: moment().format("LT"),
  },
});

blogSchema.index({ title: "text", description: "text" });

module.exports = mongoose.model("Blogs", blogSchema);
