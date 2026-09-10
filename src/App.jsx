import { Routes, Route } from 'react-router-dom'
import { ParcelProvider } from './context/ParcelContext'
import AppLayout from './components/Layout/AppLayout'
import Dashboard from './pages/Dashboard'
import ParcelSearch from './pages/ParcelSearch'
import ParcelDetail from './pages/ParcelDetail'
import ParcelList from './pages/ParcelList'
import WarehouseMap from './pages/WarehouseMap'

function App() {
  return (
    <ParcelProvider>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/search" element={<ParcelSearch />} />
          <Route path="/parcel/:trackingNumber" element={<ParcelDetail />} />
          <Route path="/parcels" element={<ParcelList />} />
          <Route path="/map" element={<WarehouseMap />} />
        </Routes>
      </AppLayout>
    </ParcelProvider>
  )
}

export default App
