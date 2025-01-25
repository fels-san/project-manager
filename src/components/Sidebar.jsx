import { React } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

import { uiActions } from "../store/uiSlice";

export default function Sidebar() {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projects);

  const currentProjects = projects.filter(
    (project) => project.isCompleted === false
  );
  const completedProjects = projects.filter(
    (project) => project.isCompleted === true
  );

  function handleSelectProject(projectId) {
    dispatch(uiActions.setSelectedProject(projectId));
  }

  return (
    <aside className="w-1/5 h-full bg-stone-900 px-6 py-12 rounded-tr-lg break-words overflow-y-auto">
      <h2 className="text-stone-50 uppercase text-xl font-bold">
        Your projects
      </h2>
      <Link
        to="/project/new"
        className="block bg-stone-700 text-stone-400 rounded-md px-4 py-2 my-7 w-fit"
      >
        + Add Project
      </Link>
      <h3 className="text-stone-300 font-bold text-lg mb-4">
        Current Projects
      </h3>
      <ul>
        {currentProjects.map((project) => (
          <li key={project.id}>
            <NavLink
              onClick={() => handleSelectProject(project.id)}
              to={`/project/${project.id}`}
              className={({ isActive }) =>
                isActive
                  ? "bg-stone-800 text-stone-300 text-left w-full mb-3 p-2 block"
                  : "text-stone-400 text-left w-full mb-3 p-2 block"
              }
            >
              {project.title}
            </NavLink>
          </li>
        ))}
      </ul>
      <h3 className="text-stone-400 font-bold text-lg mb-4">
        Completed Projects
      </h3>
      <ul>
        {completedProjects.map((project) => (
          <li key={project.id}>
            <NavLink
              to={`/project/${project.id}`}
              className={({ isActive }) =>
                isActive
                  ? "bg-stone-800 text-stone-300 text-left w-full mb-3 p-2 block"
                  : "text-stone-400 text-left w-full mb-3 p-2 block"
              }
            >
              {project.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}
