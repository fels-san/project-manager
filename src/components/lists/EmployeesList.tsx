import { useRef, useEffect, useState } from "react";

import { useAppSelector } from "../../hooks";
import ContextMenu from "../ui/ContextMenu";
import EmployeeItem from "./EmployeeItem";
import { Employee } from "../../types/types";

type EmployeesListProps = {
  selectedEmployees: string[];
  onEmployeeSelection: (employee: string) => void;
};

export default function EmployeesList({
  selectedEmployees,
  onEmployeeSelection,
}: EmployeesListProps) {
  const projects = useAppSelector((state) => state.projects.projects);
  const employees = useAppSelector((state) => state.employees.employees);

  const [contextMenu, setContextMenu] = useState<{
    isVisible: boolean;
    position: { x: number; y: number };
    employee: Employee | null;
  }>({
    isVisible: false,
    position: { x: 0, y: 0 },
    employee: null,
  });

  const menuRef = useRef<HTMLDivElement | null>(null);

  function openContextMenu(
    event: React.MouseEvent<HTMLButtonElement>,
    employee: Employee
  ) {
    event.preventDefault();
    setContextMenu({
      isVisible: true,
      position: { x: event.clientX, y: event.clientY },
      employee,
    });
  }

  function closeContextMenu() {
    setContextMenu({
      isVisible: false,
      position: { x: 0, y: 0 },
      employee: null,
    });
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeContextMenu();
      }
    }

    function handleScroll() {
      closeContextMenu();
    }

    if (contextMenu.isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("wheel", handleScroll);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("wheel", handleScroll);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("wheel", handleScroll);
    };
  }, [contextMenu.isVisible, closeContextMenu]);

  const getEmployeeProjectsCount = (employeeName: string) =>
    projects.filter((project) =>
      project.team.some((employee) => employee === employeeName)
    ).length;

  return (
    <div className="w-full">
      <h2 className="text-stone-800 text-2xl font-bold my-4">
        Workers <span className="opacity-55">{employees.length}</span>
      </h2>
      <div className="flex flex-wrap gap-x-9 gap-y-2">
        {employees.map((employee) => (
          <EmployeeItem
            key={employee.name}
            employee={employee}
            isSelected={selectedEmployees.includes(employee.name)}
            onSelect={onEmployeeSelection}
            onContextMenu={openContextMenu}
            projectsCount={getEmployeeProjectsCount(employee.name)}
          />
        ))}
      </div>
      {contextMenu.employee && (
        <ContextMenu
          position={contextMenu.position}
          isVisible={contextMenu.isVisible}
          employee={contextMenu.employee}
          menuRef={menuRef}
        />
      )}
    </div>
  );
}
