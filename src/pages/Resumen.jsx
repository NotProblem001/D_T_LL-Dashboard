import { useEffect, useState } from 'react';
import { Car, Users } from 'lucide-react';
import { obtenerResumen } from '../services/api';

const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

export default function Resumen() {
    const [resumen, setResumen] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        obtenerResumen()
            .then(setResumen)
            .catch(() => setError('No se pudo cargar el resumen operativo.'))
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <div>
            <h1 className="page-title">Resumen Operativo</h1>

            {error && <div className="text-red-600 text-sm mb-4">{error}</div>}

            {isLoading ? (
                <div className="text-gray-400">Cargando...</div>
            ) : !resumen ? null : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                    <div className="card">
                        <Car className="text-dtll-blue mb-2" size={24} />
                        <p className="text-2xl font-bold text-gray-900">{resumen.viajesEsteMes}</p>
                        <p className="text-sm text-gray-500">
                            Viajes en {MESES[resumen.mesFiscal - 1]} {resumen.anioFiscal}
                        </p>
                    </div>
                    <div className="card">
                        <Users className="text-dtll-blue mb-2" size={24} />
                        <p className="text-2xl font-bold text-gray-900">{resumen.pasajerosActivos}</p>
                        <p className="text-sm text-gray-500">Pasajeros activos</p>
                    </div>
                </div>
            )}

            <style>{`
        .page-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
        }
        .card {
          padding: 1.5rem;
          background: white;
          border-radius: 0.75rem;
          border: 1px solid var(--border);
        }
      `}</style>
        </div>
    );
}
