const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./Views/userRoutes");
const chatRoutes = require("./Views/chatRoutes");
const messageRoutes = require("./Views/msgRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const { Socket } = require("socket.io");
dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log(`DB is connected`);
  })
  .catch(() => {
    console.log(`DB connection failed`);
  });

app.use(
  cors({
    origin: "*",
  })
);


app.use(express.json());

app.use(userRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, console.log("server is running"));
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
  pingTimeOut: 60000,
});
io.on("connection", (socket) => {
  console.log("socket.io connection is established");
  socket.on("setup", (user) => {
    socket.join(user?._id);
    socket.emit("connected");
  });
  socket.on("join chat", (room) => {
    socket.join(room);
  });
  socket.on("new message", (newMessageStatus) => {
    var chat = newMessageStatus.chat;
    if (!chat.users) {
      return console.log("chat.users not defined");
    }
    chat.users.forEach((user) => {
      if (user._id === newMessageStatus.sender._id) return;
      socket.in(user?._id).emit("message received", newMessageRecieved);
    });
  });
});
