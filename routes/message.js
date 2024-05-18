const express = require("express");
const Message = require("../models/Message");
const sendMessage = require("../mail/mail");
const routes = express.Router();
routes.post("/send", async (req, res) => {
  try {
    const { email, message } = req.body;
    if (email === "" || message === "") {
      res.status(400).json({ success: false, msg: "Fields must not be empty" });
    } else {
      sendMessage(email, message);
      await Message.create({
        email,
        message,
      });
      res
        .status(200)
        .json({ success: true, msg: "Thankyou! Message sended successfully!" });
    }
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
});
routes.get("/fetch", async (req, res) => {
  try {
    const message = await Message.find();
    if (!message) {
      res.status(404).json({ success: false, msg: "No message found!" });
    } else {
      res.status(200).json({ success: true, length:message.length, message });
    }
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
});
module.exports = routes;
