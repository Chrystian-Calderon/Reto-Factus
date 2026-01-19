import { FaBell, FaCog, FaUser, FaUserShield } from 'react-icons/fa';

function Navbar({ title = 'Reto Factus', role = 'Usuario' }) {
  return (
    <nav className="flex items-center justify-between h-16 px-6 bg-card border-b border-border">
      <div className="text-xl font-bold text-foreground">{title}</div>
      <div className="flex items-center gap-4">
        <span className="text-muted-foreground text-sm font-medium flex items-center gap-2">
          <FaUserShield className="text-lg" /> {role}
        </span>
        <button className="p-2 rounded-full hover:bg-muted transition" title="Notificaciones">
          <FaBell className="text-xl text-muted-foreground" />
        </button>
        <button className="p-2 rounded-full hover:bg-muted transition" title="Ajustes">
          <FaCog className="text-xl text-muted-foreground" />
        </button>
        <button className="p-2 rounded-full hover:bg-muted transition" title="Usuario">
          <FaUser className="text-xl text-muted-foreground" />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
