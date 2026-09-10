import React from 'react';
import ShelfCell from './ShelfCell';
import { warehouseLayout } from '../../data/warehouseLayout';

const ZoneGrid = ({ zone, zoneId: propZoneId, parcels = [], onShelfClick, highlightedLocation }) => {
  const targetZoneId = propZoneId || (typeof zone === 'object' ? zone?.id : zone) || 'A';
  const zoneObj = (typeof zone === 'object' ? zone : null) || warehouseLayout.zones.find(z => z.id === targetZoneId) || {
    id: targetZoneId,
    name: `โซน ${targetZoneId}`,
    color: '#3b82f6'
  };

  const rows = [1, 2, 3, 4, 5];
  const shelves = [1, 2, 3, 4];

  const getParcelsForCell = (row, shelf) => {
    return parcels.filter(p => 
      p.location && 
      p.location.zone === targetZoneId && 
      Number(p.location.row) === row && 
      Number(p.location.shelf) === shelf &&
      p.status !== 'shipped'
    );
  };

  const isCellHighlighted = (row, shelf) => {
    return highlightedLocation?.zone === targetZoneId && 
           Number(highlightedLocation?.row) === row && 
           Number(highlightedLocation?.shelf) === shelf;
  };

  const totalCapacity = rows.length * shelves.length * 6; // 6 slots per shelf
  const zoneParcels = parcels.filter(p => p.location && p.location.zone === targetZoneId && p.status !== 'shipped');
  const currentOccupancy = zoneParcels.length;
  const occupancyPercent = Math.round((currentOccupancy / totalCapacity) * 100) || 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Zone Header */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
        <div className="flex items-center gap-3">
          <div className="w-3 h-8 rounded-full" style={{ backgroundColor: zoneObj.color || '#3b82f6' }} />
          <h3 className="text-lg font-bold text-gray-900">{zoneObj.name || `โซน ${targetZoneId}`}</h3>
        </div>
        <div className="text-sm text-gray-600 font-medium">
          ความจุ: {occupancyPercent}% ({currentOccupancy} พัสดุ)
        </div>
      </div>

      <div className="p-4 sm:p-6 overflow-x-auto">
        <div className="min-w-max">
          {/* Grid Headers (Shelves) */}
          <div className="flex mb-4">
            <div className="w-16"></div> {/* Empty corner */}
            <div className="flex-1 flex gap-2">
              {shelves.map(shelf => (
                <div key={shelf} className="flex-1 text-center text-sm font-medium text-gray-500 min-w-[48px]">
                  ชั้น {shelf}
                </div>
              ))}
            </div>
          </div>

          {/* Grid Rows */}
          <div className="space-y-2">
            {rows.map(row => (
              <div key={row} className="flex items-center">
                <div className="w-16 text-sm font-medium text-gray-500">
                  แถว {row}
                </div>
                <div className="flex-1 flex gap-2">
                  {shelves.map(shelf => (
                    <div key={`${row}-${shelf}`} className="flex-1">
                      <ShelfCell
                        zone={targetZoneId}
                        row={row}
                        shelf={shelf}
                        parcels={getParcelsForCell(row, shelf)}
                        onClick={onShelfClick}
                        isHighlighted={isCellHighlighted(row, shelf)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZoneGrid;
