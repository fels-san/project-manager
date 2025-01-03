import { useContext, useRef, useEffect, useState } from "react";

import { ProjectManagementContext } from "../../../../store/project-management-context";
import ContextMenu from "./ContextMenu";
import EmployeeItem from "./EmployeeItem";

export default function EmployeesList({
  selectedEmployees,
  onEmployeeSelection,
}) {
  const { projects, employees } = useContext(ProjectManagementContext);

  console.log(employees);

  const [contextMenu, setContextMenu] = useState({
    isVisible: false,
    position: { x: 0, y: 0 },
    employeeName: null,
  });

  const menuRef = useRef(null);

  function handleContextMenu(e, employee) {
    e.preventDefault();
    setContextMenu({
      isVisible: true,
      position: { x: e.clientX, y: e.clientY },
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
  }, [contextMenu.isVisible]);

  const getEmployeeProjectsCount = (employeeId) => {
    return projects.filter((project) =>
      project.team.some((employee) => employee?.id === employeeId)
    ).length;
  };

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
            onContextMenu={handleContextMenu}
            projectsCount={getEmployeeProjectsCount(employee.id)}
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
