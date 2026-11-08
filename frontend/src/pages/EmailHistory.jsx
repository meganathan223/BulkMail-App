import { History } from "lucide-react";

function EmailHistory() {
  return (
    <section className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="flex items-center gap-3 mb-2">
        <History className="text-blue-600" size={24} />

        <h2 className="text-xl font-semibold text-slate-800">Email History</h2>
      </div>

      <p className="text-sm text-slate-500">
        View your previously sent emails and their statuses.
      </p>
    </section>
  );
}

export default EmailHistory;
