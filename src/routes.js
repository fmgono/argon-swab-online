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
import Index from "views/Index.js";
import Register from "views/register/index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
// import Register from "views/examples/Register.js";
import Login from "views/login/index";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import CustomerDashboard from "views/customers/Dashboard";
import CustomerProfile from "views/customers/Profile.js";
import CustomerQueueForm from "views/customers/QueueForm.js";
import CustomerChangePassword from "views/customers/ChangePassword.js";
import AdminDashboard from "views/admin/Dashboard";
import UserList from "views/admin/User";
import BookingOrder from "views/admin/BookingOrder";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: AdminDashboard,
    isShow: true,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Pengguna",
    icon: "fas fa-users text-yellow",
    component: UserList,
    isShow: true,
    layout: "/admin",
  },
  {
    path: "/orders",
    name: "Booking Order",
    icon: "ni ni-bullet-list-67 text-red",
    component: BookingOrder,
    isShow: true,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    isShow: false,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    isShow: false,
    layout: "/auth",
  },
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: CustomerDashboard,
    isShow: false,
    layout: "/customer",
  },
  {
    path: "/profile",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: CustomerProfile,
    isShow: false,
    layout: "/customer",
  },
  {
    path: "/booking/add",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: CustomerQueueForm,
    isShow: false,
    layout: "/customer",
  },
  {
    path: "/change-password",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: CustomerChangePassword,
    isShow: false,
    layout: "/customer",
  },
];
export default routes;
