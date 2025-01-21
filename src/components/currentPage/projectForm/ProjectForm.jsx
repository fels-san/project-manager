import { React, useState, useContext, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { ProjectManagementContext } from '../../../store/project-management-context';

import ListDisplay from './ListDisplay';
import InputField from './InputField';

function formatDate(date) {
  if (!date) return '';
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function ProjectForm({ project = null }) {
  const { employees, cancelProject, cancelEditing, addProject, updateProject } =
    useContext(ProjectManagementContext);

  const [tags, setTags] = useState(project ? project.tag : []);
  const [team, setTeam] = useState(project ? project.team : []);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    title: project ? project.title : '',
    description: project ? project.description : '',
    dueDate: project ? formatDate(project.dueDate) : '',
    startDate: project ? formatDate(project.startDate) : '',
  });

  const suggestionsList = employees.map((employee) => employee.name);

  function handleSave() {
    const newErrors = {};

    if (!formData.title) newErrors.title = true;
    if (!formData.description) newErrors.description = true;
    if (!formData.startDate) newErrors.startDate = true;
    if (!formData.dueDate) newErrors.dueDate = true;

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const correctedTeam = team.map((employee) => {
      if (typeof employee === 'object')
        return {
          id: uuidv4(),
          ...employee,
        };
      return {
        id: uuidv4(),
        name: employee,
        isSelected: false,
      };
    });

    if (project) {
      updateProject(project, {
        title: formData.title,
        description: formData.description,
        dueDate: new Date(formData.dueDate),
        startDate: new Date(formData.startDate),
        team: correctedTeam,
        tag: tags,
      });
    } else {
      addProject({
        title: formData.title,
        description: formData.description,
        dueDate: new Date(formData.dueDate),
        startDate: new Date(formData.startDate),
        team: correctedTeam,
        tag: tags,
        isCompleted: false,
        isSelected: false,
        taskCounter: 0,
        tasks: [],
      });
    }
  }

  const handleAddTeamMember = useCallback((newMember) => {
    setTeam((prevTeam) => [...prevTeam, newMember]);
  }, []);

  const handleAddTag = useCallback((newTag) => {
    setTags((prevTags) => [...prevTags, newTag]);
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="box-border w-full h-full flex flex-col pt-9 pb-10 pl-10 pr-44 bg-stone-50 overflow-y-scroll">
      <InputField
        label="Title"
        hasError={errors.title}
        defaultValue={formData.title}
        onChange={(e) => handleChange('title', e.target.value)}
      />
      <InputField
        label="Description"
        isTextArea
        hasError={errors.description}
        defaultValue={formData.description}
        onChange={(e) => handleChange('description', e.target.value)}
      />
      <InputField
        label="Start date"
        type="date"
        hasError={errors.startDate}
        defaultValue={formData.startDate}
        onChange={(e) => handleChange('startDate', e.target.value)}
      />
      <InputField
        label="Due date"
        type="date"
        hasError={errors.dueDate}
        defaultValue={formData.dueDate}
        onChange={(e) => handleChange('dueDate', e.target.value)}
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
        <button type="button" onClick={project ? cancelProject : cancelEditing}>
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="bg-stone-700 text-stone-50 rounded-md px-6 py-2"
        >
          Save
        </button>
      </div>
    </div>
  );
}
