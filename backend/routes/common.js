const express = require("express");
const { sendMessage, getMessages, getLoggedIn, getNotifications, sendNotification } = require("../controllers/commonController");
const router = express.Router();
require("dotenv").config();

const authorize = require("../middlewares/authorization")

router.get("/message", authorize, getMessages);

router.post("/message", authorize, sendMessage);

router.get("/notifications", authorize, getNotifications);

router.post("/notification", authorize, sendNotification);

router.get("/loggedIn", authorize, getLoggedIn);

module.exports = router;
