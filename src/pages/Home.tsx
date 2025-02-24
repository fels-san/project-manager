import { useState, useCallback, useRef } from "react";

import ProjectsList from "../components/lists/ProjectsList";
import EmployeesList from "../components/lists/EmployeesList";
import TagsList from "../components/lists/TagsList";
import SearchBar from "../components/ui/SearchBar";
import Dropdown from "../components/ui/Dropdown";
import { useAppSelector } from "../hooks";
import { Project } from "../types/types";

export default function Home() {
  const projects = useAppSelector((state) => state.projects.projects);

  const [searchText, setSearchText] = useState("");
  const [sortType, setSortType] = useState("By Project Status");
  const [isDescending, setIsDescending] = useState(true);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  const projectsContainer = useRef<HTMLDivElement>(null);

  function scrollToTop() {
    if (projectsContainer.current) {
      projectsContainer.current.scrollTop = 0;
    }
  }

  const handleSearchChange = useCallback((value: string) => {
    setSearchText(value);
  }, []);

  const handleSortChange = useCallback(
    (type: string, descending: boolean = false) => {
      setSortType(type);
      setIsDescending(descending);
    },
    []
  );

  const handleTagSelection = useCallback((tag: string) => {
    setSelectedTags((prevTags) => {
      if (prevTags.includes(tag)) {
        return prevTags.filter((t) => t !== tag);
      }
      return [...prevTags, tag];
    });
  }, []);

  const handleEmployeeSelection = useCallback((employee: string) => {
    setSelectedEmployees((prevEmployees) => {
      if (prevEmployees.includes(employee)) {
        return prevEmployees.filter((t) => t !== employee);
      }
      return [...prevEmployees, employee];
    });
  }, []);

  function getFilteredProjects() {
    scrollToTop();
    return projects.filter((project) => {
      const matchesSearchText =
        project.title.toLowerCase().includes(searchText.toLowerCase()) ||
        project.description.toLowerCase().includes(searchText.toLowerCase());

      const matchesEmployees = selectedEmployees.every((employee) =>
        project.team.some((teamMember) => teamMember === employee)
      );
      const matchesTags = selectedTags.every((tag) =>
        project.tag.includes(tag)
      );

      return matchesTags && matchesEmployees && matchesSearchText;
    });
  }

  function getSortedProjects(filteredProjects: Project[]) {
    return [...filteredProjects].sort((a: Project, b: Project) => {
      let comparison = 0;

      switch (sortType) {
        case "By Deadline":
          comparison =
            new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
          break;

        case "By Project Status": {
          const statusA = a.isCompleted ? "completed" : "current";
          const statusB = b.isCompleted ? "completed" : "current";
          comparison = statusA.localeCompare(statusB);
          break;
        }

        default:
          break;
      }

      return isDescending ? -comparison : comparison;
    });
  }

  const filteredProjects = getFilteredProjects();
  const sortedProjects = getSortedProjects(filteredProjects);

  return (
    <div
      ref={projectsContainer}
      className="box-border h-full w-full bg-stone-50 flex flex-col items-start justify-start pl-10 py-8 pr-11 overflow-auto scroll-smooth"
    >
      <div className="w-full h-full flex flex-row gap-14">
        <div className="h-full w-4/5">
          <div className="flex flex-row gap-4 items-baseline">
            <SearchBar onSearchChange={handleSearchChange} />
            <Dropdown
              selectedOption={{
                type: sortType,
                isDescending,
              }}
              style=""
              options={[
                { type: "By Deadline", isDescending: true },
                { type: "By Deadline", isDescending: false },
                { type: "By Project Status", isDescending: true },
                { type: "By Project Status", isDescending: false },
              ]}
              onChange={handleSortChange}
            />
          </div>
          <ProjectsList
            projects={sortedProjects}
            isSearchResult={searchText !== ""}
          />
        </div>
        <div className="w-1/5">
          <EmployeesList
            selectedEmployees={selectedEmployees}
            onEmployeeSelection={handleEmployeeSelection}
          />
          <TagsList
            selectedTags={selectedTags}
            onTagSelection={handleTagSelection}
          />
        </div>
      </div>
    </div>
  );
}
