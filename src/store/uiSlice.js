/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    actionType: 'none',
    selectedProjectId: null,
    selectedEmployeeId: null,
  },
  reducers: {
    setActionType(state, action) {
      state.actionType = action.payload;
    },

    setSelectedProject(state, action) {
      state.selectedProjectId = action.payload;
    },

    clearSelectedProject(state) {
      state.selectedProjectId = null;
    },

    setSelectedEmployee(state, action) {
      state.selectedEmployeeId = action.payload;
    },

    clearSelectedEmployee(state) {
      state.selectedEmployeeId = null;
    },

    setPage(state, action) {
      const pageName = action.payload;

      switch (pageName) {
        case 'general':
          state.actionType = 'none';
          break;
        case 'current project':
          state.actionType = 'editing';
          break;
        case 'new project':
          state.actionType = 'creating';
          break;
        default:
          console.log(`Unknown page: ${pageName}`);
          break;
      }
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
