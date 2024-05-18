const mongoose = require("mongoose");
const messageSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
});
module.exports = mongoose.model("Messages", messageSchema);
