const { sendBulkEmails } = require("../services/mailService");

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

    // Keep the initial test batch small
    if (recipients.length > 50) {
      return res.status(400).json({
        success: false,
        message: "Maximum 50 recipients allowed per request",
      });
    }

    // Validate email address format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const cleanedRecipients = [
      ...new Set(
        recipients.map((email) =>
          typeof email === "string" ? email.trim().toLowerCase() : "",
        ),
      ),
    ];

    if (cleanedRecipients.some((email) => !emailPattern.test(email))) {
      return res.status(400).json({
        success: false,
        message: "One or more recipient email addresses are invalid",
      });
    }

    // Send emails through Nodemailer
    const result = await sendBulkEmails({
      subject: subject.trim(),
      body: body.trim(),
      recipients: cleanedRecipients,
    });

    // Return sending results
    res.status(200).json({
      success: result.sentCount > 0,
      message: "Email sending process completed",
      sentCount: result.sentCount,
      failedCount: result.failedCount,
      failedEmails: result.failedEmails,
    });
  } catch (error) {
    console.error("Email sending error:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to process email sending",
    });
  }
};

module.exports = { sendEmails };
