import { Routes, Route, Navigate } from 'react-router-dom'
import { ParcelProvider } from './context/ParcelContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import AppLayout from './components/Layout/AppLayout'
import Dashboard from './pages/Dashboard'
import ParcelSearch from './pages/ParcelSearch'
import ParcelDetail from './pages/ParcelDetail'
import ParcelList from './pages/ParcelList'
import WarehouseMap from './pages/WarehouseMap'
import LoginPage from './pages/LoginPage'

// Route guard: requires login
function RequireAuth({ children }) {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn()) return <Navigate to="/login" replace />;
  return children;
}

// Route guard: staff only
function RequireStaff({ children }) {
  const { isLoggedIn, isStaff } = useAuth();
  if (!isLoggedIn()) return <Navigate to="/login" replace />;
  if (!isStaff()) return <Navigate to="/search" replace />;
  return children;
}

function AppRoutes() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn()) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <ParcelProvider>
      <AppLayout>
        <Routes>
          {/* Staff-only routes */}
          <Route path="/" element={<RequireStaff><Dashboard /></RequireStaff>} />
          <Route path="/parcels" element={<RequireStaff><ParcelList /></RequireStaff>} />
          <Route path="/map" element={<RequireStaff><WarehouseMap /></RequireStaff>} />

          {/* Both staff & customer can access */}
          <Route path="/search" element={<RequireAuth><ParcelSearch /></RequireAuth>} />
          <Route path="/parcel/:trackingNumber" element={<RequireAuth><ParcelDetail /></RequireAuth>} />

          {/* Fallback */}
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppLayout>
    </ParcelProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App
