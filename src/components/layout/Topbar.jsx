import { useEffect, useState } from 'react';
import { LogOut, Building2 } from 'lucide-react';
import { useAuth } from '../../context/useAuth';
import { obtenerEmpresas } from '../../services/api';

export default function Topbar() {
    const { user, logout } = useAuth();
    const esAdmin = user?.rol === 'ADMIN';
    const [empresas, setEmpresas] = useState([]);
    const [empresaSeleccionada, setEmpresaSeleccionada] = useState(
        () => localStorage.getItem('empresa_seleccionada') || ''
    );

    useEffect(() => {
        if (!esAdmin) return;
        obtenerEmpresas()
            .then((lista) => {
                setEmpresas(lista);
                const actual = localStorage.getItem('empresa_seleccionada');
                const valida = actual && lista.some((e) => e.id === actual);
                if (!valida && lista.length > 0) {
                    localStorage.setItem('empresa_seleccionada', lista[0].id);
                    window.location.reload();
                }
            })
            .catch(() => setEmpresas([]));
    }, [esAdmin]);

    const cambiarEmpresa = (event) => {
        const id = event.target.value;
        setEmpresaSeleccionada(id);
        localStorage.setItem('empresa_seleccionada', id);
        window.location.reload();
    };

    return (
        <header className="topbar">
            <span className="title">Panel de Empresa</span>

            <div className="topbar-right">
                {esAdmin && (
                    <div className="empresa-selector">
                        <Building2 size={16} />
                        {empresas.length > 0 ? (
                            <select value={empresaSeleccionada} onChange={cambiarEmpresa}>
                                {empresas.map((e) => (
                                    <option key={e.id} value={e.id}>{e.nombre}</option>
                                ))}
                            </select>
                        ) : (
                            <span className="sin-empresas">Sin empresas registradas</span>
                        )}
                    </div>
                )}

                <button onClick={logout} className="logout-btn">
                    <LogOut size={18} />
                    <span>Salir</span>
                </button>
            </div>

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

        .topbar-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .empresa-selector {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-muted);
          font-size: 0.875rem;
        }

        .empresa-selector select {
          border: 1px solid var(--border);
          border-radius: 0.5rem;
          padding: 0.35rem 0.5rem;
          font-size: 0.875rem;
          background-color: var(--bg-card);
          color: var(--text-main);
        }

        .sin-empresas {
          font-style: italic;
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
