import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, BookOpen, Calendar, Settings } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-6 py-4 flex items-center justify-between border-b border-slate-200 bg-white">
        <div className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-blue-500" />
          <span className="text-xl font-bold font-sans">Virtual Flow Lab</span>
        </div>
        <nav className="flex items-center gap-4">
          <Link to="/login" className="text-slate-600 hover:text-blue-500 font-medium">Login</Link>
          <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium transition-colors">
            Get Started
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        <section className="py-20 px-6 max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
            Remotely Control <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-500">Real Hardware</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            A state-of-the-art virtual lab platform for Electronics and Telecommunication engineering students. Book slots, run experiments, and analyze real-time data from anywhere.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg transition shadow-lg shadow-blue-500/30">
              Start Learning
            </Link>
            <a href="#features" className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-3 rounded-lg font-semibold text-lg transition">
              Explore Features
            </a>
          </div>
        </section>

        <section id="features" className="py-20 bg-white border-t border-slate-200">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-16">Key Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<BookOpen className="h-10 w-10 text-emerald-500" />}
                title="Learning Modules"
                description="Access theory, procedures, and safety instructions before starting your experiment."
              />
              <FeatureCard 
                icon={<Calendar className="h-10 w-10 text-blue-500" />}
                title="Slot Booking"
                description="Schedule your lab time. Exclusive access ensures no interference during your session."
              />
              <FeatureCard 
                icon={<Settings className="h-10 w-10 text-purple-500" />}
                title="Real-Time Control"
                description="Interface directly with LabVIEW. Stream live camera feeds and view dynamic sensor data."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 text-center text-slate-500 border-t border-slate-200 bg-white">
        <p>&copy; {new Date().getFullYear()} Virtual Flow Control Lab. Built for E&TC Students.</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50 hover:shadow-lg transition duration-300">
    <div className="mb-4 bg-white w-16 h-16 rounded-xl flex items-center justify-center shadow-sm">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2 text-slate-800">{title}</h3>
    <p className="text-slate-600 leading-relaxed">
      {description}
    </p>
  </div>
);

export default LandingPage;
