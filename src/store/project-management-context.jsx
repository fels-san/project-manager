import { createContext, useReducer } from "react";
import { localStorageHelper } from "../localStorageHelper";
import { arrayMove } from "@dnd-kit/sortable";

export const ProjectManagementContext = createContext({
  projects: [],
  tags: [],
  employees: [],
  actionType: "none",

  selectedProject: null,
  selectedEmployee: null,

  createProject: () => {},
  addProject: () => {},
  editProject: () => {},
  deleteProject: () => {},
  updateProject: () => {},
  cancelProject: () => {},
  changeProjectStatus: () => {},
  cancelEditing: () => {},

  editEmployee: () => {},
  deleteEmployee: () => {},
  updateEmployee: () => {},

  addTask: () => {},
  updateTask: () => {},
  deleteTask: () => {},
  updateTaskOrder: () => {},
  changeTaskStatus: () => {},

  selectProject: () => {},
  selectEmployee: () => {},

  changePage: () => {},
});

function projectManagerReducer(state, action) {
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

    const existingTags = state.tags.map((tag) => tag.name);
    const updatedTags = newProject.tag
      .filter((tag) => !existingTags.includes(tag))
      .map((tag) => {
        return { name: tag };
      });

    const existingEmployeesNames = state.employees.map(
      (employee) => employee.name
    );
    let lastId = state.employees[state.employees.length - 1]?.id;

    newProject.team = newProject.team.map((employee) => {
      const clone = state.employees.find((e) => e.name === employee.name);
      if (clone) {
        return clone;
      } else {
        return employee;
      }
    });

    const newEmployees = newProject.team.filter(
      (employee) => !existingEmployeesNames.includes(employee.name)
    );

    const updatedEmployees = [...state.employees, ...newEmployees];

    const updatedProjects = [...state.projects, newProject];

    localStorageHelper.addProject(newProject);
    localStorageHelper.setCounter(updatedCounter);
    localStorageHelper.addEmployees(newEmployees);

    return {
      ...state,
      projects: updatedProjects,
      projectCounter: updatedCounter,
      tags: [...state.tags, ...updatedTags],
      employees: updatedEmployees,
      actionType: "none",
    };
  }

  if (action.type === "EDIT_PROJECT") {
    return {
      ...state,
      actionType: "editProject",
    };
  }

  if (action.type === "DELETE_PROJECT") {
    const updatedProjects = state.projects.filter(
      (project) => project.id !== action.payload
    );

    localStorageHelper.deleteProject(action.payload);

    return { ...state, projects: updatedProjects, actionType: "none" };
  }

  if (action.type === "UPDATE_PROJECT") {
    const updatedProject = {
      ...action.payload.project,
      ...action.payload.updatedProject,
    };

    const existingEmployeesNames = state.employees.map(
      (employee) => employee.name
    );

    updatedProject.team = updatedProject.team.map((employee) => {
      const clone = state.employees.find((e) => e.name === employee.name);
      if (clone) {
        return clone;
      } else {
        return employee;
      }
    });

    const newEmployees = updatedProject.team.filter(
      (employee) => !existingEmployeesNames.includes(employee.name)
    );

    const updatedEmployees = [...state.employees, ...newEmployees];

    const existingTags = state.tags.map((tag) => tag.name);
    const updatedTags = [
      ...new Set([
        ...state.tags,
        ...updatedProject.tag.filter((tag) => !existingTags.includes(tag)),
      ]),
    ];

    const updatedProjects = state.projects.map((project) =>
      project.id === updatedProject.id ? updatedProject : project
    );

    localStorageHelper.updateProject(updatedProject);
    localStorageHelper.addEmployees(newEmployees);

    return {
      ...state,
      projects: updatedProjects,
      tags: updatedTags,
      employees: updatedEmployees,
      actionType: "editing",
    };
  }

  if (action.type === "CANCEL_PROJECT") {
    return {
      ...state,
      actionType: "none",
    };
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

  if (action.type === "CANCEL_EDITING") {
    return {
      ...state,
      actionType: "editing",
    };
  }

  if (action.type === "EDIT_EMPLOYEE") {
    return {
      ...state,
      actionType: "editingProfile",
    };
  }

  if (action.type === "DELETE_EMPLOYEE") {
    const updatedEmployees = state.employees.filter(
      (employee) => employee.id !== action.payload
    );

    const updatedProjects = state.projects.map((project) => {
      return {
        ...project,
        team: project.team.filter((employee) => employee.id !== action.payload),
      };
    });

    localStorageHelper.saveProjects(updatedProjects);
    localStorageHelper.deleteEmployee(action.payload);

    return {
      ...state,
      projects: updatedProjects,
      employees: updatedEmployees,
      actionType: "none",
    };
  }

  if (action.type === "UPDATE_EMPLOYEE") {
    const updatedEmployees = state.employees.map((employee) => {
      if (employee.id === action.payload.updatedEmployee.id) {
        return {
          ...employee,
          ...action.payload.updatedEmployee,
        };
      }
      return employee;
    });

    const updatedEmployee = updatedEmployees.find(
      (employee) => employee.id === action.payload.updatedEmployee.id
    );

    localStorageHelper.updateEmployee(updatedEmployee);

    return {
      ...state,
      employees: updatedEmployees,
      actionType: "viewingProfile",
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

  if (action.type === "UPDATE_TASK_ORDER") {
    const updatedProjects = state.projects.map((project) =>
      project.id === action.payload.projectId
        ? {
            ...project,
            tasks: arrayMove(
              project.tasks,
              action.payload.originalPos,
              action.payload.newPos
            ),
          }
        : project
    );

    const updatedProject = updatedProjects.find(
      (project) => project.id === action.payload.projectId
    );
    localStorageHelper.updateProject(updatedProject);

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

  if (action.type === "SELECT_EMPLOYEE") {
    const updatedEmployees = state.employees.map((employee) => ({
      ...employee,
      isSelected: employee.id === action.payload ? true : false,
    }));

    return {
      ...state,
      employees: updatedEmployees,
      actionType: "viewingProfile",
    };
  }

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
}

const storedProjects = [...localStorageHelper.getProjects()].reverse();
const storedCounter = localStorageHelper.getCounter();
const storedEmployees = [...localStorageHelper.getEmployees()];

export default function ProjectManagementContextProvider({ children }) {
  const [projectManagerState, projectManagerDispatch] = useReducer(
    projectManagerReducer,
    {
      projects: storedProjects,
      actionType: "none",
      projectCounter: storedCounter,
      employees: storedEmployees,
      tags: [
        { name: "Web Design", count: 5 },
        { name: "Mobile Development", count: 3 },
        { name: "E-commerce", count: 4 },
        { name: "UI/UX Design", count: 6 },
        { name: "Responsive Design", count: 2 },
        { name: "Branding", count: 3 },
        { name: "User Experience", count: 7 },
      ],
    }
  );

  function handleCreateProject() {
    projectManagerDispatch({
      type: "CREATE_PROJECT",
    });
  }

  function handleAddProject(project) {
    projectManagerDispatch({
      type: "ADD_PROJECT",
      payload: project,
    });
  }

  function handleEditProject() {
    projectManagerDispatch({
      type: "EDIT_PROJECT",
    });
  }

  function handleDeleteProject(removedProjectId) {
    projectManagerDispatch({
      type: "DELETE_PROJECT",
      payload: removedProjectId,
    });
  }

  function handleUpdateProject(project, updatedProject) {
    projectManagerDispatch({
      type: "UPDATE_PROJECT",
      payload: { project, updatedProject },
    });
  }

  function handleCancelProject() {
    projectManagerDispatch({
      type: "CANCEL_PROJECT",
    });
  }

  function handleChangeProjectStatus(projectId) {
    projectManagerDispatch({
      type: "CHANGE_PROJECT_STATUS",
      payload: projectId,
    });
  }

  function handleCancelEditing() {
    projectManagerDispatch({
      type: "CANCEL_EDITING",
    });
  }

  function handleEditEmployee() {
    projectManagerDispatch({
      type: "EDIT_EMPLOYEE",
    });
  }

  function handleDeleteEmployee(removedEmployeeId) {
    projectManagerDispatch({
      type: "DELETE_EMPLOYEE",
      payload: removedEmployeeId,
    });
  }

  function handleUpdateEmployee(updatedEmployee) {
    projectManagerDispatch({
      type: "UPDATE_EMPLOYEE",
      payload: { updatedEmployee },
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

  function handleUpdateTaskOrder(projectId, originalPos, newPos) {
    projectManagerDispatch({
      type: "UPDATE_TASK_ORDER",
      payload: {
        projectId,
        originalPos,
        newPos,
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

  function handleSelectProject(selectedId) {
    projectManagerDispatch({
      type: "SELECT_PROJECT",
      payload: selectedId,
    });
  }

  function handleSelectEmployee(selectedId) {
    projectManagerDispatch({
      type: "SELECT_EMPLOYEE",
      payload: selectedId,
    });
  }

  function handleChangePage(pageName) {
    projectManagerDispatch({
      type: "CHANGE_PAGE",
      payload: pageName,
    });
  }

  const ctxValue = {
    projects: projectManagerState.projects,
    tags: projectManagerState.tags,
    employees: projectManagerState.employees,
    actionType: projectManagerState.actionType,

    selectedProject: projectManagerState.projects.find(
      (item) => item.isSelected === true
    ),
    selectedEmployee: projectManagerState.employees.find(
      (item) => item.isSelected === true
    ),

    createProject: handleCreateProject,
    addProject: handleAddProject,
    editProject: handleEditProject,
    deleteProject: handleDeleteProject,
    updateProject: handleUpdateProject,
    cancelProject: handleCancelProject,
    changeProjectStatus: handleChangeProjectStatus,
    cancelEditing: handleCancelEditing,

    editEmployee: handleEditEmployee,
    deleteEmployee: handleDeleteEmployee,
    updateEmployee: handleUpdateEmployee,

    addTask: handleAddTask,
    updateTask: handleUpdateTask,
    deleteTask: handleDeleteTask,
    updateTaskOrder: handleUpdateTaskOrder,
    changeTaskStatus: handleChangeTaskStatus,

    selectProject: handleSelectProject,
    selectEmployee: handleSelectEmployee,

    changePage: handleChangePage,
  };

  return (
    <ProjectManagementContext.Provider value={ctxValue}>
      {children}
    </ProjectManagementContext.Provider>
  );
}
