const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// load env
dotenv.config();

// connect database
connectDB();

const app = express();

app.get("/ping", (req, res) => {
  res.send(`pong - Server Time: ${new Date().toISOString()}`);
});

// middleware
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:3000",
      "http://127.0.0.1:3000"
    ],
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// routes
const authRoutes = require("./routes/authRoutes");
const templateRoutes = require("./routes/templateRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/templates", templateRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API running on 8000 🚀");
});

// server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});