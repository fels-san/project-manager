import { useState, useContext } from "react";

import { ProjectManagementContext } from "../../../store/project-management-context";

import ProjectsList from "./ProjectsList";
import EmployeesList from "./EmployeesList";
import TagsList from "./TagsList";

export default function GeneralPage() {
  const [searchText, setSearchText] = useState("");
  const { projects } = useContext(ProjectManagementContext);

  function handleSearchChange(event) {
    setSearchText(event.target.value);
  }

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchText.toLowerCase()) ||
      project.description.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="box-border h-full w-full bg-stone-50 flex flex-col items-start justify-start pl-10 py-10 pr-44 overflow-y-auto">
      <div>
        <form>
          <input
            className="w-80 p-2 rounded-md border-2 border-stone-300 focus:outline-none"
            autoComplete="off"
            inputMode="search"
            type="search"
            placeholder="What do you want to find?"
            onChange={handleSearchChange}
          />
        </form>
      </div>
      {searchText === "" ? (
        <>
          <ProjectsList />
          <hr className="mt-10 w-full border-2 text-stone-400 bg-stone-400 h-0.5" />
          <EmployeesList />
          <hr className="mt-10 w-full border-2 text-stone-400 bg-stone-400 h-0.5" />
          <TagsList />
        </>
      ) : (
        <div className="py-5">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <div
                key={project.id}
                className={`${
                  project.isCompleted === true ? "opacity-30" : ""
                } border-2 border-stone-900 rounded-md p-4 mb-4 cursor-pointer`}
                onClick={() => selectProject(project.id)}
              >
                <h3 className="text-base text-stone-800 font-semibold mb-2">
                  {project.title}
                </h3>
                <p
                  className="overflow-hidden text-ellipsis"
                  style={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 5,
                  }}
                >
                  {project.description}
                </p>
              </div>
            ))
          ) : (
            <p>No projects found matching your search.</p>
          )}
        </div>
      )}
    </div>
  );
}
