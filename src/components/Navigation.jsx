// import { React, useContext } from 'react';
import { React } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import { ProjectManagementContext } from '../store/project-management-context';
import { projectManagementActions } from '../store/projectManagementSlice';

export default function Navigation() {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projectManagement.projects);
  const actionType = useSelector((state) => state.projectManagement.actionType);
  const selectedProject = useSelector((state) => state.projectManagement.selectedProject);
  const selectedEmployee = useSelector((state) => state.projectManagement.selectedEmployee);
  // const {
  //   changePage,
  //   actionType,
  //   selectedProject,
  //   selectedEmployee,
  //   projects,
  // } = useContext(ProjectManagementContext);

  function handleChangePage(pageName) {
    dispatch(projectManagementActions.changePage(pageName));
  }

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
            onClick={() => handleChangePage('general')}
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
              onClick={() => handleChangePage('current project')}
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
              onClick={() => handleChangePage('new project')}
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
