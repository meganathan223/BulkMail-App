import { Routes, Route, BrowserRouter } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import ComposeMail from "./pages/ComposeMail";
import EmailHistory from "./pages/EmailHistory";

function App() {
  return (
    <div className="min-h-screen">
      <BrowserRouter>
        <Navbar />

        <div className="flex">
          <Sidebar />

          {/* Main page content */}
          <main className="flex-1 p-6 min-w-0">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/compose" element={<ComposeMail />} />
              <Route path="/history" element={<EmailHistory />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
