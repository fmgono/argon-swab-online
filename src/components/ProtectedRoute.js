import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuthState } from '../store/auth';

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const { isAuthenticated } = useAuthState()

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated.value ? <Component {...props} /> : <Redirect to="/auth/login" />
      }
    />
  );
}

export default ProtectedRoute;