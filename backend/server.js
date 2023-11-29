require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const bodyParser = require("body-parser");

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
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  },
});

const activeUsers = {};



io.on("connection", (socket) => {
  console.log("Connection success");

  socket.on("user_connected", (userId) => {
    console.log("User connected:", userId);
    activeUsers[userId] = socket.id;
  });

  //----------Notifications------------

  socket.on("send_notification", ({sender, receiver, content}) => {
    const receiverSocket = activeUsers[receiver]; // get receiver socket id from activeUsers list
    socket.to(receiverSocket).emit("receive_notification", {sender, content});
  });

  //------------------------------------
  // text chat
  socket.on("join_room", (data) => {
    socket.join(data);

    console.log(`User with id ${socket.id} joined room ${data}`);
  });

  socket.on("send_message", (data) => {
    // add message to database
    const { room, ...message } = data;

    // forward to listening recipients
    socket.to(room).emit("receive_message", message);
  });

  //----------------------
  // video chat
  // socket.emit("me", socket.id);

  socket.on("join_room_video", ({ room }) => {
    socket.join(room);
    console.log(`User with id ${socket.id} joined VIDEO room ${room}`);
  });

  socket.on("callEnded", () => {
    socket.broadcast.emit("othersCallEnded");
  });

  socket.on("callUser", (data) => {
    const { room } = data;
    console.log("call user SERVER");
    socket.to(room).emit("receiveCall", {
      signal: data.signalData,
      from: data.from,
    });
  });

  socket.on("answerCall", (data) => {
    const { room } = data;
    socket.to(room).emit("callAccepted", data.signal);
  });
});

const mongoose = require("mongoose");
const { sendMessage } = require("./controllers/commonController");
mongoose.set("strictQuery", false);


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
app.use(bodyParser.json());

// routes
app.use("/api/patient", patientRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/admin", adminRouter);
app.use("/api/guest", guestRouter);
app.use("/api/stripe", stripeRouter);
app.use("/api/common", commonRouter);




process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
// listen for requests
server.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
