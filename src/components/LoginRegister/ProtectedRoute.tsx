// src/components/LoginRegister/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { UserRole } from '../../types/users';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: UserRole;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (Array.isArray(user.roles)) {
        const userRoles = user.roles.map((role) => {
            return role.role_name;
        });

        if (requiredRole && !userRoles.includes(requiredRole.toUpperCase())) {
            return <Navigate to="/dashboard" />;
        }
    }




    return <>{children}</>;
};

export default ProtectedRoute;
