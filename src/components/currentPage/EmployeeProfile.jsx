import { React } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";

import { employeesActions } from "../../store/employeesSlice";
import { projectsActions } from "../../store/projectsSlice";

import ProjectsList from "./generalPage/ProjectsList";

export default function EmployeeProfile() {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projects);
  const employees = useSelector((state) => state.employees.employees);

  const navigate = useNavigate();
  const params = useParams();
  const employee = employees.find((e) => e.id === params.employeeId);

  const filteredProjects = projects.filter((project) =>
    project.team.some((teamMember) => teamMember.id === employee.id)
  );

  function handleDeleteEmployee() {
    // eslint-disable-next-line no-restricted-globals, no-alert
    const isEmployeeDeleted = confirm(
      "Are you sure you want to delete this employee? This action cannot be undone."
    );
    if (isEmployeeDeleted) {
      dispatch(employeesActions.deleteEmployee(employee.id));
      dispatch(projectsActions.deleteEmployeeFromProjects(employee.name));
      navigate("/");
    }
  }

  function formatDateAge(birthDate) {
    if (!birthDate) return null;

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
              />
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
              <strong>Birthdate:</strong>{" "}
              {formatDateAge(employee.birthDate) ?? "N/A"}
            </p>{" "}
            <p>
              <strong>Joined the company:</strong>{" "}
              {employee.companyStartYear?.getFullYear() ?? "N/A"}
            </p>
          </div>
        </div>

        <div className="flex flex-col">
          <Link to={`/employee/${employee.id}/edit`}>Edit</Link>
          <button type="button" onClick={handleDeleteEmployee}>
            Delete
          </button>
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
