const getBrevoClient = async () => {
  // Import Brevo SDK dynamically because our backend uses CommonJS
  const { BrevoClient } = await import("@getbrevo/brevo");

  // Connect to Brevo using our API key
  const brevo = new BrevoClient({
    apiKey: process.env.BREVO_API_KEY,
  });

  return brevo;
};

module.exports = getBrevoClient;
