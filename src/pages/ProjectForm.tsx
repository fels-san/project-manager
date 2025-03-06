import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useParams, useNavigate, Link } from "react-router-dom";

import { projectsActions } from "../store/projectsSlice";
import { employeesActions } from "../store/employeesSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

import ListDisplay from "../components/ui/ListDisplay";
import InputField from "../components/ui/InputField";
import { formatDateISO } from "../utils/utils";

export default function ProjectForm() {
  const dispatch = useAppDispatch();
  const employees = useAppSelector((state) => state.employees.employees);
  const projects = useAppSelector((state) => state.projects.projects);

  const navigate = useNavigate();
  const params = useParams();
  const project = projects.find((p) => p.id === params.projectId);

  const [tags, setTags] = useState(project ? project.tag : []);
  const [team, setTeam] = useState(project ? project.team : []);
  const [errors, setErrors] = useState<{
    title: boolean;
    description: boolean;
    startDate: boolean;
    dueDate: boolean;
  }>({ title: false, description: false, startDate: false, dueDate: false });

  const [formData, setFormData] = useState({
    title: project ? project.title : "",
    description: project ? project.description : "",
    dueDate: project ? formatDateISO(project.dueDate) : "",
    startDate: project ? formatDateISO(project.startDate) : "",
  });

  const suggestionsList = employees.map((employee) => employee.name);

  function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newErrors: {
      title: boolean;
      description: boolean;
      startDate: boolean;
      dueDate: boolean;
    } = { title: false, description: false, startDate: false, dueDate: false };

    if (!formData.title) newErrors.title = true;
    if (!formData.description) newErrors.description = true;
    if (!formData.startDate) newErrors.startDate = true;
    if (!formData.dueDate) newErrors.dueDate = true;

    setErrors(newErrors);
    if (Object.values(newErrors).some((error) => error)) return;

    const correctedTeam = team.map((employee) => ({
      name: employee,
      isSelected: false,
    }));

    if (project) {
      dispatch(employeesActions.addEmployees(correctedTeam));
      dispatch(
        projectsActions.updateProject({
          id: project.id,
          title: formData.title,
          description: formData.description,
          dueDate: formData.dueDate.toString(),
          startDate: formData.startDate.toString(),
          team,
          tag: tags,
          isCompleted: project.isCompleted,
          isSelected: project.isSelected,
          taskCounter: project.taskCounter,
          tasks: project.tasks,
        })
      );
      navigate(`/project/${project.id}`);
    } else {
      dispatch(employeesActions.addEmployees(correctedTeam));
      dispatch(
        projectsActions.addProject({
          id: uuidv4(),
          title: formData.title,
          description: formData.description,
          dueDate: formData.dueDate.toString(),
          startDate: formData.startDate.toString(),
          team,
          tag: tags,
          isCompleted: false,
          isSelected: false,
          taskCounter: 0,
          tasks: [],
        })
      );
      navigate("/");
    }
  }

  function handleAddTeamMember(newMember: string) {
    setTeam((prevTeam) => [...prevTeam, newMember]);
  }

  function handleAddTag(newTag: string) {
    setTags((prevTags) => [...prevTags, newTag]);
  }

  function handleChange(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <form
      onSubmit={handleSave}
      className="box-border w-full h-full flex flex-col pt-9 pb-10 pl-10 pr-44 bg-stone-50 overflow-y-scroll"
    >
      <InputField
        label="Title"
        hasError={errors.title}
        defaultValue={formData.title}
        onChange={(e) => handleChange("title", e.target.value)}
      />
      <InputField
        label="Description"
        isTextArea
        hasError={errors.description}
        defaultValue={formData.description}
        onChange={(e) => handleChange("description", e.target.value)}
      />
      <InputField
        label="Start date"
        type="date"
        hasError={errors.startDate}
        defaultValue={formData.startDate}
        onChange={(e) => handleChange("startDate", e.target.value)}
      />
      <InputField
        label="Due date"
        type="date"
        hasError={errors.dueDate}
        defaultValue={formData.dueDate}
        onChange={(e) => handleChange("dueDate", e.target.value)}
      />
      <InputField
        label="Team members"
        suggestionsList={suggestionsList}
        isListInput
        onAddItem={handleAddTeamMember}
      />
      <ListDisplay list={team} setList={setTeam} />
      <InputField label="Tags" isListInput onAddItem={handleAddTag} />
      <ListDisplay list={tags} setList={setTags} />
      <div className="flex flex-row justify-end gap-3 mb-2 mt-2">
        <Link to={project ? `/project/${project.id}` : "/"}>Cancel</Link>
        <button
          type="submit"
          className="bg-stone-700 text-stone-50 rounded-md px-6 py-2"
        >
          Save
        </button>
      </div>
    </form>
  );
}
