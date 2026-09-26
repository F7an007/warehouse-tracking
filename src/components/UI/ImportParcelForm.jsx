import React, { useState } from 'react';
import { useParcelContext } from '../../context/ParcelContext';
import { createParcel, STATUS_CONFIG, PRIORITY_CONFIG } from '../../data/mockParcels';
import { PackagePlus, X, Check } from 'lucide-react';

const CATEGORIES = ['อิเล็กทรอนิกส์', 'เสื้อผ้า', 'เครื่องสำอาง', 'เอกสาร', 'ของใช้ทั่วไป', 'อาหาร', 'อื่นๆ'];

const initialForm = {
  senderName: '',
  senderAddress: '',
  recipientName: '',
  recipientAddress: '',
  weight: '',
  dimensions: '',
  category: 'ของใช้ทั่วไป',
  priority: 'normal',
  zone: 'A',
  row: '1',
  shelf: '1',
  slot: '1',
};

export default function ImportParcelForm() {
  const { importParcel } = useParcelContext();
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastTracking, setLastTracking] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = `P${Date.now()}`;
    const now = new Date().toISOString();

    const newParcel = createParcel({
      id,
      senderName: form.senderName,
      senderAddress: form.senderAddress,
      recipientName: form.recipientName,
      recipientAddress: form.recipientAddress,
      weight: parseFloat(form.weight) || 0,
      dimensions: form.dimensions || '0x0x0',
      category: form.category,
      priority: form.priority,
      status: 'received',
      location: {
        zone: form.zone,
        row: parseInt(form.row) || 1,
        shelf: parseInt(form.shelf) || 1,
        slot: parseInt(form.slot) || 1,
      },
      receivedAt: now,
      timeline: [
        {
          id: 't1',
          action: 'รับพัสดุเข้าคลัง',
          status: 'received',
          location: 'จุดรับสินค้า',
          timestamp: now,
          operator: 'พนักงาน',
        },
      ],
    });

    importParcel(newParcel);
    setLastTracking(newParcel.trackingNumber);
    setShowSuccess(true);
    setForm(initialForm);
    setTimeout(() => setShowSuccess(false), 4000);
  };

  const inputClass = 'w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[44px]';
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1';

  return (
    <div>
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-xl font-medium hover:bg-green-700 transition-colors shadow-sm min-h-[48px]"
        >
          <PackagePlus size={20} />
          นำเข้าพัสดุใหม่
        </button>
      )}

      {/* Success Message */}
      {showSuccess && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mt-4 animate-pulse">
          <Check size={20} className="text-green-600" />
          <span>นำเข้าพัสดุสำเร็จ! เลขพัสดุ: <strong>{lastTracking}</strong></span>
        </div>
      )}

      {/* Import Form */}
      {isOpen && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <PackagePlus size={22} className="text-green-600" />
              ฟอร์มนำเข้าพัสดุใหม่
            </h2>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 min-h-[44px] min-w-[44px] flex items-center justify-center">
              <X size={22} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ข้อมูลผู้ส่ง */}
            <fieldset className="border border-gray-200 rounded-lg p-4">
              <legend className="text-sm font-semibold text-blue-700 px-2">📦 ข้อมูลผู้ส่ง</legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <label className={labelClass}>ชื่อผู้ส่ง *</label>
                  <input type="text" name="senderName" value={form.senderName} onChange={handleChange} required className={inputClass} placeholder="กรอกชื่อผู้ส่ง" />
                </div>
                <div>
                  <label className={labelClass}>ที่อยู่ผู้ส่ง *</label>
                  <input type="text" name="senderAddress" value={form.senderAddress} onChange={handleChange} required className={inputClass} placeholder="กรอกที่อยู่ผู้ส่ง" />
                </div>
              </div>
            </fieldset>

            {/* ข้อมูลผู้รับ */}
            <fieldset className="border border-gray-200 rounded-lg p-4">
              <legend className="text-sm font-semibold text-purple-700 px-2">📬 ข้อมูลผู้รับ</legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <label className={labelClass}>ชื่อผู้รับ *</label>
                  <input type="text" name="recipientName" value={form.recipientName} onChange={handleChange} required className={inputClass} placeholder="กรอกชื่อผู้รับ" />
                </div>
                <div>
                  <label className={labelClass}>ที่อยู่ผู้รับ *</label>
                  <input type="text" name="recipientAddress" value={form.recipientAddress} onChange={handleChange} required className={inputClass} placeholder="กรอกที่อยู่ผู้รับ" />
                </div>
              </div>
            </fieldset>

            {/* ข้อมูลพัสดุ */}
            <fieldset className="border border-gray-200 rounded-lg p-4">
              <legend className="text-sm font-semibold text-orange-700 px-2">📋 ข้อมูลพัสดุ</legend>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
                <div>
                  <label className={labelClass}>น้ำหนัก (กก.)</label>
                  <input type="number" step="0.1" name="weight" value={form.weight} onChange={handleChange} className={inputClass} placeholder="0.0" />
                </div>
                <div>
                  <label className={labelClass}>ขนาด (กxยxส ซม.)</label>
                  <input type="text" name="dimensions" value={form.dimensions} onChange={handleChange} className={inputClass} placeholder="30x20x15" />
                </div>
                <div>
                  <label className={labelClass}>หมวดหมู่</label>
                  <select name="category" value={form.category} onChange={handleChange} className={inputClass}>
                    {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>ความสำคัญ</label>
                  <select name="priority" value={form.priority} onChange={handleChange} className={inputClass}>
                    {Object.entries(PRIORITY_CONFIG).map(([key, val]) => (
                      <option key={key} value={key}>{val.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </fieldset>

            {/* ตำแหน่งจัดเก็บ */}
            <fieldset className="border border-gray-200 rounded-lg p-4">
              <legend className="text-sm font-semibold text-teal-700 px-2">📍 ตำแหน่งจัดเก็บ</legend>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                <div>
                  <label className={labelClass}>โซน</label>
                  <select name="zone" value={form.zone} onChange={handleChange} className={inputClass}>
                    {['A', 'B', 'C', 'D'].map(z => <option key={z} value={z}>โซน {z}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>แถว</label>
                  <input type="number" min="1" name="row" value={form.row} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>ชั้น</label>
                  <input type="number" min="1" name="shelf" value={form.shelf} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>ช่อง</label>
                  <input type="number" min="1" name="slot" value={form.slot} onChange={handleChange} className={inputClass} />
                </div>
              </div>
            </fieldset>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button type="submit" className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors min-h-[48px] flex items-center justify-center gap-2">
                <PackagePlus size={18} />
                บันทึกพัสดุเข้าระบบ
              </button>
              <button type="button" onClick={() => { setForm(initialForm); setIsOpen(false); }} className="flex-1 sm:flex-initial bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors min-h-[48px]">
                ยกเลิก
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
