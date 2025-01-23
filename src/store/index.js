import { configureStore } from '@reduxjs/toolkit';

// import uiSlice from './uiSlice';
// import projectsSlice from './projectsSlice';
// import employeesSlice from './employeesSlice';
// import tagsSlice from './tagsSlice';
import projectManagementSlice from './projectManagementSlice'

const store = configureStore({
  reducer: {
    projectManagement : projectManagementSlice.reducer,
    // ui: uiSlice.reducer,
    // projects: projectsSlice.reducer,
    // employees: employeesSlice.reducer,
    // tags: tagsSlice.reducer,
  },
});

export default store;
