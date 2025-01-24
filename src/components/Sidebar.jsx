import { React } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { projectsActions } from '../store/projectsSlice';
import uiSlice, { uiActions } from '../store/uiSlice';

export default function Sidebar() {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projects);

  function handleCreateProject() {
    dispatch(projectsActions.clearSelection());
    dispatch(uiActions.setActionType("creating"));
  }

  function handleSelectProject(projectId) {
    dispatch(uiSlice.setSelectedProject(projectId));
    dispatch(uiActions.setActionType("editing"));
  }

  const currentProjects = projects.filter(
    (project) => project.isCompleted === false
  );
  const completedProjects = projects.filter(
    (project) => project.isCompleted === true
  );

  return (
    <aside className="w-1/5 h-full bg-stone-900 px-6 py-12 rounded-tr-lg break-words overflow-y-auto">
      <h2 className="text-stone-50 uppercase text-xl font-bold">
        Your projects
      </h2>
      <button
        type="button"
        onClick={handleCreateProject}
        className="bg-stone-700 text-stone-400 rounded-md px-4 py-2 my-7"
      >
        + Add Project
      </button>
      <h3 className="text-stone-300 font-bold text-lg mb-4">
        Current Projects
      </h3>
      {currentProjects.map((project) => (
        <button
          type="button"
          onClick={() => handleSelectProject(project.id)}
          key={project.id}
          className={`${
            project.isSelected
              ? 'bg-stone-800 text-stone-300'
              : 'text-stone-400'
          } text-left w-full mb-3 p-2`}
        >
          {project.title}
        </button>
      ))}
      <h3 className="text-stone-400 font-bold text-lg mb-4">
        Completed Projects
      </h3>
      {completedProjects.map((project) => (
        <button
          type="button"
          onClick={() => handleSelectProject(project.id)}
          key={project.id}
          className={`${
            project.isSelected
              ? 'bg-stone-800 text-stone-300'
              : 'text-stone-400'
          } text-left w-full mb-3 p-2`}
        >
          {project.title}
        </button>
      ))}
    </aside>
  );
}
