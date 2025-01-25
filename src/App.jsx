import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./pages/Root";
import GeneralPage from "./components/currentPage/generalPage/GeneralPage";
import ProjectForm from "./components/currentPage/projectForm/ProjectForm";
import Project from "./components/currentPage/projectPage/Project";
import EmployeeProfile from "./components/currentPage/EmployeeProfile";
import EditEmployee from "./components/currentPage/EditEmployee";
// import ProjectManagementContextProvider from "./store/project-management-context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <GeneralPage /> },
      { path: "/project/new", element: <ProjectForm /> },
      { path: "/project/:projectId", element: <Project /> },
      { path: "/project/:projectId/edit", element: <ProjectForm />},
      { path: "/employee/:employeeId", element: <EmployeeProfile /> },
      { path: "/employee/:employeeId/edit", element: <EditEmployee /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
