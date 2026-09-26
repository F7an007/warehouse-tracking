import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Package, User, Lock, AlertCircle, Shield, Users } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const result = login(username, password);
      if (!result.success) {
        setError(result.message);
      }
      setLoading(false);
    }, 500);
  };

  const handleQuickLogin = (role) => {
    if (role === 'staff') {
      setUsername('staff1');
      setPassword('password');
    } else {
      setUsername('customer1');
      setPassword('password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200 mb-4">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">WH Tracker</h1>
          <p className="text-gray-500 mt-1">ระบบจัดการคลังสินค้าอัจฉริยะ</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">เข้าสู่ระบบ</h2>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ชื่อผู้ใช้</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="กรอกชื่อผู้ใช้"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">รหัสผ่าน</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="กรอกรหัสผ่าน"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px]"
            >
              {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
            </button>
          </form>

          {/* Quick Login */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center mb-3">ทดลองเข้าสู่ระบบ (Demo)</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleQuickLogin('staff')}
                className="flex items-center justify-center gap-2 px-3 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-sm font-medium transition-colors min-h-[44px]"
              >
                <Shield className="w-4 h-4" />
                <span>เจ้าหน้าที่</span>
              </button>
              <button
                onClick={() => handleQuickLogin('customer')}
                className="flex items-center justify-center gap-2 px-3 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-sm font-medium transition-colors min-h-[44px]"
              >
                <Users className="w-4 h-4" />
                <span>ลูกค้า</span>
              </button>
            </div>
          </div>
        </div>

        {/* Info cards */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-white/80 backdrop-blur border border-gray-100 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-semibold text-gray-800">Warehouse Ops Specialist</span>
            </div>
            <p className="text-xs text-gray-500">จัดการพัสดุ นำเข้า ส่งออก PDF เปลี่ยนสถานะ ดูแผนผังคลัง</p>
          </div>
          <div className="bg-white/80 backdrop-blur border border-gray-100 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-semibold text-gray-800">Customer</span>
            </div>
            <p className="text-xs text-gray-500">ค้นหาและติดตามสถานะพัสดุของคุณ</p>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">&copy; 2026 WH Tracker. All rights reserved.</p>
      </div>
    </div>
  );
}
