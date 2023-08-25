import React from "react";
import SidebarDrawer from "./components/SidebarDrawer";
import Navbar from "./components/Navbar";
import Vulnerable from "./components/Vulnerable";
import User from "./components/User";
import Mitigated from "./components/Mitigated";

import Home from "./components/Home";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Error from "./components/Error";
import Welcome from "./components/Welcome";
import { createBrowserRouter, Outlet } from "react-router-dom";

export const App = () => {
  return (
    <React.Fragment>
      <Navbar />
      <SidebarDrawer />
      <Outlet />
    </React.Fragment>
  );
};

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
      {
        path: "vulnerable",
        element: (
          <PrivateRoute>
            <Vulnerable />
          </PrivateRoute>
        ),
      },
      {
        path: "user",
        element: (
          <PrivateRoute>
            <User />
          </PrivateRoute>
        ),
      },
      {
        path: "mitigated",
        element: (
          <PrivateRoute>
            <Mitigated />
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "login",
    element: <Login />,
  },
  {
    path: "welcome",
    element: <Welcome />,
  },
]);
