import { React } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function Navigation() {
  const projects = useSelector((state) => state.projects.projects);
  const employees = useSelector((state) => state.employees.employees);
  const selectedProjectId = useSelector((state) => state.ui.selectedProjectId);
  const selectedEmployeeId = useSelector(
    (state) => state.ui.selectedEmployeeId
  );
  const selectedProject = projects.find(
    (project) => project.id === selectedProjectId
  );
  const selectedEmployee = employees.find(
    (employee) => employee.id === selectedEmployeeId
  );

  return (
    <nav className="w-full h-auto px-0 mt-5">
      <ul className="flex flex-row gap-4">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "bg-stone-50 text-stone-600 px-5 pt-4 pb-2 rounded-t-md font-bold cursor-pointer block"
                : "bg-stone-100 text-stone-400 px-5 pt-4 pb-2 rounded-t-md font-bold cursor-pointer block"
            }
          >
            General{" "}
            <div className="inline bg-stone-200 rounded-full px-1 py-0.5">
              {projects.length}
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/statitic"
            className={({ isActive }) =>
              isActive
                ? "bg-stone-50 text-stone-600 px-5 pt-4 pb-2 rounded-t-md font-bold cursor-pointer block"
                : "bg-stone-100 text-stone-400 px-5 pt-4 pb-2 rounded-t-md font-bold cursor-pointer block"
            }
          >
            Statitic
          </NavLink>
        </li>
        {!selectedProject && <li>
          <NavLink
            to="/project/new"
            className={({ isActive }) =>
              isActive
                ? "bg-stone-50 text-stone-600 px-5 pt-4 pb-2 rounded-t-md font-bold cursor-pointer block"
                : "bg-stone-100 text-stone-400 px-5 pt-4 pb-2 rounded-t-md font-bold cursor-pointer block"
            }
          >
            New Project
          </NavLink>
        </li>}
        {selectedProject && (
          <li>
            <NavLink
              to={`/project/${selectedProjectId}`}
              className={({ isActive }) =>
                isActive
                  ? "bg-stone-50 text-stone-600 px-5 pt-4 pb-2 rounded-t-md font-bold cursor-pointer block"
                  : "bg-stone-100 text-stone-400 px-5 pt-4 pb-2 rounded-t-md font-bold cursor-pointer block"
              }
            >
              Current Project
            </NavLink>
          </li>
        )}
        {selectedEmployee && (
          <li>
            <NavLink
              to={`/employee/${selectedEmployeeId}`}
              className={({ isActive }) =>
                isActive
                  ? "bg-stone-50 text-stone-600 px-5 pt-4 pb-2 rounded-t-md font-bold cursor-pointer block"
                  : "bg-stone-100 text-stone-400 px-5 pt-4 pb-2 rounded-t-md font-bold cursor-pointer block"
              }
            >
              {selectedEmployee.name}
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}
