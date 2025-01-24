import { configureStore } from '@reduxjs/toolkit';

import uiSlice from './uiSlice';
import projectsSlice from './projectsSlice';
import employeesSlice from './employeesSlice';
import tagsSlice from './tagsSlice';

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    projects: projectsSlice.reducer,
    employees: employeesSlice.reducer,
    tags: tagsSlice.reducer,
  },
});

export default store;
