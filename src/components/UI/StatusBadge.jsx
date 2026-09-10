import React from 'react';
import { PackageCheck, ArrowLeftRight, Warehouse, Truck, CheckCircle } from 'lucide-react';

const statusConfig = {
  received: { label: 'รับเข้า', bg: 'bg-received-light', text: 'text-received-dark', icon: PackageCheck },
  sorting: { label: 'กำลังคัดแยก', bg: 'bg-sorting-light', text: 'text-sorting-dark', icon: ArrowLeftRight },
  stored: { label: 'จัดเก็บแล้ว', bg: 'bg-stored-light', text: 'text-stored-dark', icon: Warehouse },
  ready_to_ship: { label: 'พร้อมส่ง', bg: 'bg-ready-light', text: 'text-ready-dark', icon: Truck },
  shipped: { label: 'นำออกแล้ว', bg: 'bg-shipped-light', text: 'text-shipped-dark', icon: CheckCircle },
};

const StatusBadge = ({ status }) => {
  const config = statusConfig[status] || statusConfig.received;
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${config.bg} ${config.text}`}>
      <Icon className="w-4 h-4" />
      <span className="text-sm font-medium">{config.label}</span>
    </div>
  );
};

export default StatusBadge;
