import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { logout } from './services/auth';
import { getSession } from './services/session';
import Login from './pages/Login';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Productos from './pages/Productos';
import Bodegas from './pages/Bodegas';

function App() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  useEffect(() => {
    (async () => {
      const sessionUser = await getSession();
      setUser(sessionUser);
      setLoading(false);
    })();
  }, []);

  if (loading) return null;
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <MainLayout username={user.name} role={user.role_name} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/bodegas" element={<Bodegas />} />
          {/* Agrega más rutas aquí según tus páginas */}
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
