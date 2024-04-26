const express = require("express");
const dotenv = require("dotenv");
//const connectDB = require("./config/db");
const cors = require("cors");
const socketIO = require("socket.io");

const app = express();
dotenv.config({ path: "./config/.enviro" });

// Connect to database
// connectDB();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // To accept JSON from frontend

// Default response for root endpoint
// app.get("/", (req, res) => {
//   res.send("API running successfully");
// });

// Import routes
//const userRoutes = require("./routes/");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const fileRoutes = require("./routes/fileRoutes");

// Use routes
//app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/files", fileRoutes);

require("./routes/auth.js")(app); // Authentication routes
require("./routes/google-oauth.js")(app); // Google OAuth routes

// Error handling middleware
// const { notFound, errorHandler } = require("./middleware/errorMiddleware");
// app.use(notFound);
// app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Set up Socket.IO
const io = socketIO(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room:" + room);
  });

  socket.on("new message", (newMessageReceived) => {
    const chat = newMessageReceived.chat;

    if (!chat.users) {
      return console.log("chat.users not defined");
    }

    chat.users.forEach((user) => {
      if (user._id === newMessageReceived.sender._id) {
        return;
      }

      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
