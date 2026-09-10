import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';

const AppLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />

      {/* Mobile Top Bar */}
      <header className="lg:hidden bg-white border-b border-gray-200 sticky top-0 z-30 px-4 h-16 flex items-center justify-between">
        <h1 className="text-xl font-bold flex items-center gap-2 text-gray-900">
          <img src="/warehouse_logo.png" alt="Logo" className="w-8 h-8 object-contain" />
          WH Tracker
        </h1>
        {/* Placeholder for future actions */}
        <div className="w-10"></div>
      </header>

      {/* Main Content */}
      <main className="lg:ml-64 p-4 lg:p-6 pb-24 lg:pb-6 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
