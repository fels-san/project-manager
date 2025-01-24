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
    projects: [],
    actionType: "none",
    selectedProjectId: null,
    selectedEmployeeId: null,
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
      const newProject = action.payload;

      const existingTags = state.tags.map((tag) => tag.name);
      const updatedTags = newProject.tag
        .filter((tag) => !existingTags.includes(tag))
        .map((tag) => ({ name: tag }));

      newProject.team = newProject.team.map((employee) => {
        const matchingEmployee = state.employees.find(
          (e) => e.name === employee.name
        );
        if (matchingEmployee) {
          return { ...matchingEmployee };
        }
        state.employees = [...state.employees, employee];
        return employee;
      });

      state.projects = [...state.projects, newProject];

      state.tags = [...state.tags, ...updatedTags];
      state.actionType = "none";
    },

    editProject: (state) => {
      state.actionType = "editProject";
    },

    deleteProject: (state, action) => {
      const deletedProjectId = action.payload;

      state.projects = state.projects.filter(
        (project) => project.id !== deletedProjectId
      );
      state.actionType = "none";
    },

    updateProject: (state, action) => {
      const updatedProject = action.payload;

      const existingTags = state.tags.map((tag) => tag.name);
      const updatedTags = [
        ...new Set([
          ...state.tags,
          ...updatedProject.tag
            .filter((tag) => !existingTags.includes(tag))
            .map((tag) => ({ name: tag })),
        ]),
      ];

      updatedProject.team = updatedProject.team.map((employee) => {
        const matchingEmployee = state.employees.find(
          (e) => e.name === employee.name
        );
        if (matchingEmployee) {
          return { ...matchingEmployee };
        }
        state.employees = [...state.employees, employee];
        return employee;
      });

      state.projects = state.projects.map((project) =>
        project.id === updatedProject.id ? updatedProject : project
      );

      state.tags = updatedTags;
      state.actionType = "editing";
    },

    cancelProject: (state) => {
      state.actionType = "none";
    },

    changeProjectStatus: (state, action) => {
      const projectId = action.payload;

      state.projects = state.projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              isCompleted: !project.isCompleted,
            }
          : project
      );
      state.actionType = "editing";
    },

    cancelEditing: (state) => {
      state.actionType = "editing";
    },

    editEmployee: (state) => {
      state.actionType = "editingProfile";
    },

    deleteEmployee: (state, action) => {
      const deletedEmployeeId = action.payload;

      state.employees = state.employees.filter(
        (employee) => employee.id !== deletedEmployeeId
      );

      state.projects = state.projects.map((project) => ({
        ...project,
        team: project.team.filter(
          (employee) => employee.id !== deletedEmployeeId
        ),
      }));

      state.actionType = "none";
    },

    updateEmployee: (state, action) => {
      const updatedEmployee = action.payload;

      state.employees = state.employees.map((employee) => {
        if (employee.id === updatedEmployee.id) {
          return {
            ...employee,
            ...updatedEmployee,
          };
        }
        return employee;
      });

      state.actionType = "viewingProfile";
    },

    addTask: (state, action) => {
      const { taskId, projectId, taskTitle } = action.payload;

      const updatedCounter = taskId + 1;

      const newTask = {
        title: taskTitle,
        isCompleted: false,
        id: updatedCounter,
      };

      state.projects = state.projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              taskCounter: updatedCounter,
              tasks: [...project.tasks, newTask],
            }
          : project
      );
    },

    updateTask: (state, action) => {
      const { projectId, updatedTask } = action.payload;

      state.projects = state.projects.map((project) => {
        if (project.id !== projectId) return project;
        return {
          ...project,
          tasks: project.tasks.map((task) =>
            task.id === updatedTask.id ? { ...task, ...updatedTask } : task
          ),
        };
      });

      state.actionType = "editing";
    },

    deleteTask: (state, action) => {
      const { projectId, taskId } = action.payload;

      state.projects = state.projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: project.tasks.filter((task) => task.id !== taskId),
            }
          : project
      );
    },

    updateTaskOrder: (state, action) => {
      const { projectId, originalPos, newPos } = action.payload;

      state.projects = state.projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: arrayMove(project.tasks, originalPos, newPos),
            }
          : project
      );
    },

    changeTaskStatus: (state, action) => {
      const { projectId, taskId } = action.payload;

      state.projects = state.projects.map((project) => {
        if (project.id !== projectId) return project;
        return {
          ...project,
          tasks: project.tasks.map((task) =>
            task.id === taskId
              ? { ...task, isCompleted: !task.isCompleted }
              : task
          ),
        };
      });

      state.actionType = "editing";
    },

    selectProject: (state, action) => {
      const selectedId = action.payload;

      const updatedProjects = state.projects.map((project) => ({
        ...project,
        isSelected: project.id === selectedId,
      }));

      state.selectedProjectId = selectedId;
      state.projects = updatedProjects;
      state.actionType = "editing";
    },

    selectEmployee: (state, action) => {
      const selectedId = action.payload;

      state.employees = state.employees.map((employee) => ({
        ...employee,
        isSelected: employee.id === selectedId,
      }));

      state.selectedEmployeeId = selectedId;
      state.actionType = "viewingProfile";
    },

    changePage: (state, action) => {
      const pageName = action.payload;

      if (pageName === "general") {
        state.actionType = "none";
      }
      if (pageName === "current project") {
        state.actionType = "editing";
      }
      if (pageName === "new project") {
        state.actionType = "creating";
      }
    },
  },
});

export const projectManagementActions = projectManagementSlice.actions;

export default projectManagementSlice;
