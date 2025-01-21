import { React, useContext } from 'react';

import { ProjectManagementContext } from '../store/project-management-context';

export default function Navigation() {
  const {
    changePage,
    actionType,
    selectedProject,
    selectedEmployee,
    projects,
  } = useContext(ProjectManagementContext);

  return (
    <nav className="w-full h-auto px-0 mt-5">
      <ul className="flex flex-row gap-4">
        <li>
          <button
            type="button"
            className={`${
              actionType === 'none'
                ? 'bg-stone-50 text-stone-600'
                : 'bg-stone-100 text-stone-400'
            } px-5 pt-4 pb-2 rounded-t-md font-bold cursor-pointer`}
            onClick={() => changePage('general')}
          >
            General{' '}
            <div className="inline bg-stone-200 rounded-full px-1 py-0.5">
              {projects.length}
            </div>
          </button>
        </li>
        <li>
          <button
            type="button"
            className={`${
              actionType === 'statitic'
                ? 'bg-stone-50 text-stone-600'
                : 'bg-stone-100 text-stone-400'
            } px-5 pt-4 pb-2 rounded-t-md font-bold cursor-pointer`}
          >
            Statitic
          </button>
        </li>
        {selectedProject ? (
          <li>
            <button
              type="button"
              className={`${
                actionType === 'editing'
                  ? 'bg-stone-50 text-stone-600'
                  : 'bg-stone-100 text-stone-400'
              } px-5 pt-4 pb-2 rounded-t-md font-bold cursor-pointer`}
              onClick={() => changePage('current project')}
            >
              Current Project
            </button>
          </li>
        ) : (
          <li>
            <button
              type="button"
              className={`${
                actionType === 'creating'
                  ? 'bg-stone-50 text-stone-600'
                  : 'bg-stone-100 text-stone-400'
              } px-5 pt-4 pb-2 rounded-t-md font-bold cursor-pointer`}
              onClick={() => changePage('new project')}
            >
              New Project
            </button>
          </li>
        )}
        {actionType === 'viewingProfile' && selectedEmployee && (
          <li>
            <button
              type="button"
              className={`${
                actionType === 'viewingProfile'
                  ? 'bg-stone-50 text-stone-600'
                  : 'bg-stone-100 text-stone-400'
              } px-5 pt-4 pb-2 rounded-t-md font-bold cursor-pointer`}
            >
              {selectedEmployee.name}
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
