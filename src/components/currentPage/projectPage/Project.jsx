import { useContext } from "react";

import { ProjectManagementContext } from "../../../store/project-management-context";
import ProjectTasks from "./ProjectTasks";

export default function Project({ project }) {
  function formatDate(date) {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date ? date.toLocaleDateString("en-US", options) : null;
  }

  const { changeProjectStatus, deleteProject } = useContext(
    ProjectManagementContext
  );

  return (
    <div className="box-border w-full h-full flex flex-col pt-16 pl-10 pr-44 bg-stone-50 overflow-y-auto">
      <header className="flex flex-row justify-between">
        <h2 className="w-4/5 break-words text-stone-700 text-3xl font-bold whitespace-pre-wrap">
          {project.title}
        </h2>
        <div className="flex flex-col items-end text-right">
          <button
            onClick={() => changeProjectStatus(project.id)}
            className="text-base text-right"
          >
            {project.isCompleted === false
              ? "Mark as completed"
              : "Mark as current"}
          </button>
          <button
            onClick={() => deleteProject(project.id)}
            className="text-base text-right"
          >
            Delete
          </button>
        </div>
      </header>
      <p className="text-stone-400 mb-3">
        {formatDate(project.startDate)} - {formatDate(project.dueDate)}
      </p>
      <p className="whitespace-pre-wrap">{project.description}</p>
      <p className="text-stone-400 mb-0 mt-4">
        Tags: {project.tag.join("; ")}.
      </p>
      <p className="text-stone-400 mb-0 mt-0">
        Team: {project.team.join("; ")}.
      </p>
      <hr className="mt-4 border-2 w-full text-stone-300 bg-stone-300 h-0.5" />
      <ProjectTasks project={project} />
    </div>
  );
}
