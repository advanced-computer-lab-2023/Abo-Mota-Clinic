const express = require("express");
const { config, createPaymentIntent } = require("../controllers/stripeController");
const router = express.Router();
require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

router.get("/config", config);

router.post("/create-payment-intent", createPaymentIntent);

module.exports = router;
