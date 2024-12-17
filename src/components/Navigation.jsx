import { useContext } from "react";

import { ProjectManagementContext } from "../store/project-management-context";

export default function Navigation() {
  const { changePage, actionType, selectedProject } = useContext(
    ProjectManagementContext
  );

  return (
    <nav className="w-full h-auto px-0 mt-5">
      <ul className="flex flex-row gap-4">
        <li
          className={`${
            actionType === "none"
              ? "bg-stone-50 text-stone-600"
              : "bg-stone-100 text-stone-400"
          } px-5 pt-4 pb-2 rounded-t-md font-bold cursor-pointer`}
          onClick={() => changePage("general")}
        >
          General
        </li>
        <li
          className={`${
            actionType === "statictic"
              ? "bg-stone-50 text-stone-600"
              : "bg-stone-100 text-stone-400"
          } px-5 pt-4 pb-2 rounded-t-md font-bold cursor-pointer`}
        >
          Statictic
        </li>
        {selectedProject ? (
          <li
            className={`${
              actionType === "editing"
                ? "bg-stone-50 text-stone-600"
                : "bg-stone-100 text-stone-400"
            } px-5 pt-4 pb-2 rounded-t-md font-bold cursor-pointer`}
            onClick={() => changePage("current project")}
          >
            Current Project
          </li>
        ) : (
          <li
            className={`${
              actionType === "creating"
                ? "bg-stone-50 text-stone-600"
                : "bg-stone-100 text-stone-400"
            } px-5 pt-4 pb-2 rounded-t-md font-bold cursor-pointer`}
            onClick={() => changePage("new project")}
          >
            New Project
          </li>
        )}
      </ul>
    </nav>
  );
}
