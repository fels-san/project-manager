import { React } from "react";
import { useDispatch, useSelector } from "react-redux";

import { uiActions } from "../store/uiSlice";

export default function Navigation() {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projects);
  const employees = useSelector((state) => state.employees.employees);
  const actionType = useSelector((state) => state.ui.actionType);
  const selectedProjectId = useSelector((state) => state.ui.selectedProjectId);
  const selectedEmployeeId = useSelector(
    (state) => state.ui.selectedEmployeeId
  );
  const selectedProject = projects.find(
    (project) => project.id === selectedProjectId
  );
  const selectedEmployee = employees.find(
    (employee) => employee.id === selectedEmployeeId
  );

  function handleChangePage(pageName) {
    dispatch(uiActions.setPage(pageName));
  }

  return (
    <nav className="w-full h-auto px-0 mt-5">
      <ul className="flex flex-row gap-4">
        <li>
          <button
            type="button"
            className={`${
              actionType === "none"
                ? "bg-stone-50 text-stone-600"
                : "bg-stone-100 text-stone-400"
            } px-5 pt-4 pb-2 rounded-t-md font-bold cursor-pointer`}
            onClick={() => handleChangePage("general")}
          >
            General{" "}
            <div className="inline bg-stone-200 rounded-full px-1 py-0.5">
              {projects.length}
            </div>
          </button>
        </li>
        <li>
          <button
            type="button"
            className={`${
              actionType === "statitic"
                ? "bg-stone-50 text-stone-600"
                : "bg-stone-100 text-stone-400"
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
                actionType === "editing"
                  ? "bg-stone-50 text-stone-600"
                  : "bg-stone-100 text-stone-400"
              } px-5 pt-4 pb-2 rounded-t-md font-bold cursor-pointer`}
              onClick={() => handleChangePage("current project")}
            >
              Current Project
            </button>
          </li>
        ) : (
          <li>
            <button
              type="button"
              className={`${
                actionType === "creating"
                  ? "bg-stone-50 text-stone-600"
                  : "bg-stone-100 text-stone-400"
              } px-5 pt-4 pb-2 rounded-t-md font-bold cursor-pointer`}
              onClick={() => handleChangePage("new project")}
            >
              New Project
            </button>
          </li>
        )}
        {actionType === "viewingProfile" && selectedEmployee && (
          <li>
            <button
              type="button"
              className={`${
                actionType === "viewingProfile"
                  ? "bg-stone-50 text-stone-600"
                  : "bg-stone-100 text-stone-400"
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
