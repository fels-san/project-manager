import { useState, useRef, useContext } from "react";

import { ProjectManagementContext } from "../../../store/project-management-context";

import ListDisplay from "./ListDisplay";
import InputField from "./InputField";

function formatDate(date) {
  if (!date) return "";
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function EditProject({ project }) {
  const [tags, setTags] = useState(project.tag);
  const [team, setTeam] = useState(project.team);

  const { cancelEditing, updateProject } = useContext(ProjectManagementContext);

  const title = useRef();
  const description = useRef();
  const dueDate = useRef();
  const startDate = useRef();
  const member = useRef();
  const tag = useRef();

  function handleSave() {
    const valid =
      title.current.value &&
      description.current.value &&
      dueDate.current.value &&
      startDate.current.value;
    if (!valid) return;

    updateProject(project, {
      title: title.current.value,
      description: description.current.value,
      dueDate: new Date(dueDate.current.value),
      startDate: new Date(startDate.current.value),
      team: team,
      tag: tags,
    });
  }

  return (
    <div className="box-border w-full h-full flex flex-col pt-9 pb-10 pl-10 pr-44 bg-stone-50 overflow-y-scroll">
      <InputField label="Title" ref={title} defaultValue={project.title} />
      <InputField
        label="Description"
        ref={description}
        defaultValue={project.description}
        isTextArea={true}
      />
      <InputField
        label="Start date"
        type="date"
        ref={startDate}
        defaultValue={formatDate(project.startDate)}
      />
      <InputField
        label="Due date"
        type="date"
        ref={dueDate}
        defaultValue={formatDate(project.dueDate)}
      />
      <InputField label="Team members" ref={member} setList={setTeam} />
      <ListDisplay list={team} setList={setTeam} />
      <InputField label="Tags" ref={tag} setList={setTags} />
      <ListDisplay list={tags} setList={setTags} />
      <div className="flex flex-row justify-end gap-3 mb-2">
        <button onClick={cancelEditing}>Cancel</button>
        <button
            onClick={handleSave}
          className="bg-stone-700 text-stone-50 rounded-md px-6 py-2"
        >
          Save
        </button>
      </div>
    </div>
  );
}
