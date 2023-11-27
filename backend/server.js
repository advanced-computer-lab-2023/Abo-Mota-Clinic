require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");


// express app
const app = express();
const patientRouter = require("./routes/patient");
const doctorRouter = require("./routes/doctor");
const adminRouter = require("./routes/admin");
const guestRouter = require("./routes/guest");
const stripeRouter = require("./routes/stripe");
const commonRouter = require("./routes/common");

// added for socket.io
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"]
  }
});

io.on("connection", (socket) => {
  console.log("Connection success");

  socket.on("join_room", (data) => {
    socket.join(data);

    console.log(`User with id ${socket.id} joined room ${data}`)
  });

  socket.on("send_message", (data) => {
    // add message to database
    const { room, ...message } = data;

    // forward to listening recipients
    io.to(room).emit("receive_message", message);

  })
});

const mongoose = require("mongoose");
const { sendMessage } = require("./controllers/commonController");
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
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(express.static(process.env.STATIC_DIR));

// routes
app.use("/api/patient", patientRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/admin", adminRouter);
app.use("/api/guest", guestRouter);
app.use("/api/stripe", stripeRouter);
app.use("/api/common", commonRouter);
//handle uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.post("/sdjfjkdsvjkjn", upload.single("file"), (req, res) => {
  res.send("File uploaded");
});

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
// listen for requests
server.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});