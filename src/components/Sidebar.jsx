import { useContext } from "react";

import { ProjectManagementContext } from "../store/project-management-context";

export default function Sidebar() {
  const { projects, createProject, selectProject } = useContext(
    ProjectManagementContext
  );

  return (
    <aside className="w-1/5 h-full bg-stone-900 px-6 py-12 rounded-tr-lg break-words">
      <h2 className="text-stone-50 uppercase text-xl font-bold">
        Your projects
      </h2>
      <button
        onClick={createProject}
        className="bg-stone-700 text-stone-400 rounded-md px-4 py-2 my-7"
      >
        + Add Project
      </button>
      {projects.map((project) => {
        return (
          <button
            onClick={() => selectProject(project.id)}
            key={project.id}
            className={`${
              project.status === "selected"
                ? "bg-stone-800 text-stone-300"
                : "text-stone-400"
            } text-left w-full mb-3 p-2`}
          >
            {project.title}
          </button>
        );
      })}
    </aside>
  );
}
