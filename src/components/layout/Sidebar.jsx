import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, Users, Truck } from 'lucide-react';
import clsx from 'clsx';
import { useAuth } from '../../context/useAuth';

const NAV_ITEMS = [
    { label: 'Resumen', path: '/', icon: LayoutDashboard },
    { label: 'Reportes de Facturación', path: '/reportes-facturacion', icon: FileText },
    { label: 'Pasajeros', path: '/pasajeros', icon: Users },
];

export default function Sidebar() {
    const { user } = useAuth();

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <Truck size={22} className="text-blue-600" />
                <h2>Portal Empresa</h2>
            </div>

            <nav className="sidebar-nav">
                <ul>
                    {NAV_ITEMS.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                end={item.path === '/'}
                                className={({ isActive }) => clsx('nav-link', isActive && 'active')}
                            >
                                <item.icon size={20} />
                                <span>{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="sidebar-footer">
                <div className="user-info">
                    <div className="avatar">{user?.nombre?.charAt(0) || 'E'}</div>
                    <div className="details">
                        <span className="name">{user?.nombre || 'Empresa'}</span>
                        <span className="role">{user?.rol || 'Guest'}</span>
                    </div>
                </div>
            </div>

            <style>{`
        .sidebar {
          width: var(--sidebar-width);
          height: 100vh;
          background-color: var(--bg-card);
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          position: fixed;
          left: 0;
          top: 0;
          z-index: 50;
        }

        .sidebar-header {
          height: var(--topbar-height);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0 1.5rem;
          border-bottom: 1px solid var(--border);
        }

        .sidebar-header h2 {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--primary);
        }

        .sidebar-nav {
          flex: 1;
          padding: 1.5rem 1rem;
          overflow-y: auto;
        }

        .sidebar-nav ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          color: var(--text-muted);
          font-weight: 500;
          transition: all 0.2s;
        }

        .nav-link:hover {
          background-color: #eff6ff;
          color: var(--primary);
        }

        .nav-link.active {
          background-color: #eff6ff;
          color: var(--primary);
        }

        .sidebar-footer {
          padding: 1rem;
          border-top: 1px solid var(--border);
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .avatar {
          width: 36px;
          height: 36px;
          background-color: var(--primary);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
        }

        .details {
          display: flex;
          flex-direction: column;
        }

        .details .name {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .details .role {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
      `}</style>
        </aside>
    );
}
