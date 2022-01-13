import React from 'react';
import { useCookies } from 'react-cookie';
import { Navigate, useLocation } from 'react-router-dom';

function PrivateRoute({ children }) {
    const [cookies] = useCookies(['cookie']);
    const location = useLocation();

    if (!cookies.token)
        return (
            <Navigate to='/login' state={{ from: location }} replace={false} />
        );
    return children;
}

export default PrivateRoute;
