import { React } from "react";

import DotsIcon from "../ui/icons/DotsIcon";

export default function EmployeeItem({
  employee,
  isSelected,
  onSelect,
  onContextMenu,
  projectsCount,
}) {
  return (
    <div
      className={`${
        isSelected
          ? "border-2 bg-stone-600 text-stone-100 px-2"
          : "border-0 text-stone-700"
      } group flex flex-row items-center whitespace-pre-wrap break-normal text-base font-medium border-stone-900 rounded-md px-0 py-0 cursor-pointer transform transition-transform duration-75 hover:scale-105`}
    >
      <button
        type="button"
        className="flex-1"
        onClick={() => onSelect(employee.name)}
      >
        {employee.name}{" "}
        <span className="opacity-55 group-hover:hidden">{projectsCount}</span>
      </button>
      <button
        type="button"
        onClick={(e) => onContextMenu(e, employee)}
        className="opacity-55 hidden group-hover:inline"
      >
        <DotsIcon />
      </button>
    </div>
  );
}
