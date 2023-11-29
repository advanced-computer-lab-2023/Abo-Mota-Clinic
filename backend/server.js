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

// keeping track of online users
const activeUsers = {};

io.on("connection", (socket) => {
  console.log("Connection success");

  socket.on("user_connected", (userId) => {
    console.log("User connected:", userId);
    activeUsers[userId] = socket.id;
  });

  // text chat
  //----------------------
  // socket.on("join_room", (data) => {
  //   socket.join(data);

  //   console.log(`User with id ${socket.id} joined room ${data}`);
  // });

  socket.on("send_message", async (message) => {
    // add message to database
    // await Message.create(message);

    const { sender, recipient } = message;
    const senderSocketId = activeUsers[sender];
    const recipientSocketId = activeUsers[recipient];

    if(recipientSocketId) {
      io.to(senderSocketId).emit("receive_message", message);
      socket.to(recipientSocketId).emit("receive_message", message);
    }

    // forward to listening recipients
    // io.to(room).emit("receive_message", message);
  });

  //----------------------
  // video chat
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", (data) => {
    io.to(data.userToCall).emit("callUser", {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
});

const mongoose = require("mongoose");
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
