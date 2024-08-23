import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from './AuthContext.jsx';

const ProtectedRoute = ({ element: Component }) => {
    const { authState } = useAuthContext();
    const location = useLocation();

    return authState.isAuthenticated ? (
        <Component />
    ) : (
        <Navigate to="/login" state={{ from: location }} />
    );
};

export default ProtectedRoute;
