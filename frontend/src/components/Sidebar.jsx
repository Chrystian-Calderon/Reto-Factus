import React from 'react';

function Sidebar({ username, onLogout }) {
  return (
    <aside style={{ width: 220, background: '#f4f4f4', height: '100vh', padding: 20, boxSizing: 'border-box', position: 'fixed', left: 0, top: 0 }}>
      <h3>Menú</h3>
      <div style={{ marginBottom: 24 }}>
        <span>Bienvenido, <strong>{username}</strong></span>
      </div>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: 12 }}><a href="#">Dashboard</a></li>
          {/* Agrega más enlaces aquí */}
        </ul>
      </nav>
      <button onClick={onLogout} style={{ marginTop: 32, width: '100%' }}>Cerrar sesión</button>
    </aside>
  );
}

export default Sidebar;
