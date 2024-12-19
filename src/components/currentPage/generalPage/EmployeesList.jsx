import { useContext } from "react";

import { ProjectManagementContext } from "../../../store/project-management-context";

export default function EmployeesList({
  selectedEmployees,
  onEmployeeSelection,
}) {
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
      <div className="flex flex-wrap gap-x-2 gap-y-2">
        {employees.map((employee, index) => (
          <span key={index}>
            <div
              onClick={() => onEmployeeSelection(employee.name)}
              className={`${
                selectedEmployees.includes(employee.name)
                  ? "border-2 bg-stone-600 text-stone-100 px-2"
                  : "border-0"
              } whitespace-pre-wrap break-normal text-stone-700 text-base font-medium border-stone-900 rounded-md px-0 py-0 cursor-pointer transform transition-transform duration-75 hover:scale-105`}
            >
              {" "}
              {employee.name + " "}
              <span className="opacity-55">
                {
                  projects.filter((project) =>
                    project.team.includes(employee.name)
                  ).length
                }
              </span>
            </div>
          </span>
        ))}
      </div>
    </div>
  );
}
