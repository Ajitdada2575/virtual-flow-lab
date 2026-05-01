import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Activity, ArrowLeft } from 'lucide-react';

const ExperimentLayout = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <header className="bg-slate-950 border-b border-slate-800 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Activity className="h-6 w-6 text-emerald-400" />
          <span className="text-xl font-bold font-sans tracking-wide">Live Control Panel</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1.5 rounded-full text-slate-300 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            Live
          </div>
          <Link to="/dashboard" className="text-slate-400 hover:text-white flex items-center text-sm font-medium transition">
            <ArrowLeft className="h-4 w-4 mr-1" /> Exit Lab
          </Link>
        </div>
      </header>
      
      <main className="flex-1 flex overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default ExperimentLayout;
