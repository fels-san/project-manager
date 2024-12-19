import { useContext } from "react";

import { ProjectManagementContext } from "../../../store/project-management-context";

export default function TagsList({ selectedTags, onTagSelection }) {
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
      <div className="flex flex-wrap gap-x-2 gap-y-2">
        {tags.map((tag, index) => (
          <div key={index}>
            <div
              onClick={() => onTagSelection(tag.name)}
              className={`${
                selectedTags.includes(tag.name)
                  ? "border-2 bg-stone-600 text-stone-100 px-2"
                  : "border-0"
              } whitespace-pre-wrap break-normal text-stone-700 text-base font-medium border-stone-900 rounded-md px-0 py-0 cursor-pointer transform transition-transform duration-75 hover:scale-105`}
            >
              {tag.name + " "}
              <span className="opacity-55">
                {
                  projects.filter((project) => project.tag.includes(tag.name))
                    .length
                }
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
