const express = require("express");
const { sendMessage, getMessages } = require("../controllers/chatController");
const router = express.Router();
require("dotenv").config();

const authorize = require("../middlewares/authorization")

router.get("/message", authorize, getMessages);

router.post("/message", authorize, sendMessage);

module.exports = router;
