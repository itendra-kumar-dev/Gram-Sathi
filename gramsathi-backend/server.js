const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

app.use(
  "/api/equipments",
  require(
    "./routes/equipmentRoutes"
  )
);

app.use(
  "/api/bookings",
  require(
    "./routes/bookingRoutes"
  )
);

app.use(
  "/api/dashboard",
  require(
    "./routes/dashboardRoutes"
  )
);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message:
      "GramSathi API Running 🚜",
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

const PORT =
  process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on port ${PORT}`
  );
});