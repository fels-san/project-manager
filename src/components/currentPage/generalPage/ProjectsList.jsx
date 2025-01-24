import { React } from "react";
import { useDispatch } from "react-redux";

import { uiActions } from "../../../store/uiSlice";

export default function ProjectsList({ projects, isSearchResult = false }) {
  const dispatch = useDispatch();

  function handleSelectProject(projectId) {
    dispatch(uiActions.setSelectedProject(projectId));
    dispatch(uiActions.setActionType("editing"));
  }

  return (
    <div className="pb-3">
      {projects.length > 0 ? (
        projects.map((project) => (
          <div
            role="button"
            tabIndex={0}
            key={project.id}
            className={`${
              project.isCompleted === true ? "opacity-30" : ""
            } border-2 border-stone-900 rounded-md p-4 mb-4 cursor-pointer`}
            onClick={() => handleSelectProject(project.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleSelectProject(project.id);
              }
            }}
          >
            <div className="flex flex-row gap-2 items-baseline">
              <h3 className="text-base text-stone-800 font-semibold mb-2">
                {project.title}
              </h3>
              <div
                className={`${
                  project.isCompleted
                    ? "bg-stone-700 text-stone-200"
                    : "bg-none text-stone-700"
                } w-min h-min border-2 border-stone-900 py-0 px-2 rounded-md`}
              >
                {project.isCompleted ? "completed" : "current"}
              </div>
            </div>
            <p
              className="overflow-hidden text-ellipsis whitespace-pre-wrap"
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
        <p>
          {isSearchResult
            ? "No projects found matching your search."
            : "No projects available."}
        </p>
      )}
    </div>
  );
}
