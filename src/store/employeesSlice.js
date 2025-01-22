/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import localStorageHelper from '../localStorageHelper';

const storedEmployees = [...localStorageHelper.getEmployees()];

const employeesSlice = createSlice({
  name: 'employees',
  initialState: { employees: storedEmployees || [] },
  reducers: {
    addEmployees(state, action) {
      const projectTeam = action.payload;
      const existingEmployeeNames = new Set(state.employees.map((e) => e.name));

      const newEmployees = projectTeam.filter(
        (employee) => !existingEmployeeNames.has(employee.name)
      );

      state.employees = [...state.employees, ...newEmployees];
    },

    deleteEmployee(state, action) {
      const removedEmployeeId = action.payload;

      state.employees = state.employees.filter(
        (employee) => employee.id !== removedEmployeeId
      );
    },

    updateEmployee(state, action) {
      const updatedEmployee = action.payload;

      state.employees = state.employees.map((employee) => {
        if (employee.id === updatedEmployee.id) {
          return {
            ...employee,
            ...action.payload.updatedEmployee,
          };
        }
        return employee;
      });
    },

    selectEmployee(state, action) {
      const selectedId = action.payload;

      state.employees = state.employees.map((employee) => ({
        ...employee,
        isSelected: employee.id === selectedId,
      }));
    },

    clearSelection(state) {
      state.employees = state.employees.map((employee) => ({
        ...employee,
        isSelected: false,
      }));
    },
  },
});

export const employeesActions = employeesSlice.actions;

export default employeesSlice;
