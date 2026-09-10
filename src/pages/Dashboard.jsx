import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useParcelContext } from '../context/ParcelContext';
import SearchBar from '../components/UI/SearchBar';
import StatCard from '../components/UI/StatCard';
import { warehouseLayout, getZoneOccupancy } from '../data/warehouseLayout';
import { PackageCheck, ArrowLeftRight, Warehouse, Truck, Clock } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const { getStats, getRecentActivity, parcels } = useParcelContext();
  
  const stats = getStats();
  const recentActivity = getRecentActivity(10);
  const totalParcels = parcels?.length || 0;

  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const getRelativeTime = (timestamp) => {
    if (!timestamp) return 'ไม่ทราบเวลา';
    const now = new Date();
    const past = new Date(timestamp);
    const diffInSeconds = Math.floor((now - past) / 1000);
    
    if (diffInSeconds < 60) return 'เมื่อสักครู่';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} นาทีที่แล้ว`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} ชั่วโมงที่แล้ว`;
    return `${Math.floor(diffInSeconds / 86400)} วันที่แล้ว`;
  };

  const zoneColors = {
    'A': 'bg-red-500',
    'B': 'bg-blue-500',
    'C': 'bg-green-500',
    'D': 'bg-yellow-500',
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">หน้าหลัก</h1>
          <p className="text-gray-500">พัสดุในระบบทั้งหมด {totalParcels} รายการ</p>
        </div>
        <div className="w-full md:w-96">
          <SearchBar onSearch={handleSearch} placeholder="ค้นหาด้วยเลขพัสดุ..." />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div onClick={() => navigate('/parcels?status=received')} className="cursor-pointer">
          <StatCard title="รับเข้า" value={stats.received || 0} icon={<PackageCheck className="text-blue-500" />} color="border-blue-500" />
        </div>
        <div onClick={() => navigate('/parcels?status=sorting')} className="cursor-pointer">
          <StatCard title="กำลังคัดแยก" value={stats.sorting || 0} icon={<ArrowLeftRight className="text-orange-500" />} color="border-orange-500" />
        </div>
        <div onClick={() => navigate('/parcels?status=stored')} className="cursor-pointer">
          <StatCard title="จัดเก็บแล้ว" value={stats.stored || 0} icon={<Warehouse className="text-green-500" />} color="border-green-500" />
        </div>
        <div onClick={() => navigate('/parcels?status=ready')} className="cursor-pointer">
          <StatCard title="พร้อมส่ง" value={stats.ready || 0} icon={<Truck className="text-purple-500" />} color="border-purple-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">ความหนาแน่นแต่ละโซน</h2>
          <div className="space-y-6">
            {['A', 'B', 'C', 'D'].map(zoneId => {
              const occupancy = getZoneOccupancy(parcels, zoneId);
              const percentage = occupancy.percentage || 0;
              return (
                <div key={zoneId} onClick={() => navigate(`/map?zone=${zoneId}`)} className="cursor-pointer group">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium group-hover:text-blue-600 transition-colors">โซน {zoneId}</span>
                    <span className="text-gray-500">{occupancy.used} / {occupancy.total} ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className={`${zoneColors[zoneId] || 'bg-blue-500'} h-3 rounded-full transition-all duration-500`} style={{ width: `${percentage}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">กิจกรรมล่าสุด</h2>
          <div className="flex-1 overflow-y-auto pr-2 space-y-4 max-h-[300px]">
            {recentActivity && recentActivity.length > 0 ? (
              recentActivity.map((activity, index) => (
                <Link key={index} to={`/parcel/${activity.trackingNumber}`} className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
                  <div className="bg-blue-50 p-2 rounded-full mt-1">
                    <Clock size={16} className="text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{activity.trackingNumber}</p>
                    <p className="text-sm text-gray-600 truncate">{activity.action} - โดย {activity.operator}</p>
                  </div>
                  <div className="text-xs text-gray-500 whitespace-nowrap">
                    {getRelativeTime(activity.timestamp)}
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">ไม่มีกิจกรรมล่าสุด</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
