const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

dotenv.config();

console.log(
  "Cloud Name:",
  process.env.CLOUDINARY_CLOUD_NAME
);

console.log(
  "API Key:",
  process.env.CLOUDINARY_API_KEY
);

console.log(
  "Secret Exists:",
  !!process.env.CLOUDINARY_API_SECRET
);

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// Routes

app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

app.use(
  "/api/equipments",
  require("./routes/equipmentRoutes")
);

app.use(
  "/api/bookings",
  require("./routes/bookingRoutes")
);

app.use(
  "/api/dashboard",
  require("./routes/dashboardRoutes")
);

app.use(
  "/api/reviews",
  require("./routes/reviewRoutes")
);

// Home Route

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message:
      "GramSathi API Running 🚜",
  });
});

// 404 Route

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// Global Error Handler

app.use((err, req, res, next) => {
  console.log("GLOBAL ERROR:");
  console.log(err);

  res.status(500).json({
    success: false,
    message:
      err.message ||
      "Internal Server Error",
  });
});

// Start Server

const PORT =
  process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on port ${PORT}`
  );
});