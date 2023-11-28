require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const webPush = require("web-push");
const bodyParser = require("body-parser");

// express app
const app = express();
const patientRouter = require("./routes/patient");
const doctorRouter = require("./routes/doctor");
const adminRouter = require("./routes/admin");
const guestRouter = require("./routes/guest");
const stripeRouter = require("./routes/stripe");
const serviceWorkerRouter = require("./routes/serviceWorker");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);


const MongoURI = process.env.MONGO_URI;

//Web Push config
const vapidPublicKey = process.env.VAPID_PUBLIC_KEY;
const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY;


webPush.setVapidDetails('mailto:abomotaClinic@mail.com', vapidPublicKey,vapidPrivateKey);


// mongo connection string
mongoose
  .connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

require("./models/index");

// middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(express.static(process.env.STATIC_DIR));
app.use(bodyParser.json());

// routes
app.use("/api/patient", patientRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/admin", adminRouter);
app.use("/api/guest", guestRouter);
app.use("/api/stripe", stripeRouter);
app.use("/api/serviceWorker", serviceWorkerRouter);




process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
// listen for requests
app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
