const express = require("express");
const { sendMessage, getMessages, getLoggedIn, getUser } = require("../controllers/commonController");
const router = express.Router();
require("dotenv").config();

const authorize = require("../middlewares/authorization")

router.get("/message", authorize, getMessages);

router.post("/message", authorize, sendMessage);

router.get("/loggedIn", authorize, getLoggedIn);

router.get("/user", getUser);
module.exports = router;
