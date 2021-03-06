/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import CustomerLayout from "layouts/Customer.js";
import AuthLayout from "layouts/Auth.js";
import ProtectedRoute from './components/ProtectedRoute'

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <ProtectedRoute path="/admin" component={AdminLayout} />
      <ProtectedRoute path="/customer" component={CustomerLayout} />
      <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
      <Redirect from="/" to="/customer/index" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
