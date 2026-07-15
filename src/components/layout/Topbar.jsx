import { LogOut } from 'lucide-react';
import { useAuth } from '../../context/useAuth';

export default function Topbar() {
    const { logout } = useAuth();

    return (
        <header className="topbar">
            <span className="title">Panel de Empresa</span>

            <button onClick={logout} className="logout-btn">
                <LogOut size={18} />
                <span>Salir</span>
            </button>

            <style>{`
        .topbar {
          height: var(--topbar-height);
          background-color: var(--bg-card);
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
          position: sticky;
          top: 0;
          z-index: 40;
        }

        .title {
          font-weight: 600;
          color: var(--text-main);
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: none;
          color: var(--text-muted);
          font-weight: 500;
          font-size: 0.875rem;
          padding: 0.5rem 0.75rem;
          border-radius: 0.5rem;
          transition: all 0.2s;
        }

        .logout-btn:hover {
          background-color: #fee2e2;
          color: #dc2626;
        }
      `}</style>
        </header>
    );
}
