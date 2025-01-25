import { React, useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { projectsActions } from "../../store/projectsSlice";

import Check from "../../assets/check-circle.svg";
import Save from "../../assets/check-lg.svg";
import Pencil from "../../assets/pencil-square.svg";
import Delete from "../../assets/x-square.svg";

export default function Task({ taskContent, projectId }) {
  const dispatch = useDispatch();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: taskContent.id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const [isEditing, setIsEditing] = useState(false);

  const input = useRef();

  function handleEditClick() {
    setIsEditing((editing) => !editing);
  }

  function handleSave(event) {
    if (event.key && event.key !== "Enter") return;
    dispatch(
      projectsActions.updateTask({
        projectId,
        updatedTask: { ...taskContent, title: input.current.value },
      })
    );
    setIsEditing((editing) => !editing);
  }

  function handleChangeTaskStatus(taskContentId) {
    dispatch(
      projectsActions.changeTaskStatus({
        projectId,
        taskId: taskContentId,
      })
    );
  }

  function handleDeleteTask(taskContentId) {
    dispatch(
      projectsActions.deleteTask({ projectId, taskId: taskContentId })
    );
  }

  useEffect(() => {
    if (isEditing && input.current) {
      input.current.focus();
    }
  }, [isEditing]);

  return (
    <div
      ref={setNodeRef}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...attributes}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...listeners}
      style={style}
      className="flex flex-row justify-between"
    >
      {isEditing ? (
        <>
          <input
            onKeyDown={handleSave}
            onBlur={handleSave}
            type="text"
            defaultValue={taskContent.title}
            ref={input}
            className="w-4/5 bg-transparent focus:border-0 focus:outline-none"
          />
          <button type="button" onClick={handleSave} title="Save">
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
              type="button"
              onClick={() => handleChangeTaskStatus(projectId, taskContent.id)}
              title={taskContent.isCompleted ? "Incomplete" : "Complete"}
            >
              <img src={Check} alt="check-circle" />
            </button>
            <button type="button" title="Edit" onClick={handleEditClick}>
              <img src={Pencil} alt="pencil-square" />
            </button>
            <button
              type="button"
              title="Delete"
              onClick={() => handleDeleteTask(projectId, taskContent.id)}
            >
              <img src={Delete} alt="x-square" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
