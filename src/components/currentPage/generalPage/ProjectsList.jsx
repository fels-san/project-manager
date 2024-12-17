import { useContext } from "react";

import { ProjectManagementContext } from "../../../store/project-management-context";

export default function ProjectsList() {
  const { projects, selectProject } = useContext(ProjectManagementContext);

  if (projects.length === 0) {
    return <p>No projects available</p>;
  }

  return (
    <div>
      <h2 className="text-stone-800 text-2xl font-bold my-4">
        Projects - {projects.length}
      </h2>
      <div className="grid grid-cols-4 gap-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`${
              project.isCompleted === true ? "opacity-30" : ""
            } border-2 border-stone-900 rounded-md p-4 cursor-pointer transform transition-transform duration-75 hover:scale-105`}
            onClick={() => selectProject(project.id)}
          >
            <h3 className="text-base text-stone-800 font-semibold mb-2">
              {project.title}
            </h3>
            <p
              className="overflow-hidden text-ellipsis"
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 5,
              }}
            >
              {project.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
