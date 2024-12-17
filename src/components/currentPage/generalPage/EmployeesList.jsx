import { useContext } from "react";

import { ProjectManagementContext } from "../../../store/project-management-context";

export default function EmployeesList() {
  const employees = [
    { name: "Emma Johnson", projects: 5 },
    { name: "Liam Smith", projects: 3 },
    { name: "Olivia Brown", projects: 7 },
    { name: "Noah Williams", projects: 2 },
    { name: "Sophia Taylor", projects: 6 },
    { name: "James Davis", projects: 4 },
    { name: "Isabella Martinez", projects: 8 },
    { name: "Benjamin Miller", projects: 5 },
    { name: "Mia Anderson", projects: 3 },
    { name: "Lucas Wilson", projects: 6 },
    { name: "Elijah Thomas", projects: 7 },
    { name: "Amelia White", projects: 4 },
    { name: "Ethan Harris", projects: 5 },
    { name: "Ava Martin", projects: 3 },
  ];

  const { projects } = useContext(ProjectManagementContext);

  return (
    <div className="w-full">
      <h2 className="text-stone-800 text-2xl font-bold my-4">
        Workers - {employees.length}
      </h2>
      <div className="grid grid-cols-4 gap-3">
        {employees.map((employee, index) => (
          <div key={index}>
            <div className="text-stone-700 text-base font-semibold border-stone-900 border-2 rounded-md px-4 py-2 text-center cursor-pointer transform transition-transform duration-75 hover:scale-105">
              {employee.name} -{" "}
              {
                projects.filter((project) =>
                  project.team.includes(employee.name)
                ).length
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
