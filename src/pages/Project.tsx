import { useParams, Link, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../hooks";
import { projectsActions } from "../store/projectsSlice";
import { uiActions } from "../store/uiSlice";

import ProjectTasks from "../components/tasks/ProjectTasks";
import Dropdown from "../components/ui/Dropdown";
import { formatDateLong } from "../utils/utils";

export default function Project() {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((state) => state.projects.projects);

  const navigate = useNavigate();
  const params = useParams();
  const project = projects.find((p) => p.id === params.projectId)!;

  function handleChangeProjectStatus(projectId: string) {
    dispatch(projectsActions.changeProjectStatus(projectId));
  }

  function handleDeleteProject(projectId: string) {
    dispatch(projectsActions.deleteProject(projectId));
    navigate("/");
  }

  function handleSelectEmployee(employeeName: string) {
    dispatch(uiActions.setSelectedEmployee(employeeName));
    navigate(`/employee/${employeeName}`);
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
              type: project.isCompleted ? "completed" : "current",
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
          <Link to={`/project/${project.id}/edit`}>Edit</Link>
          <button type="button" onClick={() => handleDeleteProject(project.id)}>
            Delete
          </button>
        </div>
      </header>

      <p className="text-stone-400 mb-3 italic">
        {formatDateLong(project.startDate)} - {formatDateLong(project.dueDate)}
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
            key={employee}
            onClick={() => handleSelectEmployee(employee)}
            style={{ cursor: "pointer" }}
          >
            {employee}
            {index < project.team.length - 1 ? "; " : "."}
          </button>
        ))}
      </p>
      <hr className="mt-4 border-2 w-full text-stone-300 bg-stone-300 h-0.5" />
      <ProjectTasks project={project} />
    </div>
  );
}
