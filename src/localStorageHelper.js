export const localStorageHelper = {
  getProjects() {
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];

    return storedProjects.map((project) => ({
      ...project,
      date: project.date ? new Date(project.date) : null,
      selected: !!project.selected,
    }));
  },

  saveProjects(projects) {
    localStorage.setItem("projects", JSON.stringify(projects));
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

  getCounter() {
    return JSON.parse(localStorage.getItem("counter")) || 0;
  },

  setCounter(updatedCounter) {
    localStorage.setItem("counter", JSON.stringify(updatedCounter));
  },
};
