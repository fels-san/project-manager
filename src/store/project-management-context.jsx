import { act, createContext, useReducer } from "react";
import { localStorageHelper } from "../localStorageHelper";

export const ProjectManagementContext = createContext({
  projects: [],
  selectedProject: null,
  actionType: "none",
  changePage: () => {},
  createProject: () => {},
  editProject: () => {},
  selectProject: () => {},
  cancelProject: () => {},
  cancelEditing: () => {},
  addProject: () => {},
  updateProject: () => {},
  changeProjectStatus: () => {},
  deleteProject: () => {},
  addTask: () => {},
  changeTaskStatus: () => {},
  updateTask: () => {},
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

  if (action.type === "EDIT_PROJECT") {
    return {
      ...state,
      actionType: "editProject",
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

  if (action.type === "UPDATE_PROJECT") {
    const updatedProject = {
      ...action.payload.project,
      ...action.payload.updatedProject,
    };

    const updatedProjects = state.projects.map((project) => {
      if (project.id === action.payload.project.id) {
        return updatedProject;
      }
      return project;
    });

    localStorageHelper.updateProject(updatedProject);

    return {
      ...state,
      projects: updatedProjects,
      actionType: "editing",
    };
  }

  if (action.type === "CANCEL_PROJECT") {
    return {
      ...state,
      actionType: "none",
    };
  }

  if (action.type === "CANCEL_EDITING") {
    return {
      ...state,
      actionType: "editing",
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
      isCompleted: false,
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

  if (action.type === "CHANGE_TASK_STATUS") {
    const updatedProjects = state.projects.map((project) => {
      if (project.id !== action.payload.projectId) return project;
      return {
        ...project,
        tasks: project.tasks.map((task) =>
          task.id === action.payload.taskId
            ? { ...task, isCompleted: !task.isCompleted }
            : task
        ),
      };
    });

    const updatedProject = updatedProjects.find(
      (project) => project.id === action.payload.projectId
    );
    localStorageHelper.updateProject(updatedProject);

    return {
      ...state,
      projects: updatedProjects,
      actionType: "editing",
    };
  }

  if (action.type === "UPDATE_TASK") {
    const updatedProjects = state.projects.map((project) => {
      if (project.id !== action.payload.projectId) return project;
      return {
        ...project,
        tasks: project.tasks.map((task) =>
          task.id === action.payload.task.id
            ? { ...task, ...action.payload.task }
            : task
        ),
      };
    });

    const updatedProject = updatedProjects.find(
      (project) => project.id === action.payload.projectId
    );
    localStorageHelper.updateProject(updatedProject);

    return {
      ...state,
      projects: updatedProjects,
      actionType: "editing",
    };
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

  function handleUpdateProject(project, updatedProject) {
    projectManagerDispatch({
      type: "UPDATE_PROJECT",
      payload: { project, updatedProject },
    });
  }

  function handleCreateProject() {
    projectManagerDispatch({
      type: "CREATE_PROJECT",
    });
  }

  function handleEditProject() {
    projectManagerDispatch({
      type: "EDIT_PROJECT",
    });
  }

  function handleCancelProject() {
    projectManagerDispatch({
      type: "CANCEL_PROJECT",
    });
  }

  function handleCancelEditing() {
    projectManagerDispatch({
      type: "CANCEL_EDITING",
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

  function handleChangeTaskStatus(projectId, taskId) {
    projectManagerDispatch({
      type: "CHANGE_TASK_STATUS",
      payload: {
        projectId,
        taskId,
      },
    });
  }

  function handleUpdateTask(projectId, task) {
    projectManagerDispatch({
      type: "UPDATE_TASK",
      payload: {
        projectId,
        task,
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
    editProject: handleEditProject,
    selectProject: handleSelectProject,
    cancelProject: handleCancelProject,
    cancelEditing: handleCancelEditing,
    addProject: handleAddProject,
    updateProject: handleUpdateProject,
    changeProjectStatus: handleChangeProjectStatus,
    deleteProject: handleDeleteProject,
    addTask: handleAddTask,
    changeTaskStatus: handleChangeTaskStatus,
    updateTask: handleUpdateTask,
    deleteTask: handleDeleteTask,
  };

  return (
    <ProjectManagementContext.Provider value={ctxValue}>
      {children}
    </ProjectManagementContext.Provider>
  );
}
