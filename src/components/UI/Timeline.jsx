import React from 'react';
import { PackageCheck, ArrowLeftRight, Warehouse, Truck, CheckCircle, MapPin } from 'lucide-react';

const formatThaiDate = (isoString) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  const months = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear() + 543;
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${day} ${month} ${year} เวลา ${hours}:${minutes} น.`;
};

const getIconAndColor = (status) => {
  switch (status) {
    case 'received': return { Icon: PackageCheck, color: 'bg-blue-500', text: 'text-blue-500' };
    case 'sorting': return { Icon: ArrowLeftRight, color: 'bg-purple-500', text: 'text-purple-500' };
    case 'stored': return { Icon: Warehouse, color: 'bg-indigo-500', text: 'text-indigo-500' };
    case 'ready_to_ship': return { Icon: Truck, color: 'bg-orange-500', text: 'text-orange-500' };
    case 'shipped': return { Icon: CheckCircle, color: 'bg-green-500', text: 'text-green-500' };
    default: return { Icon: MapPin, color: 'bg-gray-500', text: 'text-gray-500' };
  }
};

const Timeline = ({ entries, items }) => {
  const list = entries || items || [];
  if (!list || list.length === 0) return null;

  return (
    <div className="relative pl-6 space-y-6">
      {/* Vertical line */}
      <div className="absolute top-4 bottom-4 left-[27px] w-0.5 bg-gray-200"></div>

      {list.map((entry, index) => {
        const isLatest = index === 0;
        const { Icon, color, text } = getIconAndColor(entry.status);

        return (
          <div key={entry.id} className="relative flex items-start gap-4">
            {/* Dot */}
            <div className="relative z-10 flex items-center justify-center">
              {isLatest && (
                <div className={`absolute w-4 h-4 rounded-full ${color} opacity-25 animate-ping`} />
              )}
              <div className={`w-3 h-3 rounded-full ${color} border-2 border-white`} />
            </div>

            {/* Content */}
            <div className="flex-1 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <div>
                  <h4 className={`font-bold ${text} flex items-center gap-2`}>
                    <Icon className="w-5 h-5" />
                    {entry.action}
                  </h4>
                  {entry.location && (
                    <p className="text-gray-600 mt-1 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      {entry.location}
                    </p>
                  )}
                  {entry.operator && (
                    <p className="text-sm text-gray-500 mt-1">ผู้ดำเนินการ: {entry.operator}</p>
                  )}
                </div>
                <div className="text-sm text-gray-500 bg-gray-50 px-2.5 py-1 rounded-md self-start">
                  {formatThaiDate(entry.timestamp)}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
