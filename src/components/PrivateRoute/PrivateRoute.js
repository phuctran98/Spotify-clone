import React from 'react'
import { Redirect,Route } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const PrivateRoute = ({ children, ...rest })=> {
    let auth = useAuth();
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.user ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/signup",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

export default PrivateRoute