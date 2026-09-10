import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useParcelContext } from '../context/ParcelContext';
import ZoneGrid from '../components/Map/ZoneGrid';
import Modal from '../components/UI/Modal';
import StatusBadge from '../components/UI/StatusBadge';
import { warehouseLayout, getZoneOccupancy } from '../data/warehouseLayout';
import { STATUS_CONFIG } from '../data/mockParcels';
import { Map, AlertCircle } from 'lucide-react';

export default function WarehouseMap() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { parcels } = useParcelContext();
  
  const highlightParam = searchParams.get('highlight');
  const zoneParam = searchParams.get('zone');
  
  const [selectedShelf, setSelectedShelf] = useState(null);
  const [shelfParcels, setShelfParcels] = useState([]);

  // Find location to highlight if highlight param exists
  let highlightLocation = null;
  if (highlightParam) {
    const parcel = parcels.find(p => p.trackingNumber === highlightParam);
    if (parcel && parcel.location && parcel.status !== 'shipped') {
      highlightLocation = parcel.location;
    }
  }

  const handleShelfClick = (arg1, arg2, arg3) => {
    let zone, row, shelf;
    if (typeof arg1 === 'object' && arg1 !== null) {
      zone = arg1.zone;
      row = arg1.row;
      shelf = arg1.shelf;
    } else {
      zone = arg1;
      row = arg2;
      shelf = arg3;
    }

    const foundParcels = parcels.filter(p => 
      p.location && 
      p.location.zone === zone && 
      Number(p.location.row) === Number(row) && 
      Number(p.location.shelf) === Number(shelf) &&
      p.status !== 'shipped'
    );
    
    setSelectedShelf({ zone, row, shelf });
    setShelfParcels(foundParcels);
  };

  const closeModal = () => setSelectedShelf(null);

  const zones = ['A', 'B', 'C', 'D'];

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Map className="text-blue-600" />
            แผนผังคลังสินค้า
          </h1>
          <p className="text-gray-500 mt-1">คลิกที่ชั้นวางเพื่อดูพัสดุที่จัดเก็บ</p>
        </div>
        
        {/* Legend */}
        <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500"></div>รับเข้า</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-orange-500"></div>คัดแยก</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500"></div>จัดเก็บ</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-purple-500"></div>พร้อมส่ง</div>
        </div>
      </div>

      {highlightLocation && (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-xl flex items-center gap-3">
          <AlertCircle className="text-blue-500" />
          <p>กำลังเน้นพัสดุ {highlightParam} อยู่ที่ <strong>โซน {highlightLocation.zone} แถว {highlightLocation.row} ชั้น {highlightLocation.shelf}</strong></p>
        </div>
      )}

      {/* Warehouse Layout Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 md:gap-12 p-4 md:p-8 bg-gray-100 rounded-2xl border border-gray-200">
        {zones.map(zoneId => {
          const isHighlightedZone = zoneParam === zoneId || (highlightLocation && highlightLocation.zone === zoneId);
          const occupancy = getZoneOccupancy(parcels, zoneId);
          const percentage = occupancy.percentage || 0;
          
          return (
            <div key={zoneId} className={`relative flex flex-col bg-white p-6 rounded-xl shadow-sm border-2 transition-all ${isHighlightedZone ? 'border-blue-500 shadow-md ring-4 ring-blue-100' : 'border-transparent'}`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">โซน {zoneId}</h2>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-600">ความจุ {percentage}%</div>
                  <div className="text-xs text-gray-400">{occupancy.used} / {occupancy.total} พัสดุ</div>
                </div>
              </div>
              
              <div className="flex-1">
                <ZoneGrid 
                  zoneId={zoneId} 
                  parcels={parcels} 
                  onShelfClick={handleShelfClick}
                  highlightLocation={highlightLocation?.zone === zoneId ? highlightLocation : null}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Shelf Detail Modal */}
      <Modal 
        isOpen={!!selectedShelf} 
        onClose={closeModal} 
        title={`ข้อมูลชั้นวาง: โซน ${selectedShelf?.zone} แถว ${selectedShelf?.row} ชั้น ${selectedShelf?.shelf}`}
      >
        <div className="space-y-4 min-h-[200px]">
          <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
            <span className="text-gray-600 font-medium">จำนวนพัสดุทั้งหมด</span>
            <span className="text-lg font-bold text-blue-600">{shelfParcels.length} / 6</span>
          </div>

          {shelfParcels.length > 0 ? (
            <div className="space-y-3 mt-4 max-h-[60vh] overflow-y-auto pr-2">
              {shelfParcels.map(parcel => (
                <div 
                  key={parcel.trackingNumber} 
                  onClick={() => navigate(`/parcel/${parcel.trackingNumber}`)}
                  className="p-3 border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-sm cursor-pointer transition-all flex flex-col gap-2"
                >
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-gray-900">{parcel.trackingNumber}</span>
                    <StatusBadge status={parcel.status} />
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{parcel.category}</span>
                    <span>ช่องที่ {parcel.location.slot}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <Map size={48} className="mb-3 opacity-20" />
              <p className="font-medium text-gray-500">ชั้นวางนี้ว่างเปล่า</p>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
