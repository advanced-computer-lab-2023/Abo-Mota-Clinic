const express = require("express");
const { sendMessage, getMessages, getLoggedIn, sendEmailNotif, getNotifications, sendNotification, getRecipient, getContactedUsers } = require("../controllers/commonController");
const router = express.Router();
require("dotenv").config();

const authorize = require("../middlewares/authorization")

router.get("/message", authorize, getMessages);

router.post("/message", authorize, sendMessage);

router.get("/notifications", authorize, getNotifications);

router.post("/notification", authorize, sendNotification);

router.post('/send-email', authorize, sendEmailNotif);

router.get("/loggedIn", authorize, getLoggedIn);

router.get("/recipient", authorize, getRecipient);

router.get("/contacts", authorize, getContactedUsers);
module.exports = router;
