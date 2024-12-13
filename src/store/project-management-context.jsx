import { createContext, useState, useRef } from "react";

export const ProjectManagementContext = createContext({
  projects: [],
  selectedProject: null,
  actionType: "none",
  createProject: () => {},
  selectProject: () => {},
  cancelProject: () => {},
  addProject: () => {},
  deleteProject: () => {},
  addTask: () => {},
  deleteTask: () => {},
});

export default function ProjectManagementContextProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [actionType, setActionType] = useState("none");

  const projectCounter = useRef(0);

  const selectedProject = projects.find((item) => item.status === "selected");

  function handleAddProject(project) {
    setProjects((prevProjects) => {
      const updatedProjects = [
        ...prevProjects,
        { ...project, id: projectCounter.current++ },
      ];
      return updatedProjects;
    });
    setActionType("none");
  }

  function handleCreateProject() {
    setProjects((prevProjects) =>
      prevProjects.map((project) => ({
        ...project,
        status: "unselected",
      }))
    );
    setActionType("creating");
  }

  function handleCancelProject() {
    setActionType("none");
  }

  function handleSelectProject(selectedId) {
    setProjects((prevProjects) =>
      prevProjects.map((project) => ({
        ...project,
        status: project.id === selectedId ? "selected" : "unselected",
      }))
    );
    setActionType("editing");
  }

  function handleDeleteProject(removedProjectId) {
    setActionType("none");
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== removedProjectId)
    );
  }

  function handleAddTask(projectId, taskTitle, taskId) {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: [...project.tasks, { title: taskTitle, id: taskId }],
            }
          : project
      )
    );
  }

  function handleDeleteTask(projectId, taskId) {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: project.tasks.filter((task) => task.id !== taskId),
            }
          : project
      )
    );
  }

  const ctxValue = {
    projects,
    selectedProject,
    actionType,
    createProject: handleCreateProject,
    selectProject: handleSelectProject,
    cancelProject: handleCancelProject,
    addProject: handleAddProject,
    deleteProject: handleDeleteProject,
    addTask: handleAddTask,
    deleteTask: handleDeleteTask,
  };

  return (
    <ProjectManagementContext.Provider value={ctxValue}>
      {children}
    </ProjectManagementContext.Provider>
  );
}
