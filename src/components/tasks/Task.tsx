import { useRef, useState, useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { projectsActions } from "../../store/projectsSlice";

import Check from "../../assets/check-circle.svg";
import Save from "../../assets/check-lg.svg";
import Pencil from "../../assets/pencil-square.svg";
import Delete from "../../assets/x-square.svg";
import { Task } from "../../types/types";
import { useAppDispatch } from "../../hooks";

type TaskItemProps = {
  taskContent: Task;
  projectId: string;
}

export default function TaskItem({ taskContent, projectId }: TaskItemProps) {
  const dispatch = useAppDispatch();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: taskContent.id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const [isEditing, setIsEditing] = useState(false);

  const input = useRef<HTMLInputElement | null>(null);

  function handleEditClick() {
    setIsEditing((editing) => !editing);
  }

  function handleSave(event: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement> | React.FocusEvent<HTMLInputElement>) {
    if ("key" in event && event.key !== "Enter") return;
    dispatch(
      projectsActions.updateTask({
        projectId,
        task: { ...taskContent, title: input.current!.value },
      })
    );
    setIsEditing((editing) => !editing);
  }

  function handleChangeTaskStatus(taskContentId: number) {
    dispatch(
      projectsActions.changeTaskStatus({
        projectId,
        taskId: taskContentId,
      })
    );
  }

  function handleDeleteTask(taskContentId: number) {
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
              onClick={() => handleChangeTaskStatus(taskContent.id)}
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
              onClick={() => handleDeleteTask(taskContent.id)}
            >
              <img src={Delete} alt="x-square" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
