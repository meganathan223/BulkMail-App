const transporter = require("../config/mailTransport");

// Send email to multiple recipients individually
const sendBulkEmails = async ({ subject, body, recipients }) => {
  const sentEmails = [];
  const failedEmails = [];
  console.log("subject", recipients, subject);
  // Process one recipient at a time
  for (const recipient of recipients) {
    try {
      // Send email using Nodemailer
      const info = await transporter.sendMail({
        from: `"Bulk Mail App" <${process.env.EMAIL_USER}>`,
        to: recipient,
        subject: subject,
        text: body,
      });
      console.log("infor", info);
      sentEmails.push({
        email: recipient,
        messageId: info.messageId,
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
