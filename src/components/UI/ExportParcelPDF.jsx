import React from 'react';
import { jsPDF } from 'jspdf';
import { FileDown } from 'lucide-react';
import { addThaiText } from '../../utils/thaiFontHelper';

const STATUS_LABELS = {
  received: 'รับเข้าแล้ว',
  sorting: 'กำลังคัดแยก',
  stored: 'จัดเก็บแล้ว',
  ready_to_ship: 'พร้อมส่ง',
  ready: 'พร้อมส่ง',
  shipped: 'นำออกแล้ว',
};

const PRIORITY_LABELS = {
  normal: 'ปกติ',
  express: 'ด่วน',
  urgent: 'เร่งด่วน',
};

function generateSinglePDF(parcel) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Header
  doc.setFillColor(41, 98, 255);
  doc.rect(0, 0, pageWidth, 40, 'F');
  addThaiText(doc, 'ระบบจัดการคลังสินค้า', pageWidth / 2, 14, { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF', align: 'center' });
  addThaiText(doc, 'รายงานข้อมูลพัสดุ', pageWidth / 2, 28, { fontSize: 12, color: '#E0E7FF', align: 'center' });

  // Tracking Number
  addThaiText(doc, `เลขพัสดุ: ${parcel.trackingNumber}`, 14, 52, { fontSize: 14, fontWeight: 'bold' });

  // Divider
  doc.setDrawColor(200, 200, 200);
  doc.line(14, 58, pageWidth - 14, 58);

  // Details
  let y = 68;
  const lineHeight = 10;

  const fields = [
    ['สถานะ', STATUS_LABELS[parcel.status] || parcel.status],
    ['ความสำคัญ', PRIORITY_LABELS[parcel.priority] || parcel.priority],
    ['ผู้ส่ง', parcel.senderName],
    ['ที่อยู่ผู้ส่ง', parcel.senderAddress],
    ['ผู้รับ', parcel.recipientName],
    ['ที่อยู่ผู้รับ', parcel.recipientAddress],
    ['น้ำหนัก', `${parcel.weight} กก.`],
    ['ขนาด', `${parcel.dimensions} ซม.`],
    ['หมวดหมู่', parcel.category],
    ['ตำแหน่ง', parcel.location ? `โซน ${parcel.location.zone} - แถว ${parcel.location.row} / ชั้น ${parcel.location.shelf}` : 'นำออกแล้ว'],
    ['วันที่รับเข้า', new Date(parcel.receivedAt).toLocaleString('th-TH')],
  ];

  fields.forEach(([label, value]) => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
    addThaiText(doc, `${label}:`, 14, y, { fontSize: 10, fontWeight: 'bold' });
    addThaiText(doc, String(value || '-'), 45, y, { fontSize: 10 });
    y += lineHeight;
  });

  // Timeline section
  y += 5;
  doc.setDrawColor(200, 200, 200);
  doc.line(14, y, pageWidth - 14, y);
  y += 10;

  addThaiText(doc, 'ประวัติการเคลื่อนไหว', 14, y, { fontSize: 13, fontWeight: 'bold' });
  y += 12;

  if (parcel.timeline && parcel.timeline.length > 0) {
    // Table header background
    doc.setFillColor(240, 240, 240);
    doc.rect(14, y - 6, pageWidth - 28, 10, 'F');
    addThaiText(doc, '#', 16, y, { fontSize: 8, fontWeight: 'bold' });
    addThaiText(doc, 'การดำเนินการ', 26, y, { fontSize: 8, fontWeight: 'bold' });
    addThaiText(doc, 'สถานะ', 80, y, { fontSize: 8, fontWeight: 'bold' });
    addThaiText(doc, 'ตำแหน่ง', 115, y, { fontSize: 8, fontWeight: 'bold' });
    addThaiText(doc, 'เวลา', 155, y, { fontSize: 8, fontWeight: 'bold' });
    y += 10;

    parcel.timeline.forEach((entry, idx) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      addThaiText(doc, String(idx + 1), 16, y, { fontSize: 8 });
      addThaiText(doc, entry.action || '-', 26, y, { fontSize: 8 });
      addThaiText(doc, STATUS_LABELS[entry.status] || entry.status || '-', 80, y, { fontSize: 8 });
      addThaiText(doc, String(entry.location || '-'), 115, y, { fontSize: 8 });
      addThaiText(doc, new Date(entry.timestamp).toLocaleString('th-TH'), 155, y, { fontSize: 8 });
      y += 9;
    });
  }

  // Footer
  const footerY = doc.internal.pageSize.getHeight() - 12;
  addThaiText(doc, `สร้างเมื่อ: ${new Date().toLocaleString('th-TH')}`, 14, footerY, { fontSize: 7, color: '#999999' });
  addThaiText(doc, 'WH Tracker - ระบบจัดการคลังสินค้า', pageWidth - 14, footerY, { fontSize: 7, color: '#999999', align: 'right' });

  doc.save(`parcel-${parcel.trackingNumber}.pdf`);
}

