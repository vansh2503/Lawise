import React, {Component, useContext} from 'react';
import {Route,Redirect} from 'react-router-dom';
import AuthContext from '../context/authcontext';

const ProtectedRoute = ({ component: Component, role, ...rest }) => {
    const { user } = useContext(AuthContext);
  
    return (
      <Route
        {...rest}
        render={(props) =>
          user && user.role === role ? <Component {...props} /> : <Redirect to="/login" />
        }
      />
    );
  };
  
  export default ProtectedRoute;