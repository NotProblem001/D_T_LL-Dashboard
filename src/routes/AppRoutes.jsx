import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import AppLayout from '../components/layout/AppLayout';
import Login from '../modules/auth/Login';
import Resumen from '../pages/Resumen';
import ReportesFacturacion from '../pages/ReportesFacturacion';
import Pasajeros from '../pages/Pasajeros';

function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) return <div>Cargando...</div>;
    if (!user) return <Navigate to="/login" replace />;

    return children;
}

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />

            <Route path="/" element={
                <ProtectedRoute>
                    <AppLayout />
                </ProtectedRoute>
            }>
                <Route index element={<Resumen />} />
                <Route path="reportes-facturacion" element={<ReportesFacturacion />} />
                <Route path="pasajeros" element={<Pasajeros />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
