/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    selectedProjectId: null,
    selectedEmployeeId: null,
  },
  reducers: {
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
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
