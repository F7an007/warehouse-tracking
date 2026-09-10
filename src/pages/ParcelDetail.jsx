import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useParcelContext } from '../context/ParcelContext';
import StatusBadge from '../components/UI/StatusBadge';
import Timeline from '../components/UI/Timeline';
import Modal from '../components/UI/Modal';
import { STATUS_CONFIG, PRIORITY_CONFIG } from '../data/mockParcels';
import { ArrowLeft, Copy, MapPin, Truck, Printer, Edit, Move, Check } from 'lucide-react';

export default function ParcelDetail() {
  const { trackingNumber } = useParams();
  const navigate = useNavigate();
  const { parcels, updateParcelStatus, moveParcel } = useParcelContext();
  
  const [parcel, setParcel] = useState(null);
  const [copied, setCopied] = useState(false);
  
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [moveModalOpen, setMoveModalOpen] = useState(false);
  
  const [newStatus, setNewStatus] = useState('');
  const [operator, setOperator] = useState('พนักงาน 1');
  
  const [moveData, setMoveData] = useState({ zone: 'A', row: 1, shelf: 1, slot: 1 });

  useEffect(() => {
    const found = parcels.find(p => p.trackingNumber === trackingNumber);
    if (found) {
      setParcel(found);
      setNewStatus(found.status);
      if (found.location) setMoveData(found.location);
    }
  }, [trackingNumber, parcels]);

  if (!parcel) {
    return <div className="p-8 text-center">กำลังโหลดข้อมูล... หรือไม่พบเลขพัสดุนี้</div>;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(parcel.trackingNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUpdateStatus = () => {
    updateParcelStatus(trackingNumber, newStatus, operator);
    setStatusModalOpen(false);
  };

  const handleMove = () => {
    moveParcel(trackingNumber, { ...moveData, row: Number(moveData.row), shelf: Number(moveData.shelf), slot: Number(moveData.slot) }, operator);
    setMoveModalOpen(false);
  };

  const isShipped = parcel.status === 'shipped';

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-2">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center">
          <ArrowLeft size={24} className="text-gray-600" />
        </button>
        <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <h1 className="text-2xl font-bold text-gray-900">{parcel.trackingNumber}</h1>
          <StatusBadge status={parcel.status} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 1: ข้อมูลพัสดุ */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">ข้อมูลพัสดุ</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">หมายเลขติดตาม:</span>
              <button onClick={handleCopy} className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-800 font-medium transition-colors min-h-[48px]">
                {parcel.trackingNumber}
                {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-gray-400" />}
              </button>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">หมวดหมู่:</span>
              <span className="text-gray-800">{parcel.category}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">น้ำหนัก / ขนาด:</span>
              <span className="text-gray-800">{parcel.weight} kg / {parcel.dimensions || parcel.size}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">ความสำคัญ:</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${PRIORITY_CONFIG[parcel.priority]?.color || 'bg-gray-100 text-gray-800'}`}>
                {PRIORITY_CONFIG[parcel.priority]?.label || 'ปกติ'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">วันที่รับเข้า:</span>
              <span className="text-gray-800">{new Date(parcel.receivedAt || parcel.receivedDate).toLocaleString('th-TH')}</span>
            </div>
          </div>
        </div>

        {/* Card 2: ผู้ส่ง & ผู้รับ */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">ข้อมูลการจัดส่ง</h2>
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">ผู้ส่ง:</h3>
              <p className="font-medium text-gray-800">{parcel.senderName || parcel.sender?.name}</p>
              <p className="text-sm text-gray-600 mt-1">{parcel.senderAddress || parcel.sender?.address}</p>
            </div>
            <div className="border-t border-gray-100 my-4 pt-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">ผู้รับ:</h3>
              <p className="font-medium text-gray-800">{parcel.recipientName || parcel.recipient?.name}</p>
              <p className="text-sm text-gray-600 mt-1">{parcel.recipientAddress || parcel.recipient?.address}</p>
            </div>
          </div>
        </div>

        {/* Card 3: ตำแหน่งปัจจุบัน */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2 flex items-center justify-between">
            <span>ตำแหน่งปัจจุบัน</span>
            <MapPin size={20} className="text-blue-500" />
          </h2>
          {isShipped ? (
            <div className="flex flex-col items-center justify-center py-6 text-gray-500">
              <Truck size={48} className="mb-2 text-gray-400" />
              <p className="font-medium">นำออกจากคลังแล้ว</p>
            </div>
          ) : parcel.location ? (
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-blue-50 p-4 rounded-xl">
                <span className="block text-sm text-gray-500 mb-1">โซน</span>
                <span className="block text-2xl font-bold text-blue-700">{parcel.location.zone}</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <span className="block text-sm text-gray-500 mb-1">แถว</span>
                <span className="block text-2xl font-bold text-gray-700">{parcel.location.row}</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <span className="block text-sm text-gray-500 mb-1">ชั้น</span>
                <span className="block text-2xl font-bold text-gray-700">{parcel.location.shelf}</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <span className="block text-sm text-gray-500 mb-1">ช่อง</span>
                <span className="block text-2xl font-bold text-gray-700">{parcel.location.slot}</span>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center text-gray-500 font-medium">
              ยังไม่มีการระบุตำแหน่ง
            </div>
          )}
        </div>

        {/* Card 4: ดำเนินการ */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">การดำเนินการ</h2>
          <div className="space-y-3">
            <button 
              disabled={isShipped}
              onClick={() => setStatusModalOpen(true)}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-xl transition-colors min-h-[48px]"
            >
              <Edit size={20} />
              เปลี่ยนสถานะ
            </button>
            <button 
              disabled={isShipped}
              onClick={() => setMoveModalOpen(true)}
              className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border-2 border-gray-200 disabled:border-gray-100 disabled:text-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed text-gray-700 font-medium py-3 px-4 rounded-xl transition-colors min-h-[48px]"
            >
              <Move size={20} />
              ย้ายตำแหน่ง
            </button>
            <button 
              onClick={() => alert('กำลังพิมพ์ฉลาก...')}
              className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border-2 border-gray-200 text-gray-700 font-medium py-3 px-4 rounded-xl transition-colors min-h-[48px]"
            >
              <Printer size={20} />
              พิมพ์ฉลาก
            </button>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-6 border-b pb-2">ประวัติการเคลื่อนย้าย</h2>
        <Timeline entries={parcel.timeline || parcel.history || []} />
      </div>

      {/* Status Modal */}
      <Modal isOpen={statusModalOpen} onClose={() => setStatusModalOpen(false)} title="อัปเดตสถานะ">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">สถานะใหม่</label>
            <select 
              value={newStatus} 
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 min-h-[48px]"
            >
              {Object.keys(STATUS_CONFIG).map(key => (
                <option key={key} value={key}>{STATUS_CONFIG[key].label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ชื่อผู้ดำเนินการ</label>
            <input 
              type="text" 
              value={operator} 
              onChange={(e) => setOperator(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 min-h-[48px]"
            />
          </div>
          <div className="pt-4 flex gap-3">
            <button onClick={() => setStatusModalOpen(false)} className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium min-h-[48px]">ยกเลิก</button>
            <button onClick={handleUpdateStatus} className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium min-h-[48px]">บันทึก</button>
          </div>
        </div>
      </Modal>

      {/* Move Modal */}
      <Modal isOpen={moveModalOpen} onClose={() => setMoveModalOpen(false)} title="ย้ายตำแหน่งพัสดุ">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">โซน</label>
              <select value={moveData.zone} onChange={(e) => setMoveData({...moveData, zone: e.target.value})} className="w-full border border-gray-300 rounded-lg p-3 min-h-[48px]">
                {['A', 'B', 'C', 'D'].map(z => <option key={z} value={z}>โซน {z}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">แถว</label>
              <select value={moveData.row} onChange={(e) => setMoveData({...moveData, row: e.target.value})} className="w-full border border-gray-300 rounded-lg p-3 min-h-[48px]">
                {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ชั้น</label>
              <select value={moveData.shelf} onChange={(e) => setMoveData({...moveData, shelf: e.target.value})} className="w-full border border-gray-300 rounded-lg p-3 min-h-[48px]">
                {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ช่อง</label>
              <select value={moveData.slot} onChange={(e) => setMoveData({...moveData, slot: e.target.value})} className="w-full border border-gray-300 rounded-lg p-3 min-h-[48px]">
                {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ชื่อผู้ดำเนินการ</label>
            <input type="text" value={operator} onChange={(e) => setOperator(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 min-h-[48px]"/>
          </div>
          <div className="pt-4 flex gap-3">
            <button onClick={() => setMoveModalOpen(false)} className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium min-h-[48px]">ยกเลิก</button>
            <button onClick={handleMove} className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium min-h-[48px]">ยืนยันการย้าย</button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
