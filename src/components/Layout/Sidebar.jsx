import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Search, Map, Package, X } from 'lucide-react';

const navItems = [
  { path: '/', label: 'แดชบอร์ด', icon: LayoutDashboard },
  { path: '/search', label: 'ค้นหาพัสดุ', icon: Search },
  { path: '/map', label: 'แผนผังคลัง', icon: Map },
  { path: '/parcels', label: 'รายการพัสดุ', icon: Package },
];

const Sidebar = ({ isOpen, onToggle }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar Desktop & Tablet */}
      <aside 
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } hidden lg:block`}
      >
        <div className="p-6 flex items-center gap-3 border-b border-gray-800">
          <img src="/warehouse_logo.png" alt="Logo" className="w-10 h-10 object-contain rounded-lg bg-blue-50/10 p-1" />
          <div>
            <h1 className="text-lg font-bold leading-tight">WH Tracker</h1>
            <p className="text-xs text-gray-400">ระบบคลังสินค้า</p>
          </div>
        </div>

        <nav className="px-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center gap-3 px-4 py-3 rounded-xl min-h-[48px] transition-colors ${
                    isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 pb-safe z-40 lg:hidden">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `flex flex-col items-center justify-center w-full h-full min-h-[48px] ${
                    isActive ? 'text-blue-600' : 'text-gray-500'
                  }`
                }
              >
                <Icon className="w-6 h-6 mb-1" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
