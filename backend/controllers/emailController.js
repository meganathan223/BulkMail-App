const { sendBulkEmails } = require("../services/mailService");
const Email = require("../models/Email");

// POST: Send bulk emails and save campaign history
const sendEmails = async (req, res) => {
  try {
    // Get email information from React
    const { subject, body, recipients } = req.body;

    // Validate subject
    if (typeof subject !== "string" || !subject.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email subject is required",
      });
    }

    // Validate message
    if (typeof body !== "string" || !body.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email message is required",
      });
    }

    // Validate recipients
    if (!Array.isArray(recipients) || recipients.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one recipient is required",
      });
    }

    // Limit the number of recipients per request
    if (recipients.length > 50) {
      return res.status(400).json({
        success: false,
        message: "Maximum 50 recipients allowed per request",
      });
    }

    // Clean and remove duplicate email addresses
    const cleanedRecipients = [
      ...new Set(
        recipients.map((email) =>
          typeof email === "string" ? email.trim().toLowerCase() : "",
        ),
      ),
    ];

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (cleanedRecipients.some((email) => !emailPattern.test(email))) {
      return res.status(400).json({
        success: false,
        message: "One or more recipient email addresses are invalid",
      });
    }

    // Step 1: Send emails using Nodemailer
    const result = await sendBulkEmails({
      subject: subject.trim(),
      body: body.trim(),
      recipients: cleanedRecipients,
    });

    // Step 2: Determine campaign status
    let status = "failed";

    if (result.sentCount === cleanedRecipients.length) {
      status = "sent";
    } else if (result.sentCount > 0) {
      status = "partial";
    }

    // Step 3: Save campaign details in MongoDB
    let savedCampaign = null;

    try {
      savedCampaign = await Email.create({
        subject: subject.trim(),
        body: body.trim(),
        recipients: cleanedRecipients,
        sentCount: result.sentCount,
        failedCount: result.failedCount,
        failedEmails: result.failedEmails,
        status,
        sentAt: new Date(),
      });
    } catch (dbError) {
      // Emails may already have been sent, so don't ask the user to resend
      console.error("Campaign history save failed:", dbError.message);

      return res.status(200).json({
        success: result.sentCount > 0,
        historySaved: false,
        message:
          "Email sending finished, but campaign history could not be saved.",
        sentCount: result.sentCount,
        failedCount: result.failedCount,
        failedEmails: result.failedEmails,
        status,
      });
    }

    // Step 4: Return sending and database results
    return res.status(200).json({
      success: result.sentCount > 0,
      historySaved: true,
      message: "Email sending process completed",
      campaignId: savedCampaign._id,
      sentCount: result.sentCount,
      failedCount: result.failedCount,
      failedEmails: result.failedEmails,
      status,
    });
  } catch (error) {
    console.error("Email sending error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to process email sending",
    });
  }
};

// GET: Fetch previous email campaigns
const getEmailHistory = async (req, res) => {
  try {
    // Get the latest 50 campaigns from MongoDB
    const emails = await Email.find().sort({ createdAt: -1 }).limit(50);

    res.status(200).json({
      success: true,
      count: emails.length,
      emails,
    });
  } catch (error) {
    console.error("Email history error:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to fetch email history",
    });
  }
};

module.exports = {
  sendEmails,
  getEmailHistory,
};
