// components/RequireAdmin.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const RequireAdmin = ({ children }: { children: React.ReactNode }) => {
    const role = localStorage.getItem('role');

    if (role !== 'ADMIN') {
        return <Navigate to="/home" replace />;
    }

    return <>{children}</>;
};

export default RequireAdmin;
