import { useEffect, useState } from 'react';
import DataTable from '../components/common/DataTable';
import { obtenerPasajeros } from '../services/api';

const COLUMNS = [
    { header: 'ID Interno', accessor: 'identificadorInterno' },
    { header: 'Nombre', accessor: 'nombreCompleto' },
    { header: 'Comuna', accessor: 'comuna' },
    { header: 'Punto de Parada', accessor: 'puntoParadaAsignado' },
    {
        header: 'Estado',
        cell: (r) => (
            <span className={r.activo ? 'badge badge-ok' : 'badge badge-off'}>
                {r.activo ? 'Activo' : 'Inactivo'}
            </span>
        ),
    },
];

export default function Pasajeros() {
    const [pasajeros, setPasajeros] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        obtenerPasajeros()
            .then(setPasajeros)
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <div>
            <h1 className="page-title">Nómina de Pasajeros</h1>
            <DataTable columns={COLUMNS} data={pasajeros} isLoading={isLoading} />

            <style>{`
        .page-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
        }
        .badge {
          padding: 0.25rem 0.625rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
        }
        .badge-ok {
          background-color: #dcfce7;
          color: #16a34a;
        }
        .badge-off {
          background-color: #f3f4f6;
          color: #6b7280;
        }
      `}</style>
        </div>
    );
}
