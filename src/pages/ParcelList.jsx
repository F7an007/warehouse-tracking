import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParcelContext } from '../context/ParcelContext';
import StatusBadge from '../components/UI/StatusBadge';
import ImportParcelForm from '../components/UI/ImportParcelForm';
import ExportParcelPDF from '../components/UI/ExportParcelPDF';
import { ChevronLeft, ChevronRight, FileDown } from 'lucide-react';
import { PRIORITY_CONFIG } from '../data/mockParcels';

export default function ParcelList() {
  const navigate = useNavigate();
  const { parcels } = useParcelContext();
  
  const [statusFilter, setStatusFilter] = useState('all');
  const [zoneFilter, setZoneFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date_desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  let filtered = parcels;
  if (statusFilter !== 'all') filtered = filtered.filter(p => p.status === statusFilter);
  if (zoneFilter !== 'all') filtered = filtered.filter(p => p.location?.zone === zoneFilter);

  filtered = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'date_asc': return new Date(a.receivedAt || a.receivedDate) - new Date(b.receivedAt || b.receivedDate);
      case 'date_desc': return new Date(b.receivedAt || b.receivedDate) - new Date(a.receivedAt || a.receivedDate);
      case 'tracking': return a.trackingNumber.localeCompare(b.trackingNumber);
      case 'zone': return (a.location?.zone || 'Z').localeCompare(b.location?.zone || 'Z');
      default: return 0;
    }
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header with Import & Export buttons side by side */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">รายการพัสดุ</h1>
          <p className="text-gray-500">พบ {filtered.length} รายการ</p>
        </div>
        <div className="flex items-center gap-3">
          <ExportParcelPDF parcels={filtered} label="ส่งออกทั้งหมด (PDF)" />
        </div>
      </div>

      {/* Import Parcel Form */}
      <ImportParcelForm />

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="space-y-3 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-gray-700 w-16">สถานะ:</span>
              {statuses.map(s => (
                <button key={s.id} onClick={() => { setStatusFilter(s.id); setCurrentPage(1); }} 
                  className={`px-3 py-1.5 rounded-full text-sm min-h-[40px] flex items-center ${statusFilter === s.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {s.label}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-gray-700 w-16">โซน:</span>
              {zones.map(z => (
                <button key={z.id} onClick={() => { setZoneFilter(z.id); setCurrentPage(1); }} 
                  className={`px-3 py-1.5 rounded-full text-sm min-h-[40px] flex items-center ${zoneFilter === z.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {z.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="w-full md:w-auto flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">เรียงโดย:</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border border-gray-300 rounded-lg p-2 min-h-[48px] bg-white w-full md:w-auto">
              <option value="date_desc">วันที่รับเข้า (ใหม่สุด)</option>
              <option value="date_asc">วันที่รับเข้า (เก่าสุด)</option>
              <option value="tracking">เลขพัสดุ</option>
              <option value="zone">โซน</option>
            </select>
          </div>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">เลขพัสดุ</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">สถานะ</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ผู้ส่ง / ผู้รับ</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ตำแหน่ง</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">หมวดหมู่</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">วันที่รับเข้า</th>
              <th className="px-4 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">PDF</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginated.map((parcel, idx) => (
              <tr key={parcel.trackingNumber} onClick={() => navigate(`/parcel/${parcel.trackingNumber}`)} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 cursor-pointer transition-colors`}>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-blue-600">{parcel.trackingNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={parcel.status} /></td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 truncate max-w-[200px]">{parcel.senderName || parcel.sender?.name}</div>
                  <div className="text-xs text-gray-500 truncate max-w-[200px]">ถึง: {parcel.recipientName || parcel.recipient?.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {parcel.status === 'shipped' ? 'นำออกแล้ว' : parcel.location ? `โซน ${parcel.location.zone} - ${parcel.location.row}/${parcel.location.shelf}` : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{parcel.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(parcel.receivedAt || parcel.receivedDate).toLocaleDateString('th-TH')}</td>
                <td className="px-4 py-4 text-center">
                  <ExportParcelPDF parcel={parcel} variant="icon" />
                </td>
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr><td colSpan="7" className="px-6 py-12 text-center text-gray-500">ไม่พบข้อมูลพัสดุ</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {paginated.map(parcel => (
          <div key={parcel.trackingNumber} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col cursor-pointer hover:shadow-md transition-shadow">
            <div onClick={() => navigate(`/parcel/${parcel.trackingNumber}`)}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-blue-600">{parcel.trackingNumber}</h3>
                <StatusBadge status={parcel.status} />
              </div>
              <div className="text-sm mb-1 text-gray-700">จาก: {parcel.senderName || parcel.sender?.name}</div>
              <div className="text-sm mb-3 text-gray-700">ถึง: {parcel.recipientName || parcel.recipient?.name}</div>
              <div className="flex justify-between items-center text-xs text-gray-500 pt-3 border-t border-gray-50">
                <span>{parcel.status === 'shipped' ? 'นำออกแล้ว' : parcel.location ? `โซน ${parcel.location.zone} - ${parcel.location.row}/${parcel.location.shelf}` : 'ยังไม่จัดเก็บ'}</span>
                <span>{new Date(parcel.receivedAt || parcel.receivedDate).toLocaleDateString('th-TH')}</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100 flex justify-end">
              <ExportParcelPDF parcel={parcel} variant="icon" />
            </div>
          </div>
        ))}
        {paginated.length === 0 && (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center text-gray-500">ไม่พบข้อมูลพัสดุ</div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white px-4 py-3 border border-gray-200 rounded-xl sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 min-h-[48px]">
              ก่อนหน้า
            </button>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 min-h-[48px]">
              ถัดไป
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                แสดง <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> ถึง <span className="font-medium">{Math.min(currentPage * itemsPerPage, filtered.length)}</span> จาก <span className="font-medium">{filtered.length}</span> รายการ
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 min-h-[48px] min-w-[48px] justify-center">
                  <span className="sr-only">Previous</span>
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 min-h-[48px]">
                  หน้า {currentPage} / {totalPages}
                </span>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 min-h-[48px] min-w-[48px] justify-center">
                  <span className="sr-only">Next</span>
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
