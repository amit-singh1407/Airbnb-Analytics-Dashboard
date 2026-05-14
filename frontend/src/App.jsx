import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          {/* Placeholder routes for navigation items */}
          <Route path="/listings" element={
            <div className="flex items-center justify-center h-full text-slate-400">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2 text-slate-200">Listings Management</h2>
                <p>Full listings management interface coming soon.</p>
              </div>
            </div>
          } />
          <Route path="/settings" element={
            <div className="flex items-center justify-center h-full text-slate-400">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2 text-slate-200">Settings</h2>
                <p>Dashboard settings and configuration coming soon.</p>
              </div>
            </div>
          } />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
