import { useState, useContext, useCallback } from "react";

import { ProjectManagementContext } from "../../../store/project-management-context";

import ProjectsList from "./ProjectsList";
import EmployeesList from "./EmployeesList";
import TagsList from "./TagsList";
import SearchBar from "./SearchBar";
import Dropdown from "./DropDown";

export default function GeneralPage() {
  const [searchText, setSearchText] = useState("");
  const { projects } = useContext(ProjectManagementContext);
  const [sortType, setSortType] = useState("By Project Status");
  const [isDescending, setIsDescending] = useState(true);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const handleSearchChange = useCallback((value) => {
    setSearchText(value);
  }, []);

  const handleSortChange = useCallback((type, isDescending) => {
    setSortType(type);
    setIsDescending(isDescending);
  }, []);

  function handleTagSelection(tag) {
    setSelectedTags((prevTags) => {
      if (prevTags.includes(tag)) {
        return prevTags.filter((t) => t !== tag);
      } else {
        return [...prevTags, tag];
      }
    });
  }

  function handleEmployeeSelection(employee) {
    setSelectedEmployees((prevEmployees) => {
      if (prevEmployees.includes(employee)) {
        return prevEmployees.filter((t) => t !== employee);
      } else {
        return [...prevEmployees, employee];
      }
    });
  }

  function getFilteredProjects() {
    return projects.filter((project) => {
      // const matchesSearchText =
      //   project.title.toLowerCase().includes(searchText.toLowerCase()) ||
      //   project.description.toLowerCase().includes(searchText.toLowerCase());

      const matchesEmployees = selectedEmployees.every((employee) => project.team.includes(employee));
      const matchesTags = selectedTags.every((tag) => project.tag.includes(tag));

      return matchesTags && matchesEmployees;
    });
  }

  function getSortedProjects(filteredProjects) {
    return [...filteredProjects].sort(
      (a, b) => {
        let comparison = 0;

        switch (sortType) {
          case "By Creation Date":
            comparison = b.id - a.id;
            break;

          case "By Project Status":
            const statusA = a.isCompleted ? "completed" : "current";
            const statusB = b.isCompleted ? "completed" : "current";
            comparison = statusA.localeCompare(statusB);
            break;

          default:
            break;
        }

        return isDescending ? -comparison : comparison;
      }
    );
  }

  const filteredProjects = getFilteredProjects();
  const sortedProjects = getSortedProjects(filteredProjects);

  return (
    <div className="box-border h-full w-full bg-stone-50 flex flex-col items-start justify-start pl-10 py-8 pr-11 overflow-auto">
      <div className="w-full h-full flex flex-row gap-14 py-2">
        <div className="h-full w-4/5">
          <div className="flex flex-row gap-4 items-baseline">
            <SearchBar onSearchChange={handleSearchChange} />
            <Dropdown
              sortType={sortType}
              isDescending={isDescending}
              onSortChange={handleSortChange}
            />
          </div>
          <ProjectsList
            projects={sortedProjects}
            isSearchResult={searchText !== ""}
          />
        </div>
        <div className="w-1/5">
          <EmployeesList selectedEmployees={selectedEmployees} onEmployeeSelection={handleEmployeeSelection} />
          <TagsList selectedTags={selectedTags} onTagSelection={handleTagSelection} />
        </div>
      </div>
    </div>
  );
}
