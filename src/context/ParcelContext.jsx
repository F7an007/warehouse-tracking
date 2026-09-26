import React, { createContext, useContext, useReducer, useState } from 'react';
import { parcels as initialParcels } from '../data/mockParcels';

const ParcelContext = createContext();

const parcelReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_STATUS':
      return state.map(parcel => {
        if (parcel.id === action.payload.id || parcel.trackingNumber === action.payload.trackingNumber) {
          const newTimelineEntry = {
            id: `t${parcel.timeline.length + 1}`,
            action: action.payload.actionText || 'เปลี่ยนสถานะ',
            status: action.payload.newStatus,
            location: action.payload.newLocation || parcel.location,
            timestamp: new Date().toISOString(),
            operator: action.payload.operatorName || 'พนักงาน'
          };
          return {
            ...parcel,
            status: action.payload.newStatus,
            location: action.payload.newStatus === 'shipped' ? null : (action.payload.newLocation || parcel.location),
            timeline: [...parcel.timeline, newTimelineEntry]
          };
        }
        return parcel;
      });
    case 'MOVE_PARCEL':
      return state.map(parcel => {
        if (parcel.id === action.payload.id || parcel.trackingNumber === action.payload.trackingNumber) {
          const newTimelineEntry = {
            id: `t${parcel.timeline.length + 1}`,
            action: 'ย้ายตำแหน่ง',
            status: parcel.status,
            location: `โซน ${action.payload.newLocation.zone} แถว ${action.payload.newLocation.row} ชั้น ${action.payload.newLocation.shelf}`,
            timestamp: new Date().toISOString(),
            operator: action.payload.operatorName || 'พนักงาน'
          };
          return {
            ...parcel,
            location: action.payload.newLocation,
            timeline: [...parcel.timeline, newTimelineEntry]
          };
        }
        return parcel;
      });
    case 'IMPORT_PARCEL':
      return [...state, action.payload];
    case 'SIMULATE_REALTIME':
      return state.map(parcel => {
        if (parcel.trackingNumber === action.payload.trackingNumber) {
          const newTimelineEntry = {
            id: `t${parcel.timeline.length + 1}`,
            action: action.payload.actionText,
            status: action.payload.newStatus,
            location: action.payload.newLocation,
            timestamp: new Date().toISOString(),
            operator: 'System (Auto)'
          };
          return {
            ...parcel,
            status: action.payload.newStatus,
            location: action.payload.newLocation,
            timeline: [...parcel.timeline, newTimelineEntry]
          };
        }
        return parcel;
      });
    default:
      return state;
  }
};

export const ParcelProvider = ({ children }) => {
  const [parcels, dispatch] = useReducer(parcelReducer, initialParcels);
  const [filters, setFilters] = useState({ status: 'all', zone: 'all', priority: 'all' });

  // Simulate real-time updates
  React.useEffect(() => {
    const interval = setInterval(() => {
      // Find parcels that are not shipped
      const activeParcels = parcels.filter(p => p.status !== 'shipped');
      if (activeParcels.length > 0) {
        // Pick a random active parcel
        const randomParcel = activeParcels[Math.floor(Math.random() * activeParcels.length)];
        
        const statusFlow = ['received', 'sorting', 'stored', 'ready_to_ship', 'shipped'];
        const currentIndex = statusFlow.indexOf(randomParcel.status);
        
        if (currentIndex !== -1 && currentIndex < statusFlow.length - 1) {
          const newStatus = statusFlow[currentIndex + 1];
          let newLocation = randomParcel.location;
          let actionText = 'อัปเดตสถานะอัตโนมัติ';

          if (newStatus === 'sorting') {
            actionText = 'กำลังดำเนินการคัดแยกพัสดุ';
          } else if (newStatus === 'stored') {
            actionText = 'จัดเก็บขึ้นชั้นเรียบร้อย';
            if (!newLocation) newLocation = { zone: ['A','B','C'][Math.floor(Math.random()*3)], row: Math.floor(Math.random()*5)+1, shelf: Math.floor(Math.random()*3)+1 };
          } else if (newStatus === 'ready_to_ship') {
            actionText = 'เตรียมจัดส่ง';
          } else if (newStatus === 'shipped') {
            actionText = 'ส่งมอบให้บริษัทขนส่งแล้ว';
            newLocation = null;
          }

          dispatch({
            type: 'SIMULATE_REALTIME',
            payload: { trackingNumber: randomParcel.trackingNumber, newStatus, newLocation, actionText }
          });
        }
      }
    }, 15000); // Simulate every 15 seconds

    return () => clearInterval(interval);
  }, [parcels]);

  const getParcelByTracking = (trackingNumber) => {
    return parcels.find(p => p.trackingNumber === trackingNumber);
  };

  const updateParcelStatus = (trackingNumber, newStatus, newLocation, operatorName, actionText) => {
    dispatch({
      type: 'UPDATE_STATUS',
      payload: { trackingNumber, newStatus, newLocation, operatorName, actionText }
    });
  };

  const importParcel = (newParcel) => {
    dispatch({
      type: 'IMPORT_PARCEL',
      payload: newParcel
    });
  };

  const moveParcel = (trackingNumber, newLocation, operatorName) => {
    dispatch({
      type: 'MOVE_PARCEL',
      payload: { trackingNumber, newLocation, operatorName }
    });
  };

  const searchParcels = (query) => {
    if (!query) return parcels;
    const q = query.toLowerCase();
    return parcels.filter(p => 
      p.trackingNumber.toLowerCase().includes(q) ||
      p.senderName.toLowerCase().includes(q) ||
      p.recipientName.toLowerCase().includes(q)
    );
  };

  const getStats = () => {
    const stats = { received: 0, sorting: 0, stored: 0, ready_to_ship: 0, shipped: 0, total: parcels.length };
    parcels.forEach(p => {
      if (stats[p.status] !== undefined) stats[p.status]++;
    });
    return stats;
  };

  const getRecentActivity = (limit = 10) => {
    const allActivity = parcels.flatMap(p => 
      p.timeline.map(t => ({
        ...t,
        trackingNumber: p.trackingNumber,
        parcelId: p.id
      }))
    );
    return allActivity.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, limit);
  };

  const filteredParcels = parcels.filter(p => {
    const matchStatus = filters.status === 'all' || p.status === filters.status;
    const matchZone = filters.zone === 'all' || (p.location && p.location.zone === filters.zone);
    const matchPriority = filters.priority === 'all' || p.priority === filters.priority;
    return matchStatus && matchZone && matchPriority;
  });

  return (
    <ParcelContext.Provider value={{
      parcels,
      filteredParcels,
      filters,
      setFilters,
      getParcelByTracking,
      updateParcelStatus,
      moveParcel,
      importParcel,
      searchParcels,
      getStats,
      getRecentActivity
    }}>
      {children}
    </ParcelContext.Provider>
  );
};

export const useParcelContext = () => useContext(ParcelContext);
