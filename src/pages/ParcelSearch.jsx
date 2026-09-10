import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useParcelContext } from '../context/ParcelContext';
import SearchBar from '../components/UI/SearchBar';
import StatusBadge from '../components/UI/StatusBadge';
import { Search, MapPin, AlertCircle } from 'lucide-react';
import { STATUS_CONFIG, PRIORITY_CONFIG } from '../data/mockParcels';

export default function ParcelSearch() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchParcels, parcels } = useParcelContext();
  
  const initialQuery = searchParams.get('q') || '';
  const initialStatus = searchParams.get('status') || 'all';
  const initialZone = searchParams.get('zone') || 'all';
  const initialPriority = searchParams.get('priority') || 'all';

  const [query, setQuery] = useState(initialQuery);
  const [statusFilter, setStatusFilter] = useState(initialStatus);
  const [zoneFilter, setZoneFilter] = useState(initialZone);
  const [priorityFilter, setPriorityFilter] = useState(initialPriority);

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
    setStatusFilter(searchParams.get('status') || 'all');
    setZoneFilter(searchParams.get('zone') || 'all');
    setPriorityFilter(searchParams.get('priority') || 'all');
  }, [searchParams]);

  const updateParams = (newParams) => {
    const current = Object.fromEntries([...searchParams]);
    setSearchParams({ ...current, ...newParams });
  };

  const handleSearch = (newQuery) => {
    updateParams({ q: newQuery });
  };

  // Filter logic
  let results = parcels;
  
  if (query) {
    const q = query.toLowerCase();
    results = results.filter(p => 
      p.trackingNumber.toLowerCase().includes(q) ||
      (p.senderName || p.sender?.name || '').toLowerCase().includes(q) ||
      (p.recipientName || p.recipient?.name || '').toLowerCase().includes(q)
    );
  }
  
  if (statusFilter !== 'all') {
    results = results.filter(p => p.status === statusFilter);
  }
  
  if (zoneFilter !== 'all') {
    results = results.filter(p => p.location?.zone === zoneFilter);
  }
  
  if (priorityFilter !== 'all') {
    results = results.filter(p => p.priority === priorityFilter);
  }

  const statuses = [
    { id: 'all', label: 'ทั้งหมด' },
    { id: 'received', label: 'รับเข้า' },
    { id: 'sorting', label: 'กำลังคัดแยก' },
    { id: 'stored', label: 'จัดเก็บแล้ว' },
    { id: 'ready', label: 'พร้อมส่ง' },
    { id: 'shipped', label: 'นำออกแล้ว' }
  ];

  const zones = [
    { id: 'all', label: 'ทั้งหมด' },
    { id: 'A', label: 'โซน A' },
    { id: 'B', label: 'โซน B' },
    { id: 'C', label: 'โซน C' },
    { id: 'D', label: 'โซน D' }
  ];

  const priorities = [
    { id: 'all', label: 'ทั้งหมด' },
    { id: 'normal', label: 'ปกติ' },
    { id: 'express', label: 'ด่วน' },
    { id: 'urgent', label: 'ด่วนมาก' }
  ];

  const FilterRow = ({ title, options, activeValue, onChange }) => (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
      <span className="text-sm font-medium text-gray-700 min-w-[80px]">{title}:</span>
      <div className="flex flex-wrap gap-2">
        {options.map(opt => (
          <button
            key={opt.id}
            onClick={() => { onChange(opt.id); updateParams({ [title === 'สถานะ' ? 'status' : title === 'โซน' ? 'zone' : 'priority']: opt.id }); }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors min-h-[48px] sm:min-h-[36px] flex items-center justify-center ${
              activeValue === opt.id 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <SearchBar initialValue={query} onSearch={handleSearch} placeholder="ค้นหาด้วยเลขพัสดุ, ชื่อผู้ส่ง, ผู้รับ..." className="mb-6" />
        
        <div className="mt-6 border-t pt-4">
          <FilterRow title="สถานะ" options={statuses} activeValue={statusFilter} onChange={setStatusFilter} />
          <FilterRow title="โซน" options={zones} activeValue={zoneFilter} onChange={setZoneFilter} />
          <FilterRow title="ความสำคัญ" options={priorities} activeValue={priorityFilter} onChange={setPriorityFilter} />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-medium text-gray-800 mb-4">
          ผลการค้นหา {results.length} รายการ
        </h2>

        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map(parcel => (
              <div 
                key={parcel.trackingNumber}
                onClick={() => navigate(`/parcel/${parcel.trackingNumber}`)}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{parcel.trackingNumber}</h3>
                    <div className="text-xs text-gray-500 mt-1">{new Date(parcel.receivedAt || parcel.receivedDate).toLocaleDateString('th-TH')}</div>
                  </div>
                  <StatusBadge status={parcel.status} />
                </div>
                
                <div className="flex-1 space-y-3 mt-2">
                  <div className="flex items-center text-sm">
                    <span className="text-gray-500 w-16">จาก:</span>
                    <span className="truncate text-gray-800">{parcel.senderName || parcel.sender?.name}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-gray-500 w-16">ถึง:</span>
                    <span className="truncate text-gray-800">{parcel.recipientName || parcel.recipient?.name}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin size={16} className="mr-1 text-gray-400" />
                    {parcel.status === 'shipped' ? 'นำออกแล้ว' : 
                     parcel.location ? `โซน ${parcel.location.zone} แถว ${parcel.location.row} ชั้น ${parcel.location.shelf}` : 'ยังไม่จัดเก็บ'}
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full ${PRIORITY_CONFIG[parcel.priority]?.color || 'bg-gray-100 text-gray-800'}`}>
                    {PRIORITY_CONFIG[parcel.priority]?.label || 'ปกติ'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center flex flex-col items-center justify-center">
            <div className="bg-gray-50 p-4 rounded-full mb-4">
              <Search size={48} className="text-gray-300" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">ไม่พบพัสดุที่ค้นหา</h3>
            <p className="text-gray-500 max-w-md mx-auto">ลองเปลี่ยนคำค้นหา หรือปรับตัวกรองเงื่อนไขใหม่</p>
          </div>
        )}
      </div>
    </div>
  );
}
