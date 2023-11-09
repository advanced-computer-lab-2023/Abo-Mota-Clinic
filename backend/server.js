require("dotenv").config();
const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');


// express app
const app = express();
const patientRouter = require("./routes/patient");
const doctorRouter = require("./routes/doctor");
const adminRouter = require("./routes/admin");
const guestRouter = require("./routes/guest");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
// const bodyParser = require("body-parser");
const MongoURI = process.env.MONGO_URI;

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
app.use(cors({origin: 'http://localhost:3000'}));
app.use(cookieParser());


// routes
app.use("/api/patient", patientRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/admin", adminRouter);
app.use("/api/guest", guestRouter);


// listen for requests
app.listen(process.env.PORT, () => {
	console.log(`listening on port ${process.env.PORT}`);
});
