import { createContext, useReducer } from "react";
import { localStorageHelper } from "../localStorageHelper";

export const ProjectManagementContext = createContext({
  projects: [],
  selectedProject: null,
  actionType: "none",
  changePage: () => {},
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
  if (action.type === "CHANGE_PAGE") {
    if (action.payload === "general") {
      return {
        ...state,
        actionType: "none",
      };
    }
    if (action.payload === "current project") {
      return {
        ...state,
        actionType: "editing",
      };
    }
    if (action.payload === "new project") {
      return {
        ...state,
        actionType: "creating",
      };
    }
  }

  if (action.type === "CREATE_PROJECT") {
    const updatedProjects = state.projects.map((project) => ({
      ...project,
      isSelected: false,
    }));

    return {
      ...state,
      projects: updatedProjects,
      actionType: "creating",
    };
  }

  if (action.type === "ADD_PROJECT") {
    const updatedCounter = state.projectCounter + 1;
    const newProject = { ...action.payload, id: state.projectCounter };
    const updatedProjects = [...state.projects, newProject];

    localStorageHelper.addProject(newProject);
    localStorageHelper.setCounter(updatedCounter);

    return {
      ...state,
      projects: updatedProjects,
      projectCounter: updatedCounter,
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
      isSelected: project.id === action.payload ? true : false,
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

    localStorageHelper.deleteProject(action.payload);

    return { ...state, projects: updatedProjects, actionType: "none" };
  }

  if (action.type === "CHANGE_PROJECT_STATUS") {
    const updatedProjects = state.projects.map((project) =>
      project.id === action.payload
        ? {
            ...project,
            isCompleted: !project.isCompleted,
          }
        : project
    );

    const updatedProject = updatedProjects.find(
      (project) => project.id === action.payload
    );
    localStorageHelper.updateProject(updatedProject);

    return {
      ...state,
      projects: updatedProjects,
      actionType: "editing",
    };
  }

  if (action.type === "ADD_TASK") {
    const updatedCounter = action.payload.taskId + 1;

    const newTask = {
      title: action.payload.taskTitle,
      id: updatedCounter,
    };

    const updatedProjects = state.projects.map((project) =>
      project.id === action.payload.projectId
        ? {
            ...project,
            taskCounter: updatedCounter,
            tasks: [...project.tasks, newTask],
          }
        : project
    );

    localStorageHelper.addTaskToProject(action.payload.projectId, newTask);

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

    localStorageHelper.removeTask(
      action.payload.projectId,
      action.payload.taskId
    );

    return { ...state, projects: updatedProjects };
  }
}

const storedProjects = [...localStorageHelper.getProjects()].reverse();
const storedCounter = localStorageHelper.getCounter();

export default function ProjectManagementContextProvider({ children }) {
  const [projectManagerState, projectManagerDispatch] = useReducer(
    projectManagerReducer,
    {
      projects: storedProjects,
      actionType: "none",
      projectCounter: storedCounter,
    }
  );

  function handleChangePage(pageName) {
    projectManagerDispatch({
      type: "CHANGE_PAGE",
      payload: pageName,
    });
  }

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
      (item) => item.isSelected === true
    ),
    actionType: projectManagerState.actionType,
    changePage: handleChangePage,
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
