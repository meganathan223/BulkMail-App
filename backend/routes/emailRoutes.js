const express = require("express");

const {
  sendEmails,
  getEmailHistory,
} = require("../controllers/emailController");

const router = express.Router();

// GET: Fetch email campaign history
router.get("/history", getEmailHistory);

// POST: Send bulk emails
router.post("/send", sendEmails);

module.exports = router;
