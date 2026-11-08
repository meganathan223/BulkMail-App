import { Mail, Send, Users, Clock } from "lucide-react";

function Dashboard() {
  // Temporary sample statistics
  // Later, we'll fetch these values from MongoDB through our backend
  const stats = [
    {
      title: "Total Emails",
      value: "120",
      icon: Mail,
    },
    {
      title: "Sent Emails",
      value: "95",
      icon: Send,
    },
    {
      title: "Recipients",
      value: "350",
      icon: Users,
    },
    {
      title: "Pending",
      value: "25",
      icon: Clock,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Dashboard heading */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Dashboard</h2>

        <p className="text-sm text-slate-500 mt-1">
          Welcome back! Here's your email overview.
        </p>
      </div>

      {/* Statistics cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="bg-white border border-slate-200 rounded-xl p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">{item.title}</p>

                <Icon size={21} className="text-blue-600" />
              </div>

              <h3 className="text-2xl font-bold text-slate-800 mt-3">
                {item.value}
              </h3>
            </div>
          );
        })}
      </div>

      {/* Recent activity placeholder */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-slate-800">
          Recent Activity
        </h3>

        <p className="text-sm text-slate-500 mt-2">
          Your recent email activities will appear here.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
