export default function Sidebar({
  onCreateProject,
  onSelectProject,
  projects,
}) {
  return (
    <div className="w-1/5 h-full bg-stone-900 px-6 py-12 rounded-tr-lg">
      <h2 className="text-stone-50 uppercase text-xl font-bold">
        Your projects
      </h2>
      <button
        onClick={onCreateProject}
        className="bg-stone-700 text-stone-400 rounded-md px-4 py-2 my-7"
      >
        + Add Project
      </button>
      {projects.map((project) => {
        return (
          <button
            onClick={() => onSelectProject(project.id)}
            key={project.id}
            className={`${
              project.status === "selected"
                ? "bg-stone-800 text-stone-300"
                : "text-stone-400"
            } text-left w-full mb-3 p-2`}
          >
            {project.title}
          </button>
        );
      })}
    </div>
  );
}
