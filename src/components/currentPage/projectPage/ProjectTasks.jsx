// import { React, useContext, useState } from 'react';
import { React, useState } from 'react';
import { useDispatch } from "react-redux";
import {
  closestCorners,
  DndContext,
  useSensor,
  useSensors,
  MouseSensor,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

// import { ProjectManagementContext } from '../../../store/project-management-context';
import { projectManagementActions } from "../../../store/projectManagementSlice";

import Task from './Task';

export default function ProjectTasks({ project }) {
  // const { addTask, updateTaskOrder } = useContext(ProjectManagementContext);
  const dispatch = useDispatch();

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  const [taskTitle, setTaskTitle] = useState('');

  function handleAddTask(event) {
    if (event.key && event.key !== 'Enter') return;

    const title = taskTitle.trim();
    if (title) {
      dispatch(projectManagementActions.addTask(project.id, title, project.taskCounter));
      setTaskTitle('');
    }
  }

  const getTaskPos = (id) => project.tasks.findIndex((task) => task.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    const originalPos = getTaskPos(active.id);
    const newPos = getTaskPos(over.id);

    // updateTaskOrder(project.id, originalPos, newPos);
    dispatch(projectManagementActions.updateTaskOrder(project.id, originalPos, newPos));
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
                <Task key={task.id} taskContent={task} projectId={project.id} />
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
