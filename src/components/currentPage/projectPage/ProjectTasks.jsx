import { useRef, useContext } from "react";

import { ProjectManagementContext } from "../../../store/project-management-context";
import Task from "./Task";

export default function ProjectTasks({ project }) {
  const { addTask } = useContext(ProjectManagementContext);

  const taskTitle = useRef();

  function handleAddTask(event) {
    if (event.key && event.key !== "Enter") return;
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
      <div className="flex flex-row justify-between items-baseline pr-2">
        <input
          ref={taskTitle}
          type="text"
          onKeyDown={handleAddTask}
          className="bg-stone-200 mr-4 mb-4 h-7 w-11/12 rounded-md pl-2"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      {project.tasks.length > 0 ? (
        <div className="bg-stone-100 py-8 px-5 rounded-md flex flex-col gap-4">
          {project.tasks.map((task) => {
            return (
              <Task key={task.id} taskContent={task} projectId={project.id} />
            );
          })}
        </div>
      ) : (
        <p>This project does not have any tasks yet.</p>
      )}
    </>
  );
}
