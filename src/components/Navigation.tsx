import { NavLink } from "react-router-dom";
import { useAppSelector } from "../hooks";

export default function Navigation() {
  const projects = useAppSelector((state) => state.projects.projects);
  const employees = useAppSelector((state) => state.employees.employees);
  const selectedProjectId = useAppSelector((state) => state.ui.selectedProjectId);
  const selectedEmployeeName = useAppSelector(
    (state) => state.ui.selectedEmployee
  );
  const selectedProject = projects.find(
    (project) => project.id === selectedProjectId
  );
  const selectedEmployee = employees.find(
    (employee) => employee.name === selectedEmployeeName
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
              to={`/employee/${selectedEmployee.name}`}
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
