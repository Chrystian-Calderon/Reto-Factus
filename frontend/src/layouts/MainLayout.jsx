import Sidebar from '../components/Sidebar.jsx';
import Navbar from '../components/Navbar.jsx';

function MainLayout({ children, username, role, onLogout }) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar username={username} onLogout={onLogout} />
      <div className="flex-1 flex flex-col" style={{ marginLeft: 220 }}>
        <Navbar role={role} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

export default MainLayout;
