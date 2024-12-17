import { useContext } from "react";

import { ProjectManagementContext } from "../../../store/project-management-context";

export default function TagsList() {
  const { projects } = useContext(ProjectManagementContext);

  const tags = [
    { name: "Web Design", count: 5 },
    { name: "Mobile Development", count: 3 },
    { name: "E-commerce", count: 4 },
    { name: "UI/UX Design", count: 6 },
    { name: "Responsive Design", count: 2 },
    { name: "Branding", count: 3 },
    { name: "User Experience", count: 7 },
  ];

  return (
    <div>
      <h2 className="text-stone-800 text-2xl font-bold my-4">
        Tags - {tags.length}
      </h2>
      <div className="grid grid-cols-4 gap-3">
        {tags.map((tag, index) => (
          <div key={index}>
            <div className="text-stone-700 text-base font-semibold border-stone-900 border-2 rounded-md px-4 py-2 text-center cursor-pointer transform transition-transform duration-75 hover:scale-105">
              {tag.name} -{" "}
              {
                projects.filter((project) => project.tag.includes(tag.name))
                  .length
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
