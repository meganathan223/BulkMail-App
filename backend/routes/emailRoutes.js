const express = require("express");

// Import controller function
const { sendEmails } = require("../controllers/emailController");

// Create router
const router = express.Router();

// Define POST API route
router.post("/send", sendEmails);

module.exports = router;
