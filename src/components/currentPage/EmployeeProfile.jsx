import { useContext } from "react";

import { ProjectManagementContext } from "../../store/project-management-context";
import ProjectsList from "./generalPage/ProjectsList";

function formatDateAge(birthDate) {
  if (!birthDate) return;

  const now = new Date();

  const age = now.getFullYear() - birthDate.getFullYear();
  const hasBirthdayPassed =
    now.getMonth() > birthDate.getMonth() ||
    (now.getMonth() === birthDate.getMonth() &&
      now.getDate() >= birthDate.getDate());
  const finalAge = hasBirthdayPassed ? age : age - 1;

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const formattedDate = `${birthDate.getDate()} ${
    months[birthDate.getMonth()]
  }. ${birthDate.getFullYear()}`;

  return `${formattedDate} (${finalAge} years old)`;
}

export default function EmployeeProfile({ employee }) {
  const { projects, editEmployee, deleteEmployee } = useContext(
    ProjectManagementContext
  );

  const filteredProjects = projects.filter((project) =>
    project.team.some((teamMember) => teamMember.id === employee.id)
  );

  function handleDeleteEmployee() {
    const isEmployeeDeleted = confirm(
      "Are you sure you want to delete this employee? This action cannot be undone."
    );
    if (isEmployeeDeleted) {
      deleteEmployee(employee.id);
    }
  }

  return (
    <div className="box-border w-full h-full flex flex-col py-12 pl-10 pr-44 bg-stone-50 overflow-y-auto">
      <header className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-10">
          <div className="relative w-36 h-36 overflow-hidden bg-stone-200 rounded-full">
            <svg
              className="absolute w-40 h-40 text-stone-400 -left-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>

          <div>
            <h2 className="break-words text-stone-700 text-3xl font-bold whitespace-pre-wrap mb-2">
              {employee.name}
            </h2>
            <p>
              <strong>Role:</strong> {employee.position ?? "N/A"}
            </p>
            <p>
              <strong>Birthdate:</strong> {formatDateAge(employee.birthDate) ?? "N/A"}
            </p>{" "}
            <p>
              <strong>Joined the company:</strong>{" "}
              {employee.companyStartYear?.getFullYear() ?? "N/A"}
            </p>
          </div>
        </div>

        <div className="flex flex-col">
          <button onClick={() => editEmployee()}>Edit</button>
          <button onClick={handleDeleteEmployee}>Delete</button>
        </div>
      </header>
      <main className="mt-5">
        <div>
          <h2 className="text-stone-700 text-2xl font-bold my-1">
            Contact info
          </h2>
          <p>
            <strong>Phone:</strong> {employee.phone ?? "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {employee.email ?? "N/A"}
          </p>
        </div>
        <div>
          <h2 className="text-stone-700 text-2xl font-bold my-3">Projects</h2>
          <ProjectsList projects={filteredProjects} />
        </div>
      </main>
    </div>
  );
}
