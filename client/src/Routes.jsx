import React from "react";
import { useRoutes } from "react-router-dom";
import NotFound from "pages/NotFound";
import Taqwahomepage from "pages/Taqwahomepage";
import Registercompany from "pages/Registercompany";
import Personalsignup from "pages/Personalsignup";
import Signin from "pages/Signin/";
import Dashboard from "interface/dashboard";
import Company from "interface/Company";
import TestDashboard from "interface/test";

const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "*", element: <NotFound /> },
    {
      path: "/",
      element: <Taqwahomepage />,
    },
    {
      path: "/dashboard",
      element : <Dashboard />
    },
    {
      path: "registercompany",
      element: <Registercompany />,
    },
    {
      path: "personalsignup",
      element: <Personalsignup />,
    },
    {
      path: "signin",
      element: <Signin />,
    },
    {
      path: "/company",
      element: <Company />
    },
    {
      path: "/dashbo",
      element: <TestDashboard/>
    },
  ]);

  return element;
};

export default ProjectRoutes;
