import { useContext } from "react";

import { ProjectManagementContext } from "../../store/project-management-context";

import GeneralPage from "./generalPage/GeneralPage";
import NewProject from "./newProjectPage/NewProject";
import EditProject from "./newProjectPage/EditProject";
import Project from "./projectPage/Project";

export default function CurrentPage() {
  const { actionType, selectedProject } = useContext(ProjectManagementContext);

  if (actionType === "none") {
    return <GeneralPage />;
  }
  if (actionType === "creating") {
    return <NewProject />;
  }
  if (actionType === "editing") {
    return <Project project={selectedProject} />;
  }
  if (actionType === "editProject") {
    return <EditProject project={selectedProject} />;
  }

  return null;
}
