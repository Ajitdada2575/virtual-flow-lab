import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ExperimentLayout from './layouts/ExperimentLayout';
import LiveExperiment from './pages/LiveExperiment';
import BookingPage from './pages/BookingPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/experiment/book" element={<BookingPage />} />
          <Route path="/experiment" element={<ExperimentLayout />}>
            <Route path="live/:id" element={<LiveExperiment />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
