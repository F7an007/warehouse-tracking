import React from 'react';

const getDominantStatus = (parcels) => {
  if (!parcels || parcels.length === 0) return null;
  
  const counts = parcels.reduce((acc, p) => {
    acc[p.status] = (acc[p.status] || 0) + 1;
    return acc;
  }, {});
  
  return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
};

const getStatusColor = (status, intensity) => {
  // intensity: 0 (empty), 1 (few), 2 (many)
  if (intensity === 0) return 'bg-gray-100 hover:bg-gray-200 text-gray-400 border-gray-200';
  
  const colors = {
    received: ['bg-blue-100 text-blue-700 border-blue-200', 'bg-blue-500 text-white border-blue-600'],
    sorting: ['bg-purple-100 text-purple-700 border-purple-200', 'bg-purple-500 text-white border-purple-600'],
    stored: ['bg-indigo-100 text-indigo-700 border-indigo-200', 'bg-indigo-500 text-white border-indigo-600'],
    ready_to_ship: ['bg-orange-100 text-orange-700 border-orange-200', 'bg-orange-500 text-white border-orange-600'],
  };

  const defaultColors = ['bg-gray-300 text-gray-800 border-gray-400', 'bg-gray-600 text-white border-gray-700'];
  const statusGroup = colors[status] || defaultColors;
  
  return statusGroup[intensity === 1 ? 0 : 1];
};

const ShelfCell = ({ zone, row, shelf, parcels = [], onClick, isHighlighted }) => {
  const count = parcels.length;
  const intensity = count === 0 ? 0 : (count <= 2 ? 1 : 2);
  const dominantStatus = getDominantStatus(parcels);
  const colorClass = getStatusColor(dominantStatus, intensity);
  
  return (
    <button
      onClick={() => onClick && onClick({ zone, row, shelf, parcels })}
      className={`
        relative w-full aspect-square min-w-[48px] min-h-[48px] rounded-lg border flex items-center justify-center font-bold text-sm
        transition-all duration-200 cursor-pointer
        ${colorClass}
        ${isHighlighted ? 'ring-4 ring-blue-400 ring-offset-2 animate-pulse shadow-lg scale-105 z-10' : ''}
      `}
      title={`ชั้น ${shelf} แถว ${row} (${count} พัสดุ)`}
      aria-label={`ชั้น ${shelf} แถว ${row}, มี ${count} พัสดุ`}
    >
      {count > 0 && <span>{count}</span>}
      
      {/* Tooltip on hover (desktop only) */}
      <div className="absolute opacity-0 hover:opacity-100 invisible hover:visible bg-black/80 text-white text-xs py-1 px-2 rounded-md -top-8 whitespace-nowrap z-20 transition-opacity">
        ชั้น {shelf} แถว {row}: {count} ชิ้น
      </div>
    </button>
  );
};

export default ShelfCell;
