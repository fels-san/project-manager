import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./pages/Root";
import Home from "./pages/Home";
import ProjectForm from "./pages/ProjectForm";
import Project from "./pages/Project";
import EmployeeProfile from "./pages/EmployeeProfile";
import EditEmployee from "./pages/EditEmployee";
import Statitic from "./pages/Statitic";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/project/new", element: <ProjectForm /> },
      { path: "/project/:projectId", element: <Project /> },
      { path: "/project/:projectId/edit", element: <ProjectForm /> },
      { path: "/employee/:employeeName", element: <EmployeeProfile /> },
      { path: "/employee/:employeeName/edit", element: <EditEmployee /> },
      { path: "/statitic", element: <Statitic /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
