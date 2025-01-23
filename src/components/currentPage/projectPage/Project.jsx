// import { React, useContext } from "react";
import { React } from "react";
import { useDispatch } from "react-redux";

// import { ProjectManagementContext } from '../../../store/project-management-context';
import { projectManagementActions } from "../../../store/projectManagementSlice";

import ProjectTasks from "./ProjectTasks";
import Dropdown from "../generalPage/dropdown/Dropdown";

export default function Project({ project }) {
  console.log(project);
  function formatDate(date) {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date ? date.toLocaleDateString("en-US", options) : null;
  }

  const dispatch = useDispatch();

  // const { changeProjectStatus, editProject, deleteProject, selectEmployee } =
  //   useContext(ProjectManagementContext);

  function handleChangeProjectStatus(projectId) {
    dispatch(projectManagementActions.changeProjectStatus(projectId));
  }

  function handleEditProject() {
    dispatch(projectManagementActions.editProject());
  }

  function handleDeleteProject(projectId) {
    dispatch(projectManagementActions.deleteProject(projectId));
  }

  function handleSelectEmployee(employeeId) {
    dispatch(projectManagementActions.selectEmployee(employeeId));
  }

  return (
    <div className="box-border w-full h-full flex flex-col py-12 pl-10 pr-44 bg-stone-50 overflow-y-auto">
      <header className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-4 items-end w-4/5">
          <h2 className="break-words text-stone-700 text-3xl font-bold whitespace-pre-wrap">
            {project.title}
          </h2>
          <Dropdown
            selectedOption={{
              title: project.isCompleted ? "completed" : "current",
            }}
            options={[{ type: !project.isCompleted ? "completed" : "current" }]}
            onChange={() => handleChangeProjectStatus(project.id)}
            style={`${
              project.isCompleted
                ? "bg-stone-700 text-stone-200"
                : "bg-none text-stone-700"
            } inline-flex items-center justify-around w-min h-min border-2 border-stone-900 py-0 px-2 rounded-md`}
          />
        </div>

        <div className="flex flex-col items-end text-right">
          <button type="button" onClick={() => handleEditProject()}>
            Edit
          </button>
          <button type="button" onClick={() => handleDeleteProject(project.id)}>
            Delete
          </button>
        </div>
      </header>

      <p className="text-stone-400 mb-3 italic">
        {formatDate(project.startDate)} - {formatDate(project.dueDate)}
      </p>
      <p className="whitespace-pre-wrap">{project.description}</p>
      <p className="text-stone-400 mb-0 mt-4">
        Tags: {project.tag.join("; ")}.
      </p>
      <p className="text-stone-400 mb-0 mt-0">
        Team:{" "}
        {project.team.map((employee, index) => (
          <button
            type="button"
            key={employee.id}
            onClick={() => handleSelectEmployee(employee.id)}
            style={{ cursor: "pointer" }}
          >
            {employee.name}
            {index < project.team.length - 1 ? "; " : "."}
          </button>
        ))}
      </p>
      <hr className="mt-4 border-2 w-full text-stone-300 bg-stone-300 h-0.5" />
      <ProjectTasks project={project} />
    </div>
  );
}
