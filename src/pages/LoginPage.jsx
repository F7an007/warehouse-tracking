import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Package, User, Lock, AlertCircle, Shield, Users } from 'lucide-react';

export default function LoginPage() {
  const { loginStaff, loginCustomer } = useAuth();
  
  const [loginMode, setLoginMode] = useState('customer'); // 'customer' or 'staff'
  
  // Staff form state
  const [staffCode, setStaffCode] = useState('');
  const [staffName, setStaffName] = useState('');
  
  // Customer form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      let result;
      if (loginMode === 'staff') {
        result = loginStaff(staffCode, staffName);
      } else {
        result = loginCustomer(firstName, lastName);
      }
      
      if (!result.success) {
        setError(result.message);
      }
      setLoading(false);
    }, 500);
  };

  const handleQuickDemo = () => {
    if (loginMode === 'staff') {
      setStaffCode('MHLE14');
      setStaffName('สมชาย พนักงานคลัง');
    } else {
      setFirstName('สมศรี');
      setLastName('รักดี');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo & Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200 mb-4">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">WH Tracker</h1>
          <p className="text-gray-500 mt-1">ระบบจัดการคลังสินค้าอัจฉริยะ</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
          
          {/* Tabs */}
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => { setLoginMode('customer'); setError(''); }}
              className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${loginMode === 'customer' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/30' : 'text-gray-500 hover:text-gray-700 bg-gray-50'}`}
            >
              <Users className="w-4 h-4" />
              สำหรับลูกค้า
            </button>
            <button
              onClick={() => { setLoginMode('staff'); setError(''); }}
              className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${loginMode === 'staff' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/30' : 'text-gray-500 hover:text-gray-700 bg-gray-50'}`}
            >
              <Shield className="w-4 h-4" />
              สำหรับเจ้าหน้าที่
            </button>
          </div>

          <div className="p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              {loginMode === 'staff' ? 'เข้าสู่ระบบเจ้าหน้าที่' : 'เข้าสู่ระบบลูกค้า'}
            </h2>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {loginMode === 'staff' ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">รหัสเจ้าหน้าที่</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={staffCode}
                        onChange={(e) => setStaffCode(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="เช่น MHLE14"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ชื่อ - นามสกุล (เจ้าหน้าที่)</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={staffName}
                        onChange={(e) => setStaffName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="กรอกชื่อเจ้าหน้าที่"
                        required
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ชื่อ</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="กรอกชื่อ"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">นามสกุล</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="กรอกนามสกุล"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px] mt-2"
              >
                {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
              </button>
            </form>

            {/* Quick Demo */}
            <div className="mt-6 pt-4 text-center">
              <button
                onClick={handleQuickDemo}
                className="text-xs text-blue-600 hover:text-blue-800 underline decoration-blue-300 font-medium"
              >
                ใส่ข้อมูลทดสอบ (Demo)
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">&copy; 2026 WH Tracker. All rights reserved.</p>
      </div>
    </div>
  );
}