function generateAllPDF(parcels) {
  const doc = new jsPDF('landscape');
  const pageWidth = doc.internal.pageSize.getWidth();

  // Header
  doc.setFillColor(41, 98, 255);
  doc.rect(0, 0, pageWidth, 32, 'F');
  addThaiText(doc, 'ระบบจัดการคลังสินค้า - รายงานพัสดุทั้งหมด', pageWidth / 2, 12, { fontSize: 16, fontWeight: 'bold', color: '#FFFFFF', align: 'center' });
  addThaiText(doc, `ทั้งหมด ${parcels.length} รายการ | สร้างเมื่อ: ${new Date().toLocaleString('th-TH')}`, pageWidth / 2, 24, { fontSize: 9, color: '#E0E7FF', align: 'center' });

  let y = 42;

  const drawTableHeader = () => {
    doc.setFillColor(240, 240, 240);
    doc.rect(10, y - 6, pageWidth - 20, 10, 'F');
    const headers = ['#', 'เลขพัสดุ', 'ผู้ส่ง', 'ผู้รับ', 'ตำแหน่ง', 'สถานะ', 'น้ำหนัก', 'หมวดหมู่', 'ระดับ', 'วันรับ'];
    const xPositions = [12, 22, 55, 90, 120, 160, 195, 215, 240, 260];
    headers.forEach((h, i) => {
      addThaiText(doc, h, xPositions[i], y, { fontSize: 7, fontWeight: 'bold' });
    });
    y += 10;
  };

  drawTableHeader();

  parcels.forEach((parcel, idx) => {
    if (y > 185) {
      doc.addPage('landscape');
      y = 20;
      drawTableHeader();
    }

    // Zebra stripe
    if (idx % 2 === 0) {
      doc.setFillColor(250, 250, 255);
      doc.rect(10, y - 5, pageWidth - 20, 9, 'F');
    }

    const xPositions = [12, 22, 55, 90, 120, 160, 195, 215, 240, 260];
    const locationStr = parcel.location
      ? `โซน ${parcel.location.zone} - ${parcel.location.row}/${parcel.location.shelf}`
      : 'นำออกแล้ว';

    const row = [
      String(idx + 1),
      parcel.trackingNumber,
      (parcel.senderName || '').substring(0, 12),
      (parcel.recipientName || '').substring(0, 12),
      locationStr,
      STATUS_LABELS[parcel.status] || parcel.status,
      `${parcel.weight} กก.`,
      parcel.category || '-',
      PRIORITY_LABELS[parcel.priority] || parcel.priority,
      new Date(parcel.receivedAt).toLocaleDateString('th-TH'),
    ];

    row.forEach((cell, i) => {
      addThaiText(doc, cell, xPositions[i], y, { fontSize: 7 });
    });
    y += 9;
  });

  // Footer
  const footerY = doc.internal.pageSize.getHeight() - 8;
  addThaiText(doc, `สร้างเมื่อ: ${new Date().toLocaleString('th-TH')}`, 14, footerY, { fontSize: 7, color: '#999999' });
  addThaiText(doc, 'WH Tracker - ระบบจัดการคลังสินค้า', pageWidth - 14, footerY, { fontSize: 7, color: '#999999', align: 'right' });

  doc.save(`all-parcels-report-${new Date().toISOString().slice(0, 10)}.pdf`);
}

export default function ExportParcelPDF({ parcel, parcels, label, variant = 'default' }) {
  const handleClick = (e) => {
    e.stopPropagation();
    if (parcel) {
      generateSinglePDF(parcel);
    } else if (parcels && parcels.length > 0) {
      generateAllPDF(parcels);
    }
  };

  const baseClasses = variant === 'icon'
    ? 'inline-flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-blue-600 transition-colors min-h-[40px] min-w-[40px]'
    : 'flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors min-h-[48px]';

  return (
    <button onClick={handleClick} className={baseClasses} title="ส่งออก PDF">
      <FileDown size={variant === 'icon' ? 18 : 20} />
      {variant !== 'icon' && (label || (parcel ? 'ส่งออก PDF' : 'ส่งออกทั้งหมด PDF'))}
    </button>
  );
}
