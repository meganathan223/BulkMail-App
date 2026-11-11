const getBrevoClient = require("../config/brevo");

// Send email to multiple recipients individually
const sendBulkEmails = async ({ subject, body, recipients }) => {
  const sentEmails = [];
  const failedEmails = [];

  // Initialize Brevo client
  const brevo = await getBrevoClient();

  // Process one recipient at a time
  for (const recipient of recipients) {
    try {
      // Send email using Brevo API
      const result = await brevo.transactionalEmails.sendTransacEmail({
        sender: {
          name: "BulkMail",
          email: process.env.BREVO_FROM_EMAIL,
        },

        // Brevo expects recipients as objects
        to: [{ email: recipient }],

        subject: subject,
        textContent: body,
      });

      // Store successfully accepted email details
      sentEmails.push({
        email: recipient,
        messageId: result.messageId,
      });
    } catch (error) {
      // Record recipient if sending fails
      console.error(`Failed to send to ${recipient}:`, error.message);

      failedEmails.push(recipient);
    }
  }

  // Return sending results
  return {
    sentCount: sentEmails.length,
    failedCount: failedEmails.length,
    failedEmails,
  };
};

module.exports = { sendBulkEmails };
