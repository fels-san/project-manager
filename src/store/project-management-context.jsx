import { createContext, useReducer } from "react";

export const ProjectManagementContext = createContext({
  projects: [],
  selectedProject: null,
  actionType: "none",
  createProject: () => {},
  selectProject: () => {},
  cancelProject: () => {},
  addProject: () => {},
  changeProjectStatus: () => {},
  deleteProject: () => {},
  addTask: () => {},
  deleteTask: () => {},
});

function projectManagerReducer(state, action) {
  if (action.type === "CREATE_PROJECT") {
    const updatedProjects = state.projects.map((project) => ({
      ...project,
      selected: false,
    }));

    return {
      ...state,
      projects: updatedProjects,
      actionType: "creating",
    };
  }

  if (action.type === "ADD_PROJECT") {
    const updatedProjects = [
      ...state.projects,
      { ...action.payload, id: state.projectCounter },
    ];
    return {
      ...state,
      projects: updatedProjects,
      projectCounter: state.projectCounter + 1,
      actionType: "none",
    };
  }

  if (action.type === "CANCEL_PROJECT") {
    return {
      ...state,
      actionType: "none",
    };
  }

  if (action.type === "SELECT_PROJECT") {
    const updatedProjects = state.projects.map((project) => ({
      ...project,
      selected: project.id === action.payload ? true : false,
    }));

    return {
      ...state,
      projects: updatedProjects,
      actionType: "editing",
    };
  }

  if (action.type === "DELETE_PROJECT") {
    const updatedProjects = state.projects.filter(
      (project) => project.id !== action.payload
    );
    return { ...state, projects: updatedProjects, actionType: "none" };
  }

  if (action.type === "CHANGE_PROJECT_STATUS") {
    const updatedProjects = state.projects.map((project) =>
      project.id === action.payload
        ? {
            ...project,
            status: project.status === "current" ? "completed" : "current",
          }
        : project
    );
    return {
      ...state,
      projects: updatedProjects,
      actionType: "editing",
    };
  }

  if (action.type === "ADD_TASK") {
    const updatedProjects = state.projects.map((project) =>
      project.id === action.payload.projectId
        ? {
            ...project,
            tasks: [
              ...project.tasks,
              { title: action.payload.taskTitle, id: action.payload.taskId },
            ],
          }
        : project
    );
    return { ...state, projects: updatedProjects };
  }

  if (action.type === "DELETE_TASK") {
    const updatedProjects = state.projects.map((project) =>
      project.id === action.payload.projectId
        ? {
            ...project,
            tasks: project.tasks.filter(
              (task) => task.id !== action.payload.taskId
            ),
          }
        : project
    );
    return { ...state, projects: updatedProjects };
  }
}

export default function ProjectManagementContextProvider({ children }) {
  const [projectManagerState, projectManagerDispatch] = useReducer(
    projectManagerReducer,
    {
      projects: [],
      actionType: "none",
      projectCounter: 0,
    }
  );

  function handleAddProject(project) {
    projectManagerDispatch({
      type: "ADD_PROJECT",
      payload: project,
    });
  }

  function handleCreateProject() {
    projectManagerDispatch({
      type: "CREATE_PROJECT",
    });
  }

  function handleCancelProject() {
    projectManagerDispatch({
      type: "CANCEL_PROJECT",
    });
  }

  function handleSelectProject(selectedId) {
    projectManagerDispatch({
      type: "SELECT_PROJECT",
      payload: selectedId,
    });
  }

  function handleChangeProjectStatus(projectId) {
    projectManagerDispatch({
      type: "CHANGE_PROJECT_STATUS",
      payload: projectId,
    });
  }

  function handleDeleteProject(removedProjectId) {
    projectManagerDispatch({
      type: "DELETE_PROJECT",
      payload: removedProjectId,
    });
  }

  function handleAddTask(projectId, taskTitle, taskId) {
    projectManagerDispatch({
      type: "ADD_TASK",
      payload: {
        projectId,
        taskTitle,
        taskId,
      },
    });
  }

  function handleDeleteTask(projectId, taskId) {
    projectManagerDispatch({
      type: "DELETE_TASK",
      payload: {
        projectId,
        taskId,
      },
    });
  }

  const ctxValue = {
    projects: projectManagerState.projects,
    selectedProject: projectManagerState.projects.find(
      (item) => item.selected === true
    ),
    actionType: projectManagerState.actionType,
    createProject: handleCreateProject,
    selectProject: handleSelectProject,
    cancelProject: handleCancelProject,
    addProject: handleAddProject,
    changeProjectStatus: handleChangeProjectStatus,
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
