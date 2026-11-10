import { useState } from "react";
import * as XLSX from "xlsx";

import {
  FileSpreadsheet,
  Upload,
  X,
  Users,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

function ExcelUpload({ recipients, setRecipients }) {
  const [fileName, setFileName] = useState("");
  const [message, setMessage] = useState("");
  const [invalidEmails, setInvalidEmails] = useState([]);

  // Check whether an email address has a valid format
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Handle Excel file selection and reading
  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Allow only Excel files
    const extension = file.name.split(".").pop().toLowerCase();

    if (!["xlsx", "xls"].includes(extension)) {
      setMessage("Please upload an Excel file.");
      e.target.value = "";
      return;
    }

    try {
      // Read the uploaded file as binary data
      const data = await file.arrayBuffer();

      // Convert binary data into an Excel workbook
      const workbook = XLSX.read(data, { type: "array" });

      // Get the first worksheet from the workbook
      const firstSheet = workbook.SheetNames[0];

      if (!firstSheet) {
        throw new Error("The Excel file contains no worksheets.");
      }

      const worksheet = workbook.Sheets[firstSheet];

      // Convert worksheet rows into JavaScript objects
      const rows = XLSX.utils.sheet_to_json(worksheet, {
        defval: "",
      });

      if (rows.length === 0) {
        throw new Error("The Excel sheet is empty.");
      }

      // Find the Email column, ignoring uppercase/lowercase differences
      const emailColumn = Object.keys(rows[0]).find(
        (key) => key.trim().toLowerCase() === "email",
      );

      if (!emailColumn) {
        throw new Error(
          "Email column not found. Please use 'Email' as the heading.",
        );
      }

      // Extract email values from every row
      const extractedEmails = rows
        .map((row) => String(row[emailColumn]).trim().toLowerCase())
        .filter((email) => email !== "");

      // Separate valid and invalid email addresses
      const validEmails = extractedEmails.filter(validateEmail);

      const invalid = extractedEmails.filter((email) => !validateEmail(email));

      // Remove duplicate email addresses
      const uniqueEmails = [...new Set(validEmails)];

      // Update React recipient state
      setRecipients(uniqueEmails);

      // Store invalid addresses for preview
      setInvalidEmails(invalid);

      // Store uploaded filename
      setFileName(file.name);

      // Display import summary
      setMessage(
        `${uniqueEmails.length} valid recipients imported successfully.`,
      );
    } catch (error) {
      // Handle Excel reading or validation errors
      setMessage(error.message);
      setRecipients([]);
      setInvalidEmails([]);
      setFileName("");
    }
  };

  // Remove an individual recipient
  const removeRecipient = (emailToRemove) => {
    setRecipients(recipients.filter((email) => email !== emailToRemove));
  };

  // Remove the uploaded file and its recipient data
  const removeFile = () => {
    setFileName("");
    setMessage("");
    setInvalidEmails([]);
    setRecipients([]);

    // Reset the file input so the same file can be selected again
    document.getElementById("excelFile").value = "";
  };

  return (
    <div className="space-y-4">
      {/* Upload section heading */}
      <div>
        <label className="block text-sm font-medium text-slate-700">
          Import Recipients
        </label>

        <p className="text-xs text-slate-500 mt-1">
          Upload an Excel file containing an Email column.
        </p>
      </div>

      {/* Excel upload area */}
      {!fileName ? (
        <label
          htmlFor="excelFile"
          className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-xl p-8 cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 transition-colors"
        >
          <FileSpreadsheet size={38} className="text-green-600 mb-3" />

          <p className="text-sm font-medium text-slate-700">
            Click to upload Excel file
          </p>

          <p className="text-xs text-slate-500 mt-2">
            Supported formats: .xlsx, .xls
          </p>

          <div className="mt-4 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
            <Upload size={16} />
            Choose File
          </div>

          <input
            id="excelFile"
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      ) : (
        /* Display selected Excel file */
        <div className="flex items-center justify-between border border-green-200 bg-green-50 rounded-xl p-4">
          <div className="flex items-center gap-3 min-w-0">
            <FileSpreadsheet className="text-green-600 shrink-0" size={28} />

            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-700 truncate">
                {fileName}
              </p>

              <p className="text-xs text-green-700">
                File imported successfully
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={removeFile}
            className="text-slate-500 hover:text-red-600 cursor-pointer"
            aria-label="Remove Excel file"
          >
            <X size={19} />
          </button>
        </div>
      )}

      {/* Import message */}
      {message && <p className="text-sm text-slate-600">{message}</p>}

      {/* Recipient summary */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
          <Users size={21} className="text-blue-600 mb-2" />

          <p className="text-xl font-bold text-slate-800">
            {recipients.length}
          </p>

          <p className="text-xs text-slate-500">Valid recipients</p>
        </div>

        <div className="bg-red-50 border border-red-100 rounded-lg p-4">
          <AlertCircle size={21} className="text-red-600 mb-2" />

          <p className="text-xl font-bold text-slate-800">
            {invalidEmails.length}
          </p>

          <p className="text-xs text-slate-500">Invalid entries</p>
        </div>
      </div>

      {/* Valid recipient preview */}
      {recipients.length > 0 && (
        <div className="border border-slate-200 rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle size={18} className="text-green-600" />

            <h3 className="text-sm font-semibold text-slate-700">
              Valid Recipients
            </h3>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {recipients.map((email) => (
              <div
                key={email}
                className="flex justify-between items-center bg-slate-50 rounded-md px-3 py-2"
              >
                <span className="text-sm text-slate-600 break-all">
                  {email}
                </span>

                <button
                  type="button"
                  onClick={() => removeRecipient(email)}
                  className="text-slate-400 hover:text-red-600 ml-2 shrink-0 cursor-pointer"
                  aria-label={`Remove ${email}`}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Invalid recipient preview */}
      {invalidEmails.length > 0 && (
        <div className="border border-red-200 bg-red-50 rounded-lg p-4 space-y-2">
          <h3 className="text-sm font-semibold text-red-700">
            Invalid Email Entries
          </h3>

          {invalidEmails.map((email, index) => (
            <p
              key={`${email}-${index}`}
              className="text-sm text-red-600 break-all"
            >
              {email}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default ExcelUpload;
