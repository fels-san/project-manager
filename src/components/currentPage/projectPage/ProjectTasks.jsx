import { useRef, useContext } from "react";

import { ProjectManagementContext } from "../../../store/project-management-context";

export default function ProjectTasks({ project }) {
  const { addTask, deleteTask } = useContext(ProjectManagementContext);

  const taskTitle = useRef();

  function handleAddTask() {
    const title = taskTitle.current.value.trim();
    if (title) {
      addTask(project.id, title, project.taskCounter);
      taskTitle.current.value = "";
      taskTitle.current.focus();
    }
  }

  return (
    <>
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
    </>
  );
}
