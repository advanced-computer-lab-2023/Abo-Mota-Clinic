const express = require("express");
const { config, createPaymentIntent } = require("../controllers/stripeController");
const router = express.Router();
require("dotenv").config();

router.get("/config", config);

router.post("/create-payment-intent", createPaymentIntent);

module.exports = router;
