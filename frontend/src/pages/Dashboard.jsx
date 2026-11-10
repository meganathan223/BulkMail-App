import { Link } from "react-router-dom";
import { Send, Mail, ArrowRight, Zap } from "lucide-react";

const Dashboard = () => {
  return (
    <main className="min-h-screen bg-slate-50 p-5 md:p-8">
      {/* Welcome section */}
      <section className="mb-8">
        <p className="text-sm font-medium text-blue-600 mb-2">
          WELCOME TO BULKMAIL
        </p>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
          Your email workspace
        </h1>
        <p className="text-slate-500 mt-2">
          Manage and send bulk emails with a simple, organized workflow.
        </p>
      </section>

      {/* Hero section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-700 p-7 md:p-10 text-white mb-10">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium mb-5">
            <Zap size={14} />
            Simple email campaign management
          </span>

          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Send emails smarter,
            <br />
            not harder.
          </h2>

          <p className="text-blue-100 mt-4 leading-relaxed max-w-lg">
            Import recipients, compose your message, and send bulk emails from
            one simple workspace.
          </p>

          <Link
            to="/compose"
            className="inline-flex items-center gap-2 mt-7 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-50 transition"
          >
            <Mail size={17} />
            Compose New Email
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Decorative icon */}
        <div className="absolute -right-8 -bottom-16 opacity-10">
          <Send size={250} />
        </div>
      </section>

      {/* Bottom navigation */}
      <section className="rounded-xl border border-slate-200 bg-white p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-semibold text-slate-800">
            Ready to start your next campaign?
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Create a new email or review your previous campaigns.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/history"
            className="px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50 transition"
          >
            View History
          </Link>

          <Link
            to="/compose"
            className="px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
          >
            Compose Email
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
