import { useRef, useContext, useState } from "react";

import { ProjectManagementContext } from "../../../store/project-management-context";

import ListDisplay from "./ListDisplay";
import InputField from "./InputField";

export default function NewProject() {
  const label = "uppercase font-bold text-stone-600 mb-2";

  const { cancelProject, addProject } = useContext(ProjectManagementContext);

  const [tags, setTags] = useState([]);
  const [team, setTeam] = useState([]);

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

    addProject({
      title: title.current.value,
      description: description.current.value,
      dueDate: new Date(dueDate.current.value),
      startDate: new Date(startDate.current.value),
      team: team,
      tag: tags,
      isCompleted: false,
      isSelected: false,
      taskCounter: 0,
      tasks: [],
    });
  }

  return (
    <div className="box-border w-full h-full flex flex-col pt-9 pb-10 pl-10 pr-44 bg-stone-50 overflow-y-scroll">
      <InputField label="Title" ref={title} />
      <InputField label="Description" ref={description} isTextArea={true} />
      <InputField label="Start date" type="date" ref={startDate} />
      <InputField label="Due date" type="date" ref={dueDate} />
      <InputField label="Team members" ref={member} setList={setTeam} />
      <ListDisplay list={team} setList={setTeam} />
      <InputField label="Tags" ref={tag} setList={setTags} />
      <ListDisplay list={tags} setList={setTags} />
      <div className="flex flex-row justify-end gap-3 mb-2">
        <button onClick={cancelProject}>Cancel</button>
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
