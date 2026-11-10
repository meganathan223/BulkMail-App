import { useEffect, useState } from "react";
import axios from "axios";

const EmailHistory = () => {
  // Store campaign history
  const [emails, setEmails] = useState([]);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Error state
  const [error, setError] = useState("");

  // Fetch history when component loads
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/emails/history`,
        );

        setEmails(response.data.emails);
      } catch (error) {
        console.error("History error:", error);

        setError("Unable to load email history.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  // Loading UI
  if (loading) {
    return <p className="p-6">Loading email history...</p>;
  }

  // Error UI
  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Email History</h1>

      {emails.length === 0 ? (
        <p className="text-gray-500">No email campaigns found.</p>
      ) : (
        <div className="space-y-4">
          {emails.map((email) => (
            <div
              key={email._id}
              className="bg-white border rounded-xl p-5 shadow-sm"
            >
              <h2 className="font-semibold text-lg">{email.subject}</h2>

              <p className="text-sm text-gray-500 mt-2">
                Recipients: {email.recipients.length}
              </p>

              <p className="text-sm text-green-600">Sent: {email.sentCount}</p>

              <p className="text-sm text-red-500">
                Failed: {email.failedCount}
              </p>

              <span className="inline-block mt-3 text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                {email.status}
              </span>

              <p className="text-xs text-gray-400 mt-3">
                {new Date(email.sentAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmailHistory;
