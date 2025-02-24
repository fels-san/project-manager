import { Employee, Project } from "../types/types";

export function getCompletedTasksData(projects: Project[]) {
  return projects.map((project) => {
    const completedTasks = project.tasks.reduce(
      (acc, task) => {
        acc[task.isCompleted ? "completed" : "notCompleted"]++;
        return acc;
      },
      { completed: 0, notCompleted: 0 }
    );

    return {
      title: project.title,
      completed: completedTasks.completed,
      notCompleted: completedTasks.notCompleted,
    };
  });
}

export function getEmployeePositionData(employees: Employee[]) {
  const positionCount = employees.reduce((acc, employee) => {
    const position = employee.position || "Unassigned";
    acc[position] = (acc[position] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(positionCount).map(([key, value]) => ({
    position: key,
    count: value,
  }));
}

export function getEmployeeStartYearData(employees: Employee[]) {
  const startYearCount = employees.reduce((acc, employee) => {
    const year =
      employee.companyStartYear?.getFullYear() ?? new Date().getFullYear();
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  return Object.entries(startYearCount).map(([key, value]) => ({
    year: key,
    count: value,
  }));
}

export function getProjectDeadlinesData(projects: Project[]) {
  const currentDate = new Date();
  return projects
    .map((project) => {
      const dueDate = new Date(project.dueDate);
      const daysLeft = Math.ceil(
        (dueDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24)
      );
      return { title: project.title, daysLeft };
    })
    .filter((data) => data.daysLeft <= 30);
}

export function getEmployeeLoadData(
  employees: Employee[],
  projects: Project[]
) {
  return employees.map((employee) => {
    const projectCount = projects.reduce((count, project) => {
      return count + (project.team.includes(employee.name) ? 1 : 0);
    }, 0);
    return { name: employee.name, projectCount };
  });
}

export function getProjectsByMonthData(projects: Project[]) {
  return Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    const count = projects.reduce((acc, project) => {
      const startMonth = new Date(project.startDate).getMonth() + 1;
      const dueMonth = new Date(project.dueDate).getMonth() + 1;
      return (
        acc +
        (startMonth <= month && dueMonth >= month && !project.isCompleted
          ? 1
          : 0)
      );
    }, 0);

    const monthName = new Date(0, month - 1).toLocaleString("default", {
      month: "short",
    });

    return { month: monthName, count };
  });
}