// import { React, useContext } from "react";
import { React } from "react";
import { useSelector } from "react-redux";

// import { ProjectManagementContext } from "../../store/project-management-context";

import GeneralPage from "./generalPage/GeneralPage";
import ProjectForm from "./projectForm/ProjectForm";
import Project from "./projectPage/Project";
import EmployeeProfile from "./EmployeeProfile";
import EditEmployee from "./EditEmployee";

export default function CurrentPage() {
  // const { actionType, selectedProject, selectedEmployee } = useContext(
  //   ProjectManagementContext
  // );
  const actionType = useSelector((state) => state.projectManagement.actionType);
  const selectedProject = useSelector((state) => state.projectManagement.selectedProject);
  const selectedEmployee = useSelector((state) => state.projectManagement.selectedEmployee);

  if (actionType === "none") {
    return <GeneralPage />;
  }
  if (actionType === "creating") {
    return <ProjectForm />;
  }
  if (actionType === "editing") {
    return <Project project={selectedProject} />;
  }
  if (actionType === "editProject") {
    return <ProjectForm project={selectedProject} />;
  }
  if (actionType === "viewingProfile") {
    return <EmployeeProfile employee={selectedEmployee} />;
  }
  if (actionType === "editingProfile") {
    return <EditEmployee employee={selectedEmployee} />;
  }

  return null;
}
