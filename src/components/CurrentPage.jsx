import { useContext } from "react";

import { ProjectManagementContext } from "../store/project-management-context";

import EmptyPage from "./EmptyPage";
import NewProject from "./NewProject";
import Project from "./Project";

export default function CurrentPage() {
  const { actionType, selectedProject } = useContext(ProjectManagementContext);

  if (actionType === "none") {
    return <EmptyPage />;
  }
  if (actionType === "creating") {
    return <NewProject />;
  }
  if (actionType === "editing") {
    return <Project project={selectedProject} />;
  }

  return null;
}