import React from "react";
import { Redirect, Route } from "react-router-dom";

import { useState } from '@hookstate/core';
import store from '../store';

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const { user } = useState(store)

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        user.value.id ? <Component {...props} /> : <Redirect to="/auth/login" />
      }
    />
  );
}

export default ProtectedRoute;