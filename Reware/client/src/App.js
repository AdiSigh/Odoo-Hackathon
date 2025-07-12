import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import AddItem from './components/AddItem';
import LandingPage from './components/LandingPage';
import ItemDetail from './components/ItemDetail';
import SwapRequests from './components/SwapRequests'; // ✅ Swap Requests page
import AuthProvider, { AuthContext } from './context/AuthContext';

const RequireAuth = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/auth" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* 🔐 Authentication */}
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Navigate to="/auth" />} />

          {/* 🏠 Landing page after login */}
          <Route path="/landing" element={<RequireAuth><LandingPage /></RequireAuth>} />

          {/* 📦 Dashboard, Add Item */}
          <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
          <Route path="/add-item" element={<RequireAuth><AddItem /></RequireAuth>} />

          {/* 🧾 Item Detail */}
          <Route path="/item/:id" element={<RequireAuth><ItemDetail /></RequireAuth>} />

          {/* 🔁 Swap Requests (NEW) */}
          <Route path="/swap-requests" element={<RequireAuth><SwapRequests /></RequireAuth>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;