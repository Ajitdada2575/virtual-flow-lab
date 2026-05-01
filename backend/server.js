const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/control", require("./routes/controlRoutes"));

// ✅ FIX HERE (match filename exactly)
app.use("/api/feedback", require("./routes/feedback"));  

app.use("/api/slots", require("./routes/slotRoutes"));

// Health Check
app.get("/", (req, res) => {
  res.send("🚀 Virtual Lab API Running...");
});

// Optional: Fix favicon error
app.get("/favicon.ico", (req, res) => res.status(204));

// Error Handler (GOOD PRACTICE)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});