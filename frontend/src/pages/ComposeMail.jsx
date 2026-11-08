import { useState } from "react";

import { Send, RotateCcw, Users, Mail, X, CheckCircle } from "lucide-react";

import ExcelUpload from "../components/ExcelUpload";
import StatusMessage from "../components/StatusMessage";

function ComposeMail() {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [recipients, setRecipients] = useState([]);

  // Store success or error messages
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  // Control confirmation dialog visibility
  const [showConfirm, setShowConfirm] = useState(false);

  // Change this value to reset the Excel upload component
  const [uploadKey, setUploadKey] = useState(0);

  // Validate the form before showing confirmation
  const handleSubmit = (e) => {
    e.preventDefault();

    setStatus({ type: "", message: "" });

    if (!subject.trim()) {
      setStatus({
        type: "error",
        message: "Please enter an email subject.",
      });
      return;
    }

    if (!body.trim()) {
      setStatus({
        type: "error",
        message: "Please enter an email message.",
      });
      return;
    }

    if (recipients.length === 0) {
      setStatus({
        type: "error",
        message: "Please upload an Excel file with valid recipients.",
      });
      return;
    }

    // All validations passed, show confirmation
    setShowConfirm(true);
  };

  // Prepare the data after confirmation
  const confirmSend = () => {
    // Create the object that will be sent to Express API later
    const emailData = {
      subject: subject.trim(),
      body: body.trim(),
      recipients: recipients,
    };

    // For now, display data in browser console
    console.log("Email Data:", emailData);

    setShowConfirm(false);

    // Actual email sending will be added in Step 2 and Step 4
    setStatus({
      type: "success",
      message: `Your email is validated and ready for ${recipients.length} recipients. Backend sending is not connected yet.`,
    });
  };

  // Reset the entire form
  const handleReset = () => {
    setSubject("");
    setBody("");
    setRecipients([]);

    setStatus({
      type: "",
      message: "",
    });

    setShowConfirm(false);

    // Reset ExcelUpload's internal file and preview state
    setUploadKey((previous) => previous + 1);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Page heading */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Compose Mail</h2>

        <p className="text-sm text-slate-500 mt-1">
          Prepare and review emails for multiple recipients.
        </p>
      </div>

      {/* Main email form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 space-y-6"
      >
        {/* Email subject */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Email Subject
          </label>

          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter email subject"
            className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Excel upload component */}
        <ExcelUpload
          key={uploadKey}
          recipients={recipients}
          setRecipients={setRecipients}
        />

        {/* Recipient summary */}
        <div className="flex items-center justify-between bg-blue-50 border border-blue-100 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Users className="text-blue-600" size={22} />

            <div>
              <p className="text-sm font-medium text-slate-700">
                Ready Recipients
              </p>

              <p className="text-xs text-slate-500">Valid email addresses</p>
            </div>
          </div>

          <span className="text-xl font-bold text-blue-700">
            {recipients.length}
          </span>
        </div>

        {/* Email body */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Email Message
          </label>

          <textarea
            rows="7"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write your email message here..."
            className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm outline-none resize-y focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <p className="text-xs text-slate-400 mt-2">
            {body.length} characters
          </p>
        </div>

        {/* Success or error message */}
        <StatusMessage type={status.type} message={status.message} />

        {/* Form action buttons */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center justify-center gap-2 border border-slate-300 text-slate-600 px-5 py-3 rounded-lg text-sm hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <RotateCcw size={17} />
            Reset Form
          </button>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 cursor-pointer bg-blue-600 text-white px-5 py-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            <Send size={17} />
            Send
          </button>
        </div>
      </form>

      {/* Confirmation dialog */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
            className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl space-y-5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="text-blue-600" size={23} />

                <h3
                  id="confirm-title"
                  className="text-lg font-semibold text-slate-800"
                >
                  Review Email
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="text-slate-400 hover:text-slate-700"
                aria-label="Close confirmation"
              >
                <X size={20} />
              </button>
            </div>

            <div className="bg-slate-50 rounded-lg p-4 space-y-3">
              <div>
                <p className="text-xs text-slate-500">Subject</p>

                <p className="text-sm font-medium text-slate-800 break-words">
                  {subject}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">Recipients</p>

                <p className="text-sm font-medium text-slate-800">
                  {recipients.length} recipients
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">Message preview</p>

                <p className="text-sm text-slate-700 whitespace-pre-wrap break-words">
                  {body}
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-500">
              Review your information before proceeding.
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="flex-1 border border-slate-300 text-slate-600 py-3 rounded-lg text-sm"
              >
                Go Back
              </button>

              <button
                type="button"
                onClick={confirmSend}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-blue-700"
              >
                <CheckCircle size={17} />
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ComposeMail;
