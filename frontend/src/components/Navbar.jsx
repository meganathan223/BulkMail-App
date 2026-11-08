import { Bell, CircleUserRound } from "lucide-react";

function Navbar() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between">
      {/* Application title */}
      <h1 className="text-xl font-bold text-slate-800">BulkMail</h1>

      {/* Admin profile section */}
      <div className="flex items-center gap-4">
        <button className="text-slate-500 hover:text-blue-600">
          <Bell size={21} />
        </button>

        <div className="flex items-center gap-2">
          <CircleUserRound size={27} className="text-slate-600" />

          <span className="text-sm font-medium text-slate-700">Admin</span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
