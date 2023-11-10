const express = require("express");
const { config, createPaymentIntent } = require("../controllers/stripeController");
const router = express.Router();
require("dotenv").config();

const authorize = require("../middlewares/authorization")

router.get("/config", authorize, config);

router.post("/create-payment-intent", authorize, createPaymentIntent);

module.exports = router;
