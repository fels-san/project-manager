// import { React, useState, useContext, useCallback, useRef } from 'react';
import { React, useState, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';

// import { ProjectManagementContext } from '../../../store/project-management-context';

import ProjectsList from './ProjectsList';
import EmployeesList from './employeesList/EmployeesList';
import TagsList from './TagsList';
import SearchBar from './SearchBar';
import Dropdown from './dropdown/Dropdown';

export default function GeneralPage() {
  const projects = useSelector(state => state.projectManagement.projects);

  const [searchText, setSearchText] = useState('');
  // const { projects } = useContext(ProjectManagementContext);
  const [sortType, setSortType] = useState('By Project Status');
  const [isDescending, setIsDescending] = useState(true);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const projectsContainer = useRef(null);

  function scrollToTop() {
    if (projectsContainer.current) {
      projectsContainer.current.scrollTop = 0;
    }
  }

  const handleSearchChange = useCallback((value) => {
    setSearchText(value);
  }, []);

  const handleSortChange = useCallback((type, descending) => {
    setSortType(type);
    setIsDescending(descending);
  }, []);

  const handleTagSelection = useCallback((tag) => {
    setSelectedTags((prevTags) => {
      if (prevTags.includes(tag)) {
        return prevTags.filter((t) => t !== tag);
      }
      return [...prevTags, tag];
    });
  },[]);

  const handleEmployeeSelection = useCallback((employee) => {
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
        project.team.some((teamMember) => teamMember.name === employee)
      );
      const matchesTags = selectedTags.every((tag) =>
        project.tag.includes(tag)
      );

      return matchesTags && matchesEmployees && matchesSearchText;
    });
  }

  function getSortedProjects(filteredProjects) {
    return [...filteredProjects].sort((a, b) => {
      let comparison = 0;

      switch (sortType) {
        case 'By Creation Date':
          comparison = b.id - a.id;
          break;

        case 'By Project Status': {
          const statusA = a.isCompleted ? 'completed' : 'current';
          const statusB = b.isCompleted ? 'completed' : 'current';
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
                title: sortType,
                isDescending,
              }}
              options={[
                { type: 'By Creation Date', isDescending: true },
                { type: 'By Creation Date', isDescending: false },
                { type: 'By Project Status', isDescending: true },
                { type: 'By Project Status', isDescending: false },
              ]}
              onChange={handleSortChange}
            />
          </div>
          <ProjectsList
            projects={sortedProjects}
            isSearchResult={searchText !== ''}
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
