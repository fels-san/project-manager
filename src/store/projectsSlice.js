/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { arrayMove } from '@dnd-kit/sortable';

import localStorageHelper from '../localStorageHelper';

const storedProjects = [...(localStorageHelper.getProjects() || [])].reverse();
const storedCounter = localStorageHelper.getCounter() || 0;

const projectsSlice = createSlice({
  name: 'projects',
  initialState: { projects: storedProjects, projectCounter: storedCounter },
  reducers: {
    addProject(state, action) {
      const newProject = action.payload;

      state.projects = [...state.projects, newProject];
    },

    // editProject() {},
    deleteProject(state, action) {
      const deletedProjectId = action.payload;

      state.projects = state.projects.filter(
        (project) => project.id !== deletedProjectId
      );
    },

    updateProject(state, action) {
      const updatedProject = action.payload;

      state.projects = state.projects.map((project) =>
        project.id === updatedProject.id ? updatedProject : project
      );
    },

    // cancelProject() {},
    changeProjectStatus(state, action) {
      const projectId = action.payload;

      state.projects = state.projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              isCompleted: !project.isCompleted,
            }
          : project
      );
    },

    // cancelEditing() {},
    addTask(state, action) {
      const { projectId, taskTitle, taskId } = action.payload;

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

    updateTask(state, action) {
      const { projectId, task: updatedTask } = action.payload;

      state.projects = state.projects.map((project) => {
        if (project.id !== projectId) return project;

        return {
          ...project,
          tasks: project.tasks.map((task) =>
            task.id === updatedTask.id ? { ...task, ...updatedTask } : task
          ),
        };
      });
    },

    deleteTask(state, action) {
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

    updateTaskOrder(state, action) {
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

    changeTaskStatus(state, action) {
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
    },

    deleteEmployeeFromProjects(state, action) {
      const deletedEmployeeName = action.payload;

      state.projects = state.projects.map((project) => ({
        ...project,
        team: project.team.filter((employee) => employee !== deletedEmployeeName),
      }));
    },

    clearSelection(state) {
      state.projects = state.projects.map((project) => ({
        ...project,
        isSelected: false,
      }));
    },

    selectProject(state, action) {
      const selectedId = action.payload;

      state.projects = state.projects.map((project) => ({
        ...project,
        isSelected: project.id === selectedId,
      }));
    },
  },
});

export const projectsActions = projectsSlice.actions;

export default projectsSlice;
