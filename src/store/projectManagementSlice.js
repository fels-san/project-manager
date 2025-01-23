/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { arrayMove } from "@dnd-kit/sortable";

// import localStorageHelper from "../localStorageHelper";

// const storedProjects = [...localStorageHelper.getProjects()].reverse();
// const storedCounter = localStorageHelper.getCounter();
// const storedEmployees = [...localStorageHelper.getEmployees()];

const projectManagementSlice = createSlice({
  name: "projectManagement",
  initialState: {
    // projects: storedProjects,
    projects: [],
    actionType: "none",
    // projectCounter: storedCounter,
    // employees: storedEmployees,
    selectedProject: null,
    selectedEmployee: null,
    projectCounter: 0,
    employees: [],
    tags: [
      { name: "Web Design", count: 5 },
      { name: "Mobile Development", count: 3 },
      { name: "E-commerce", count: 4 },
      { name: "UI/UX Design", count: 6 },
      { name: "Responsive Design", count: 2 },
      { name: "Branding", count: 3 },
      { name: "User Experience", count: 7 },
    ],
  },
  reducers: {
    createProject(state) {
      state.projects = state.projects.map((project) => ({
        ...project,
        isSelected: false,
      }));

      state.actionType = "creating";
    },

    addProject: (state, action) => {
      const updatedCounter = state.projectCounter + 1;
      const newProject = {
        ...action.payload,
        id: state.projectCounter,
        dueDate: new Date(action.payload.dueDate),
        startDate: new Date(action.payload.startDate),
      };

      const existingTags = state.tags.map((tag) => tag.name);
      const updatedTags = newProject.tag
        .filter((tag) => !existingTags.includes(tag))
        .map((tag) => ({ name: tag }));

      const existingEmployeesNames = state.employees.map(
        (employee) => employee.name
      );

      newProject.team = newProject.team.map((employee) => {
        const clone = state.employees.find((e) => e.name === employee.name);
        if (clone) {
          return clone;
        }
        return employee;
      });

      const newEmployees = newProject.team.filter(
        (employee) => !existingEmployeesNames.includes(employee.name)
      );

      const updatedEmployees = [...state.employees, ...newEmployees];

      const updatedProjects = [...state.projects, newProject];

      // localStorageHelper.addProject(newProject);
      // localStorageHelper.setCounter(updatedCounter);
      // localStorageHelper.addEmployees(newEmployees);

      state.projects = updatedProjects;
      state.projectCounter = updatedCounter;
      state.tags = [...state.tags, ...updatedTags];
      state.employees = updatedEmployees;
      state.actionType = "none";
    },

    editProject: (state) => {
      state.actionType = "editProject";
    },

    deleteProject: (state, action) => {
      const updatedProjects = state.projects.filter(
        (project) => project.id !== action.payload
      );

      // localStorageHelper.deleteProject(action.payload);
      state.projects = updatedProjects;
      state.actionType = "none";
    },

    updateProject: (state, action) => {
      const updatedProject = {
        ...action.payload.project,
        ...action.payload.updatedProject,
        dueDate: new Date(action.payload.updatedProject.dueDate),
        startDate: new Date(action.payload.updatedProject.startDate),
      };

      const existingEmployeesNames = state.employees.map(
        (employee) => employee.name
      );

      updatedProject.team = updatedProject.team.map((employee) => {
        const clone = state.employees.find((e) => e.name === employee.name);
        if (clone) {
          return clone;
        }
        return employee;
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

      // localStorageHelper.updateProject(updatedProject);
      // localStorageHelper.addEmployees(newEmployees);

      state.projects = updatedProjects;
      state.tags = updatedTags;
      state.employees = updatedEmployees;
      state.actionType = "editing";
    },

    cancelProject: (state) => {
      state.actionType = "none";
    },

    changeProjectStatus: (state, action) => {
      const updatedProjects = state.projects.map((project) =>
        project.id === action.payload
          ? {
              ...project,
              isCompleted: !project.isCompleted,
            }
          : project
      );

      // const updatedProject = updatedProjects.find(
      //   (project) => project.id === action.payload
      // );
      // localStorageHelper.updateProject(updatedProject);

      state.projects = updatedProjects;
      state.actionType = "editing";
    },

    cancelEditing: (state) => {
      state.actionType = "editing";
    },

    editEmployee: (state) => {
      state.actionType = "editingProfile";
    },

    deleteEmployee: (state, action) => {
      const updatedEmployees = state.employees.filter(
        (employee) => employee.id !== action.payload
      );

      const updatedProjects = state.projects.map((project) => ({
        ...project,
        team: project.team.filter((employee) => employee.id !== action.payload),
      }));

      // localStorageHelper.saveProjects(updatedProjects);
      // localStorageHelper.deleteEmployee(action.payload);

      state.projects = updatedProjects;
      state.employees = updatedEmployees;
      state.actionType = "none";
    },

    updateEmployee: (state, action) => {
      const updatedEmployees = state.employees.map((employee) => {
        if (employee.id === action.payload.updatedEmployee.id) {
          return {
            ...employee,
            ...action.payload.updatedEmployee,
          };
        }
        return employee;
      });

      // const updatedEmployee = updatedEmployees.find(
      //   (employee) => employee.id === action.payload.updatedEmployee.id
      // );

      // localStorageHelper.updateEmployee(updatedEmployee);

      state.employees = updatedEmployees;
      state.actionType = "viewingProfile";
    },

    addTask: (state, action) => {
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

      // localStorageHelper.addTaskToProject(action.payload.projectId, newTask);

      state.projects = updatedProjects;
    },

    updateTask: (state, action) => {
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

      // const updatedProject = updatedProjects.find(
      //   (project) => project.id === action.payload.projectId
      // );
      // localStorageHelper.updateProject(updatedProject);

      state.projects = updatedProjects;
      state.actionType = "editing";
    },

    deleteTask: (state, action) => {
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

      // localStorageHelper.removeTask(
      //   action.payload.projectId,
      //   action.payload.taskId
      // );

      state.projects = updatedProjects;
    },

    updateTaskOrder: (state, action) => {
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

      // const updatedProject = updatedProjects.find(
      //   (project) => project.id === action.payload.projectId
      // );
      // localStorageHelper.updateProject(updatedProject);

      state.projects = updatedProjects;
    },

    changeTaskStatus: (state, action) => {
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

      // const updatedProject = updatedProjects.find(
      //   (project) => project.id === action.payload.projectId
      // );
      // localStorageHelper.updateProject(updatedProject);

      state.projects = updatedProjects;
      state.actionType = "editing";
    },

    selectProject: (state, action) => {
      const updatedProjects = state.projects.map((project) => ({
        ...project,
        isSelected: project.id === action.payload,
      }));

      state.selectedProject = updatedProjects.find(
        (item) => item.isSelected === true
      );

      state.projects = updatedProjects;
      state.actionType = "editing";
    },

    selectEmployee: (state, action) => {
      const updatedEmployees = state.employees.map((employee) => ({
        ...employee,
        isSelected: employee.id === action.payload,
      }));

      state.employees = updatedEmployees;
      state.actionType = "viewingProfile";
    },

    changePage: (state, action) => {
      if (action.payload === "general") {
        state.actionType = "none";
      }
      if (action.payload === "current project") {
        state.actionType = "editing";
      }
      if (action.payload === "new project") {
        state.actionType = "creating";
      }
    },
  },
});

export const projectManagementActions = projectManagementSlice.actions;

export default projectManagementSlice;
