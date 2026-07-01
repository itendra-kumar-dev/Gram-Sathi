const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

// Load Environment Variables
dotenv.config();

// Check Required Environment Variables
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is missing in .env");
}

// Connect Database
connectDB();

const app = express();

// ============================
// Middlewares
// ============================

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// ============================
// API Routes
// ============================

// Authentication
app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

// Equipment
app.use(
  "/api/equipments",
  require("./routes/equipmentRoutes")
);

// Bookings
app.use(
  "/api/bookings",
  require("./routes/bookingRoutes")
);

// Dashboard
app.use(
  "/api/dashboard",
  require("./routes/dashboardRoutes")
);

// Reviews
app.use(
  "/api/reviews",
  require("./routes/reviewRoutes")
);

// AI Routes
app.use(
  "/api/ai",
  require("./routes/aiRoutes")
);

// ============================
// Home Route
// ============================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚜 Welcome to GramSathi API",
  });
});

// ============================
// 404 Route
// ============================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// ============================
// Global Error Handler
// ============================

app.use((err, req, res, next) => {
  console.error("Global Error:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ============================
// Start Server
// ============================

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});