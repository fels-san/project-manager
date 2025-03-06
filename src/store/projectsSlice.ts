/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { arrayMove } from "@dnd-kit/sortable";
import { Project, Task } from "../types/types";
import { storedProjects } from "../data/data";

type projectsState = {
  projects: Project[];
};

const initialState: projectsState = { projects: storedProjects || [] };

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject(state, action: PayloadAction<Project>) {
      const newProject = action.payload;

      state.projects = [...state.projects, newProject];
    },

    deleteProject(state, action: PayloadAction<string>) {
      const deletedProjectId = action.payload;

      state.projects = state.projects.filter(
        (project) => project.id !== deletedProjectId
      );
    },

    updateProject(state, action: PayloadAction<Project>) {
      const updatedProject = action.payload;

      state.projects = state.projects.map((project) =>
        project.id === updatedProject.id ? updatedProject : project
      );
    },

    changeProjectStatus(state, action: PayloadAction<string>) {
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

    addTask(
      state,
      action: PayloadAction<{
        projectId: string;
        taskTitle: string;
        taskId: number;
      }>
    ) {
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

    updateTask(state, action: PayloadAction<{projectId: string, task: Task}>) {
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

    deleteTask(state, action: PayloadAction<{projectId: string, taskId: number}>) {
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

    updateTaskOrder(state, action: PayloadAction<{projectId: string, originalPos: number, newPos: number}>) {
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

    changeTaskStatus(state, action: PayloadAction<{projectId: string, taskId: number}>) {
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

    deleteEmployeeFromProjects(state, action: PayloadAction<string>) {
      const deletedEmployeeName = action.payload;

      state.projects = state.projects.map((project) => ({
        ...project,
        team: project.team.filter(
          (employee) => employee !== deletedEmployeeName
        ),
      }));
    },

    clearSelection(state) {
      state.projects = state.projects.map((project) => ({
        ...project,
        isSelected: false,
      }));
    },

    selectProject(state, action: PayloadAction<string>) {
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
