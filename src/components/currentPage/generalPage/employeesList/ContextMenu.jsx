import { useContext } from "react";

import { ProjectManagementContext } from "../../../../store/project-management-context";

export default function ContextMenu({
  employee,
  menuRef,
  position,
  isVisible,
  onClose,
}) {
  if (!isVisible) return null;

  const { selectEmployee, deleteEmployee } = useContext(
    ProjectManagementContext
  );

  function handleDeleteEmployee() {
    const isEmployeeDeleted = confirm(
      "Are you sure you want to delete this employee? This action cannot be undone."
    );
    if (isEmployeeDeleted) {
      deleteEmployee(employee.id);
    }
  }

  return (
    <div
      ref={menuRef}
      className="absolute mt-1 z-10 w-28 bg-white rounded shadow bg-opacity-95 backdrop-filter backdrop-blur-3xl"
      style={{ top: `${position.y}px`, left: `${position.x}px` }}
    >
      <ul
        className="p-3 space-y-1 text-base text-stone-700"
        aria-labelledby="dropdownBgHoverButton"
      >
        <li>
          <button
            onClick={() => selectEmployee(employee.id)}
            className="w-full text-left roundd-md px-1 hover:bg-stone-100"
          >
            Profile
          </button>
          <button
            className="w-full text-left rounded-md px-1 hover:bg-stone-100"
            onClick={handleDeleteEmployee}
          >
            Delete
          </button>
        </li>
      </ul>
    </div>
  );
}
