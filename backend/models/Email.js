const mongoose = require("mongoose");

// Define the structure of an email campaign
const emailSchema = new mongoose.Schema(
  {
    // Email subject
    subject: {
      type: String,
      required: true,
      trim: true,
    },

    // Email message
    body: {
      type: String,
      required: true,
    },

    // List of recipient email addresses
    recipients: {
      type: [String],
      required: true,
    },

    // Number of successfully sent emails
    sentCount: {
      type: Number,
      default: 0,
    },

    // Number of failed emails
    failedCount: {
      type: Number,
      default: 0,
    },

    // Addresses where sending failed
    failedEmails: {
      type: [String],
      default: [],
    },

    // Overall campaign status
    status: {
      type: String,
      enum: ["sent", "partial", "failed"],
      default: "failed",
    },

    // Date and time of campaign
    sentAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    // Automatically create createdAt and updatedAt
    timestamps: true,
  },
);

// Create Email model
const Email = mongoose.model("Email", emailSchema);

module.exports = Email;
