import { useContext, useRef, useState, useEffect } from "react";

import { ProjectManagementContext } from "../../../store/project-management-context";

import Check from "../../../assets/check-circle.svg";
import Save from "../../../assets/check-lg.svg";
import Pencil from "../../../assets/pencil-square.svg";
import Delete from "../../../assets/x-square.svg";

export default function Task({ taskContent, projectId }) {
  const { changeTaskStatus, updateTask, deleteTask } = useContext(
    ProjectManagementContext
  );

  const [isEditing, setIsEditing] = useState(false);

  const input = useRef();

  function handleEditClick() {
    setIsEditing((editing) => !editing);
  }

  function handleSave(event) {
    if (event.key && event.key !== "Enter") return;
    updateTask(projectId, { ...taskContent, title: input.current.value });
    setIsEditing((editing) => !editing);
  }

  useEffect(() => {
    if (isEditing && input.current) {
      input.current.focus();
    }
  }, [isEditing]);

  return (
    <div className="flex flex-row justify-between">
      {isEditing ? (
        <>
          <input
            onKeyDown={handleSave}
            type="text"
            defaultValue={taskContent.title}
            ref={input}
            className="w-4/5 bg-transparent focus:border-0 focus:outline-none"
          />
          <button
            onClick={handleSave}
            title="Save"
          >
            <img src={Save} alt="check" />
          </button>
        </>
      ) : (
        <>
          <p
            className={`whitespace-pre-wrap w-4/5${
              taskContent.isCompleted ? " line-through" : ""
            }`}
          >
            {taskContent.title}
          </p>
          <div className="flex flex-row gap-2">
            <button
              onClick={() => changeTaskStatus(projectId, taskContent.id)}
              title={taskContent.isCompleted ? "Incomplete" : "Complete"}
            >
              <img src={Check} alt="check-circle" />
            </button>
            <button title="Edit" onClick={handleEditClick}>
              <img src={Pencil} alt="pencil-square" />
            </button>
            <button
              title="Delete"
              onClick={() => deleteTask(projectId, taskContent.id)}
            >
              <img src={Delete} alt="x-square" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
