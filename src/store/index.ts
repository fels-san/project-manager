import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./uiSlice";
import projectsSlice from "./projectsSlice";
import employeesSlice from "./employeesSlice";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    projects: projectsSlice.reducer,
    employees: employeesSlice.reducer,
  },
});

export default store;

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
