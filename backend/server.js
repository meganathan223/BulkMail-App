const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import email routes
const emailRoutes = require("./routes/emailRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware: Allow frontend requests
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  }),
);

// Middleware: Parse incoming JSON data
app.use(express.json());

// Default test route
app.get("/", (req, res) => {
  res.json({
    message: "Bulk Mail API is running",
  });
});

// Register email routes
app.use("/api/emails", emailRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
