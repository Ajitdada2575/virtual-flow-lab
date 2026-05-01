import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, CheckCircle, Activity, Calendar as CalendarIcon } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-blue-500" />
          <span className="text-xl font-bold font-sans">Lab Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-medium text-slate-700">John Doe</span>
          <Link to="/" className="text-sm text-slate-500 hover:text-slate-800">Logout</Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-8 px-6">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Welcome back, John!</h1>
            <p className="text-slate-600 mt-1">Here's your lab activity overview.</p>
          </div>
          <Link to="/experiment/book" className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium shadow-md transition">
            Book New Slot
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <StatCard title="Upcoming Bookings" value="2" icon={<CalendarIcon className="text-blue-500 h-6 w-6" />} color="blue" />
          <StatCard title="Experiments Completed" value="5" icon={<CheckCircle className="text-emerald-500 h-6 w-6" />} color="emerald" />
          <StatCard title="Total Lab Hours" value="12.5" icon={<Clock className="text-purple-500 h-6 w-6" />} color="purple" />
        </div>

        <h2 className="text-xl font-bold text-slate-800 mb-4">Your Next Slot</h2>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between mb-10 border-l-4 border-l-blue-500">
          <div>
            <h3 className="font-bold text-lg text-slate-800">Flow Control Experiment #1</h3>
            <p className="text-slate-500 mt-1 flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" /> Tomorrow, 10:00 AM - 11:00 AM
            </p>
          </div>
          <Link to="/experiment/live/1" className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg font-semibold transition">
            Enter Lab
          </Link>
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between">
    <div>
      <p className="text-slate-500 font-medium mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-slate-800">{value}</h3>
    </div>
    <div className={`p-3 rounded-lg bg-${color}-50`}>
      {icon}
    </div>
  </div>
);

export default Dashboard;
