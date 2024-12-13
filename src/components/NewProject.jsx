import { useRef, useState } from "react";

export default function NewProject({ onCancelProject, onAddProject }) {
  const label = "uppercase font-bold text-stone-600 mb-2";

  const title = useRef();
  const description = useRef();
  const date = useRef();

  function handleSave() {
    const valid =
      title.current.value && description.current.value && date.current.value;
    if (!valid) return;

    onAddProject({
      title: title.current.value,
      description: description.current.value,
      date: new Date(date.current.value),
      status: "unselected",
      tasks: [],
    });
  }

  return (
    <div className="w-4/5 flex flex-col pt-32 pl-10 pr-44">
      <div className="flex flex-row justify-end gap-3 mb-2">
        <button onClick={onCancelProject}>Cancel</button>
        <button
          onClick={handleSave}
          className="bg-stone-700 text-stone-50 rounded-md px-6 py-2"
        >
          Save
        </button>
      </div>
      <label className={label}>Title</label>
      <input
        className="bg-stone-200 w-full h-10 px-2 mb-4 border-b-2 border-stone-300 focus:outline-none focus:border-b-2 focus:border-stone-900"
        type="text"
        ref={title}
        required
      />
      <label className={label}>Description</label>
      <textarea
        className="bg-stone-200 w-full h-20 px-2 mb-4 border-b-2 border-stone-300 focus:outline-none focus:border-b-2 focus:border-stone-900"
        type="text"
        ref={description}
        required
      />
      <label className={label}>Due date</label>
      <input
        className="bg-stone-200 w-full h-10 px-2 mb-4 border-b-2 border-stone-300 focus:outline-none focus:border-b-2 focus:border-stone-900"
        type="date"
        ref={date}
        required
      />
    </div>
  );
}
