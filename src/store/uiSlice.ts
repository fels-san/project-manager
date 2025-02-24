/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

type uiState = {
  selectedProjectId: string;
  selectedEmployee: string;
};

const initialState: uiState = {
  selectedProjectId: "",
  selectedEmployee: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSelectedProject(state, action) {
      state.selectedProjectId = action.payload;
    },

    clearSelectedProject(state) {
      state.selectedProjectId = "";
    },

    setSelectedEmployee(state, action) {
      state.selectedEmployee = action.payload;
    },

    clearSelectedEmployee(state) {
      state.selectedEmployee = "";
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
