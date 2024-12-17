import { useContext, useState } from "react";

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

  const { changeProjectStatus, editProject, deleteProject } = useContext(
    ProjectManagementContext
  );

  function handleChangeTitle() {
    alert("aga");
  }

  return (
    <div className="box-border w-full h-full flex flex-col pt-12 pl-10 pr-44 bg-stone-50 overflow-y-auto">
      <header className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-4 items-end">
          <h2
            onClick={handleChangeTitle}
            className="w-4/5 break-words text-stone-700 text-3xl font-bold whitespace-pre-wrap"
          >
            {project.title}
          </h2>
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

        <div className="flex flex-col items-end text-right">
          <button
            onClick={() => changeProjectStatus(project.id)}
          >
            {project.isCompleted === false
              ? "Mark as completed"
              : "Mark as current"}
          </button>
          <div className="flex flex-row gap-2">
            <button
              onClick={() => editProject()}
            >
              Edit
            </button>
            <button
              onClick={() => deleteProject(project.id)}
            >
              Delete
            </button>
          </div>
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
