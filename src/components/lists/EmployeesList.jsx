import { React, useRef, useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";

import ContextMenu from "../ui/ContextMenu";
import EmployeeItem from "./EmployeeItem";

export default function EmployeesList({
  selectedEmployees,
  onEmployeeSelection,
}) {
  const projects = useSelector((state) => state.projects.projects);
  const employees = useSelector((state) => state.employees.employees);

  const [contextMenu, setContextMenu] = useState({
    isVisible: false,
    position: { x: 0, y: 0 },
    employeeName: null,
  });

  const menuRef = useRef(null);

  const openContextMenu = useCallback((e, employee) => {
    e.preventDefault();
    setContextMenu({
      isVisible: true,
      position: { x: e.clientX, y: e.clientY },
      employee,
    });
  }, []);

  const closeContextMenu = useCallback(() => {
    setContextMenu({
      isVisible: false,
      position: { x: 0, y: 0 },
      employee: null,
    });
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
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

  const getEmployeeProjectsCount = (employeeName) =>
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
            key={employee.id}
            employee={employee}
            isSelected={selectedEmployees.includes(employee.name)}
            onSelect={onEmployeeSelection}
            onContextMenu={openContextMenu}
            projectsCount={getEmployeeProjectsCount(employee.name)}
          />
        ))}
      </div>
      <ContextMenu
        position={contextMenu.position}
        isVisible={contextMenu.isVisible}
        employee={contextMenu.employee}
        onClose={closeContextMenu}
        menuRef={menuRef}
      />
    </div>
  );
}
