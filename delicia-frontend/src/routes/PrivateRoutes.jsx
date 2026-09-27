import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function PrivateRoute({ children }) {
    const { isLoggedIn } = useAuth();
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }
    return children;
}

export function AdminRoute({ children }) {
    const { isLoggedIn, role } = useAuth();
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }
    if (role !== 'ADMIN') {
        return <Navigate to="/" replace />;
    }
    return children;
}