/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { storedEmployees } from "../data/data";
import { Employee } from "../types/types";

// import localStorageHelper from '../localStorageHelper';

// const storedEmployees = [...localStorageHelper.getEmployees()];

type employeesState = {
  employees: Employee[];
};

const initialState: employeesState = { employees: storedEmployees || [] };

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    addEmployees(state, action: PayloadAction<Employee[]>) {
      const projectTeam = action.payload;
      const existingEmployeeNames = new Set(state.employees.map((e) => e.name));

      const newEmployees = projectTeam.filter(
        (employee) => !existingEmployeeNames.has(employee.name)
      );

      state.employees = [...state.employees, ...newEmployees];
    },

    deleteEmployee(state, action: PayloadAction<string>) {
      const deletedEmployeeName = action.payload;

      state.employees = state.employees.filter(
        (employee) => employee.name !== deletedEmployeeName
      );
    },

    updateEmployee(state, action: PayloadAction<Employee>) {
      const updatedEmployee = action.payload;

      state.employees = state.employees.map((employee) => {
        if (employee.name === updatedEmployee.name) {
          return {
            ...employee,
            ...updatedEmployee,
          };
        }
        return employee;
      });
    },

    // selectEmployee(state, action) {
    //   const selectedId = action.payload;

    //   state.employees = state.employees.map((employee) => ({
    //     ...employee,
    //     isSelected: employee.id === selectedId,
    //   }));
    // },

    // clearSelection(state) {
    //   state.employees = state.employees.map((employee) => ({
    //     ...employee,
    //     isSelected: false,
    //   }));
    // },
  },
});

export const employeesActions = employeesSlice.actions;

export default employeesSlice;
