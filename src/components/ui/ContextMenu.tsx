import { useNavigate } from "react-router-dom";

import { uiActions } from "../../store/uiSlice";
import { projectsActions } from "../../store/projectsSlice";
import { employeesActions } from "../../store/employeesSlice";
import { useAppDispatch } from "../../hooks";
import { Employee } from "../../types/types";

type ContextMenuProps = {
  employee: Employee;
  menuRef: React.RefObject<HTMLDivElement>;
  position: { x: number; y: number };
  isVisible: boolean;
};

export default function ContextMenu({
  employee,
  menuRef,
  position,
  isVisible,
}: ContextMenuProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleSelectEmployee() {
    dispatch(uiActions.setSelectedEmployee(employee.name));
    navigate(`/employee/${employee.name}`);
  }

  function handleDeleteEmployee() {
    // eslint-disable-next-line no-restricted-globals, no-alert
    const isEmployeeDeleted = confirm(
      "Are you sure you want to delete this employee? This action cannot be undone."
    );
    if (isEmployeeDeleted) {
      dispatch(employeesActions.deleteEmployee(employee.name));
      dispatch(projectsActions.deleteEmployeeFromProjects(employee.name));
      navigate("/");
    }
  }

  if (!isVisible) return null;

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
            type="button"
            onClick={handleSelectEmployee}
            className="w-full text-left roundd-md px-1 hover:bg-stone-100"
          >
            Profile
          </button>
          <button
            type="button"
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
