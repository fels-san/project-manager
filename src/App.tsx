import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./pages/Root";
import Home from "./pages/Home";
import ProjectForm from "./pages/ProjectForm";
import Project from "./pages/Project";
import EmployeeProfile from "./pages/EmployeeProfile";
import EditEmployee from "./pages/EditEmployee";
import Statitic from "./pages/Statistic";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "project",
          children: [
            { path: "new", element: <ProjectForm /> },
            { path: ":projectId", element: <Project /> },
            { path: ":projectId/edit", element: <ProjectForm /> },
          ],
        },
        {
          path: "employee",
          children: [
            { path: ":employeeName", element: <EmployeeProfile /> },
            { path: ":employeeName/edit", element: <EditEmployee /> },
          ],
        },
        { path: "statitic", element: <Statitic /> },
      ],
    },
  ],
  {
    basename: "/project-manager/",
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
