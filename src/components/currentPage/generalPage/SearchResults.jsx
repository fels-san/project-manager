import { useContext } from "react";

import { ProjectManagementContext } from "../../../store/project-management-context";

export default function SearchResults({ filteredProjects }) {
  const { selectProject } = useContext(ProjectManagementContext);

  return (
    <div>
      {filteredProjects.length > 0 ? (
        filteredProjects.map((project) => (
          <div
            key={project.id}
            className={`${
              project.isCompleted === true ? "opacity-30" : ""
            } border-2 border-stone-900 rounded-md p-4 mb-4 cursor-pointer`}
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
        ))
      ) : (
        <p>No projects found matching your search.</p>
      )}
    </div>
  );
}
