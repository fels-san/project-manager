// import { React, useContext } from 'react';
import { React } from "react";
import { useDispatch } from "react-redux";

// import { ProjectManagementContext } from '../../../store/project-management-context';
import { projectManagementActions } from "../../../store/projectManagementSlice";

export default function SearchResults({ filteredProjects }) {
  const dispatch = useDispatch();
  // const { selectProject } = useContext(ProjectManagementContext);

  function handleSelectProject(projectId) {
    dispatch(projectManagementActions.selectProject(projectId));
  }

  return (
    <div>
      {filteredProjects.length > 0 ? (
        filteredProjects.map((project) => (
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
