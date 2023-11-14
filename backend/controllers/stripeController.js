const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

const createPaymentIntent = async (req, res) => {
  try {
    const { beneficiary, amount } = req.body;

    console.log(req.body);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(100*amount),
      currency: "usd",
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const config = (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
};

module.exports = {
  createPaymentIntent,
  config,
};
