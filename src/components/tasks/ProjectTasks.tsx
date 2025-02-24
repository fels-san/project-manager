import { useState } from "react";
import {
  closestCorners,
  DndContext,
  useSensor,
  useSensors,
  MouseSensor,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { projectsActions } from "../../store/projectsSlice";
import { useAppDispatch } from "../../hooks";
import { Project } from "../../types/types";

import TaskItem from "./Task";

type ProjectTasksProps = {
  project: Project;
}

export default function ProjectTasks({ project }: ProjectTasksProps) {
  const dispatch = useAppDispatch();

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  const [taskTitle, setTaskTitle] = useState("");

  function handleAddTask(event: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>) {
    if ("key" in event && event.key !== "Enter") return;

    const title = taskTitle.trim();
    if (title) {
      dispatch(
        projectsActions.addTask({
          projectId: project.id,
          taskTitle: title,
          taskId: project.taskCounter,
        })
      );
      setTaskTitle("");
    }
  }

  const getTaskPos = (id: number) => project.tasks.findIndex((task) => task.id === id);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const originalPos = getTaskPos(Number(active.id));
    const newPos = getTaskPos(Number(over.id));

    dispatch(
      projectsActions.updateTaskOrder({
        projectId: project.id,
        originalPos,
        newPos,
      })
    );
  };

  return (
    <>
      <h2 className="text-stone-700 text-3xl font-bold my-3">Tasks</h2>
      <div className="flex flex-row justify-between items-baseline pr-2">
        <input
          value={taskTitle}
          type="text"
          onChange={(e) => setTaskTitle(e.target.value)}
          onKeyDown={handleAddTask}
          className="bg-stone-200 mr-4 mb-4 h-7 w-11/12 rounded-md pl-2"
        />
        <button type="button" onClick={handleAddTask}>
          Add Task
        </button>
      </div>
      <DndContext
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
        sensors={sensors}
      >
        {project.tasks.length > 0 ? (
          <div className="bg-stone-100 py-8 px-5 rounded-md flex flex-col gap-4">
            <SortableContext
              items={project.tasks}
              strategy={verticalListSortingStrategy}
            >
              {project.tasks.map((task) => (
                <TaskItem key={task.id} taskContent={task} projectId={project.id} />
              ))}
            </SortableContext>
          </div>
        ) : (
          <p>This project does not have any tasks yet.</p>
        )}
      </DndContext>
    </>
  );
}
