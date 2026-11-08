import { NavLink } from "react-router-dom";
import { Mail, History, LayoutDashboard } from "lucide-react";

function Sidebar() {
  // Common styles for sidebar navigation links
  const linkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? "bg-blue-100 text-blue-700"
        : "text-slate-600 hover:bg-slate-100"
    }`;

  return (
    <aside className="w-60 min-h-screen bg-white border-r border-slate-200 p-4">
      {/* Sidebar heading */}
      <p className="text-xs font-semibold uppercase text-slate-700 mb-5 px-3">
        Menu
      </p>

      <nav className="space-y-2">
        {/* Dashboard navigation */}
        <NavLink to="/" className={linkStyle}>
          <LayoutDashboard size={19} />
          Dashboard
        </NavLink>

        {/* Compose mail navigation */}
        <NavLink to="/compose" className={linkStyle}>
          <Mail size={19} />
          Compose Mail
        </NavLink>

        {/* Email history navigation */}
        <NavLink to="/history" className={linkStyle}>
          <History size={19} />
          Email History
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
