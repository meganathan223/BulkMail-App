function StatusMessage({ type, message }) {
  // Don't display anything if there is no message
  if (!message) return null;

  // Choose styles depending on message type
  const styles =
    type === "success"
      ? "bg-green-50 text-green-700 border-green-200"
      : "bg-red-50 text-red-700 border-red-200";

  return (
    <div className={`border rounded-lg px-4 py-3 text-sm ${styles}`}>
      {message}
    </div>
  );
}

export default StatusMessage;
