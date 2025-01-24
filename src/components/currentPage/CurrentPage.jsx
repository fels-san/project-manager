import { React } from "react";
import { useSelector } from "react-redux";

import GeneralPage from "./generalPage/GeneralPage";
import ProjectForm from "./projectForm/ProjectForm";
import Project from "./projectPage/Project";
import EmployeeProfile from "./EmployeeProfile";
import EditEmployee from "./EditEmployee";

export default function CurrentPage() {
  const employees = useSelector((state) => state.employees.employees);
  const projects = useSelector((state) => state.projects.projects);
  const actionType = useSelector((state) => state.ui.actionType);
  const selectedProjectId = useSelector(
    (state) => state.ui.selectedProjectId
  );
  const selectedEmployeeId = useSelector(
    (state) => state.ui.selectedEmployeeId
  );

  if (actionType === "none") {
    return <GeneralPage />;
  }
  if (actionType === "creating") {
    return <ProjectForm />;
  }
  if (actionType === "editing") {
    return (
      <Project
        project={projects.find((project) => project.id === selectedProjectId)}
      />
    );
  }
  if (actionType === "editProject") {
    return (
      <ProjectForm
        project={projects.find((project) => project.id === selectedProjectId)}
      />
    );
  }
  if (actionType === "viewingProfile") {
    return (
      <EmployeeProfile
        employee={employees.find(
          (employee) => employee.id === selectedEmployeeId
        )}
      />
    );
  }
  if (actionType === "editingProfile") {
    return (
      <EditEmployee
        employee={employees.find(
          (employee) => employee.id === selectedEmployeeId
        )}
      />
    );
  }

  return null;
}
