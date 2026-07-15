import { useEffect, useState } from 'react';
import DataTable from '../components/common/DataTable';
import { obtenerReportesFacturacion } from '../services/api';

const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const COLUMNS = [
    { header: 'Periodo', cell: (r) => `${MESES[r.mesFiscal - 1]} ${r.anioFiscal}` },
    { header: 'Viajes Ejecutados', accessor: 'totalViajesEjecutados' },
    { header: 'Monto Exento', cell: (r) => `$${Number(r.montoExentoTotal).toLocaleString('es-CL')}` },
    { header: 'Estado', cell: (r) => <span className="badge">{r.estadoDocumento}</span> },
];

export default function ReportesFacturacion() {
    const [reportes, setReportes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        obtenerReportesFacturacion()
            .then(setReportes)
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <div>
            <h1 className="page-title">Reportes de Facturación</h1>
            <DataTable columns={COLUMNS} data={reportes} isLoading={isLoading} />

            <style>{`
        .page-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
        }
        .badge {
          background-color: #eff6ff;
          color: var(--primary);
          padding: 0.25rem 0.625rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
        }
      `}</style>
        </div>
    );
}
