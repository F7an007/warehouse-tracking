import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Search, Map, Package, LogOut, Shield, Users, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ isOpen, onToggle }) => {
  const { currentUser, isStaff, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Define nav items based on role
  const allNavItems = [
    { path: '/', label: 'แดชบอร์ด', icon: LayoutDashboard, staffOnly: true },
    { path: '/search', label: 'ค้นหาพัสดุ', icon: Search, staffOnly: false },
    { path: '/map', label: 'แผนผังคลัง', icon: Map, staffOnly: true },
    { path: '/parcels', label: 'รายการพัสดุ', icon: Package, staffOnly: true },
  ];

  const navItems = isStaff() ? allNavItems : allNavItems.filter(item => !item.staffOnly);

  const RoleIcon = isStaff() ? Shield : Users;
  const roleLabel = isStaff() ? 'Warehouse Ops Specialist' : 'Customer';
  const roleColor = isStaff() ? 'text-indigo-400' : 'text-emerald-400';

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
        } hidden lg:flex lg:flex-col`}
      >
        <div className="p-6 flex items-center gap-3 border-b border-gray-800">
          <img src="/warehouse_logo.png" alt="Logo" className="w-10 h-10 object-contain rounded-lg bg-blue-50/10 p-1" />
          <div>
            <h1 className="text-lg font-bold leading-tight">WH Tracker</h1>
            <p className="text-xs text-gray-400">ระบบคลังสินค้า</p>
          </div>
        </div>

        {/* User Info */}
        <div className="px-4 py-3 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <RoleIcon className={`w-4 h-4 ${roleColor}`} />
            <span className={`text-xs font-medium ${roleColor}`}>{roleLabel}</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">{currentUser?.displayName}</p>
        </div>

        <nav className="px-4 space-y-2 mt-4 flex-1">
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

        {/* Logout Button */}
        <div className="px-4 pb-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl min-h-[48px] transition-colors text-gray-400 hover:bg-red-600/20 hover:text-red-400 w-full"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">ออกจากระบบ</span>
          </button>
        </div>
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
          {/* Mobile logout button */}
          <button
            onClick={handleLogout}
            className="flex flex-col items-center justify-center w-full h-full min-h-[48px] text-gray-500"
          >
            <LogOut className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-medium">ออก</span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
