const localStorageHelper = {
  getProjects() {
    const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];

    return storedProjects.map((project) => ({
      ...project,
      dueDate: project.dueDate ? new Date(project.dueDate) : null,
      startDate: project.startDate ? new Date(project.startDate) : null,
      isSelected: !!project.isSelected,
    }));
  },

  saveProjects(projects) {
    const updatedProjects = projects.map((project) => ({
      ...project,
      isSelected: false,
    }));
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  },

  addProject(project) {
    const projects = this.getProjects();
    if (!projects.some((p) => p.id === project.id)) {
      this.saveProjects([project, ...projects]);
    }
  },

  updateProject(project) {
    const projects = this.getProjects();
    const updatedProjects = projects.map((p) =>
      p.id === project.id ? project : p
    );
    this.saveProjects(updatedProjects);
  },

  deleteProject(projectId) {
    const projects = this.getProjects();
    const updatedProjects = projects.filter((p) => p.id !== projectId);
    this.saveProjects(updatedProjects);
  },

  addTaskToProject(projectId, task) {
    const projects = this.getProjects();
    const updatedProjects = projects.map((p) => {
      if (p.id === projectId && !p.tasks.some((t) => t.id === task.id)) {
        return {
          ...p,
          taskCounter: task.id,
          tasks: [...p.tasks, task],
        };
      }
      return p;
    });
    this.saveProjects(updatedProjects);
  },

  removeTask(projectId, taskId) {
    const projects = this.getProjects();
    const updatedProjects = projects.map((p) => {
      if (p.id === projectId) {
        return {
          ...p,
          tasks: p.tasks.filter((task) => task.id !== taskId),
        };
      }
      return p;
    });
    this.saveProjects(updatedProjects);
  },

  getEmployees() {
    // const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];

    // return storedProjects.map((project) => ({
    //   ...project,
    //   dueDate: project.dueDate ? new Date(project.dueDate) : null,
    //   startDate: project.startDate ? new Date(project.startDate) : null,
    //   isSelected: !!project.isSelected,
    // }));

    const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];

    return storedEmployees.map((employee) => ({
      ...employee,
      birthDate: employee.birthDate ? new Date(employee.birthDate) : null,
      companyStartYear: employee.companyStartYear
        ? new Date(employee.companyStartYear)
        : null,
    }));
  },

  saveEmployees(employees) {
    // let counter = 0;
    // const updatedEmp = employees.map((employee) => {
    //   return {
    //     ...employee,
    //     id: counter++,
    //   };
    // });
    localStorage.setItem('employees', JSON.stringify(employees));
  },

  addEmployees(newEmployees) {
    const employees = this.getEmployees();
    const uniqueNewEmployees = newEmployees.filter(
      (emp) => !employees.some((existingEmp) => existingEmp.name === emp.name)
    );
    this.saveEmployees([...employees, ...uniqueNewEmployees]);
  },

  updateEmployee(updatedEmployee) {
    const employees = this.getEmployees();
    const updatedEmployees = employees.map((e) =>
      e.id === updatedEmployee.id ? updatedEmployee : e
    );
    this.saveEmployees(updatedEmployees);
  },

  deleteEmployee(employeeId) {
    const employees = this.getEmployees();
    const updatedEmployees = employees.filter((e) => e.id !== employeeId);
    this.saveEmployees(updatedEmployees);
  },

  getCounter() {
    return JSON.parse(localStorage.getItem('counter')) || 0;
  },

  setCounter(updatedCounter) {
    localStorage.setItem('counter', JSON.stringify(updatedCounter));
  },
};

export default localStorageHelper;
