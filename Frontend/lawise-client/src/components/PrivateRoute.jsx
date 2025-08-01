// src/components/PrivateRoute.jsx
/*import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../context/authcontext';

const PrivateRoute = ({ component: Component, allowedRoles, ...rest }) => {
    const { isAuthenticated, userRole } = useContext(AuthContext); // Assuming you have these in your AuthContext

    return (
        <Route
            {...rest}
            render={props => {
                if (!isAuthenticated) {
                    return <Redirect to="/" />; // Redirect to login if not authenticated
                }
                if (!allowedRoles.includes(userRole)) {
                    return <Redirect to="/unauthorized" />; // Redirect if role is not allowed
                }
                return <Component {...props} />;
            }}
        />
    );
};

export default PrivateRoute;
*/