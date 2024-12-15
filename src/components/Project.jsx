import { useRef, useContext } from "react";

import { ProjectManagementContext } from "../store/project-management-context";

export default function Project({ project }) {
  function formatDate(date) {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  }

  const { addTask, deleteTask, changeProjectStatus, deleteProject } =
    useContext(ProjectManagementContext);
  const taskTitle = useRef();

  function handleAddTask() {
    const title = taskTitle.current.value.trim();
    if (title) {
      addTask(project.id, title, project.taskCounter);
      taskTitle.current.value = "";
      taskTitle.current.focus();
    }
  }

  console.log(project);

  return (
    <div className="box-border w-4/5 flex flex-col pt-32 pl-10 pr-44 overflow-y-auto">
      <header className="flex flex-row justify-between">
        <h2 className="w-4/5 break-words text-stone-700 text-3xl font-bold whitespace-pre-wrap">
          {project.title}
        </h2>
        <div className="flex flex-col items-end text-right">
          <button
            onClick={() => changeProjectStatus(project.id)}
            className="text-base text-right"
          >
            {project.status === "current"
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
      <p className="text-stone-400 my-2">{formatDate(project.date)}</p>
      <p className="whitespace-pre-wrap">{project.description}</p>
      <hr className="mt-4 border-0 text-stone-300 bg-stone-300 h-0.5" />
      <h2 className="text-stone-700 text-3xl font-bold my-3">Tasks</h2>
      <div>
        <input
          ref={taskTitle}
          type="text"
          className="bg-stone-200 mr-4 mb-4 h-7 w-60 rounded-md"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      {project.tasks.length > 0 ? (
        <div className="bg-stone-100 py-8 px-5 rounded-md flex flex-col gap-4">
          {project.tasks.map((task) => {
            return (
              <div key={task.id} className="flex flex-row justify-between">
                <p className="whitespace-pre-wrap">{task.title}</p>
                <button onClick={() => deleteTask(project.id, task.id)}>
                  Clear
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <p>This project does not have any tasks yet.</p>
      )}
    </div>
  );
}
