import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ roles, children }) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (roles && !roles.includes(user.roles[0])) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children ? children : <Outlet />;
};

export default ProtectedRoute;
