import { FaTachometerAlt, FaWarehouse, FaBoxOpen, FaTruck, FaUsers, FaArrowCircleDown, FaShoppingCart, FaChartBar, FaFileInvoice } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const links = [
  { icon: <FaTachometerAlt />, name: 'Dashboard', to: '/dashboard' },
  { icon: <FaWarehouse />, name: 'Bodegas', to: '/bodegas' },
  { icon: <FaBoxOpen />, name: 'Productos', to: '/productos' },
  { icon: <FaTruck />, name: 'Proveedores', to: '#' },
  { icon: <FaUsers />, name: 'Clientes', to: '#' },
  { icon: <FaArrowCircleDown />, name: 'Ingresos de stock', to: '#' },
  { icon: <FaShoppingCart />, name: 'Ventas', to: '#' },
  { icon: <FaChartBar />, name: 'Reportes', to: '#' },
  { icon: <FaFileInvoice />, name: 'Facturación', to: '#' },
];

function Sidebar({ username, onLogout }) {
  return (
    <aside className="w-55 h-screen bg-sidebar text-sidebar-foreground flex flex-col p-5 fixed left-0 top-0 border-r border-sidebar-border">
      <h3 className="text-lg font-semibold mb-6">Menú</h3>
      <div className="mb-6 text-sm">
        <span>Bienvenido, <strong>{username}</strong></span>
      </div>
      <nav className="flex-1">
        <ul className="space-y-3">
          {links.map(link => (
            <li key={link.name}>
              {link.to.startsWith('/') ? (
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 hover:text-primary transition ${isActive ? 'text-primary font-semibold' : ''}`
                  }
                  end
                >
                  <span className="text-lg">{link.icon}</span>
                  <span>{link.name}</span>
                </NavLink>
              ) : (
                <span className="flex items-center gap-3 opacity-60 cursor-not-allowed">
                  <span className="text-lg">{link.icon}</span>
                  <span>{link.name}</span>
                </span>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <button
        onClick={onLogout}
        className="mt-auto w-full py-2 rounded bg-destructive text-destructive-foreground font-medium hover:bg-destructive/80 transition"
      >
        Cerrar sesión
      </button>
    </aside>
  );
}

export default Sidebar;
