import { useRef } from "react";

export default function Project({
  onAddTask,
  onDeleteTask,
  onDeleteProject,
  project,
}) {
  function formatDate(date) {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  }

  const taskCounter = useRef(0);

  const taskTitle = useRef();

  function handleAddTask() {
    const title = taskTitle.current.value.trim();
    if (title) {
      onAddTask(project.id, title, taskCounter.current++);
      taskTitle.current.value = "";
      taskTitle.current.focus();
    }
  }

  return (
    <div className="w-4/5 flex flex-col pt-32 pl-10 pr-44">
      <header className="flex flex-row justify-between">
        <h2 className="text-stone-700 text-3xl font-bold">{project.title}</h2>
        <button
          onClick={() => onDeleteProject(project.id)}
          className="text-base"
        >
          Delete
        </button>
      </header>
      <p className="text-stone-400 my-2">{formatDate(project.date)}</p>
      <p>{project.description}</p>
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
                <p>{task.title}</p>
                <button onClick={() => onDeleteTask(project.id, task.id)}>
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
