import NoProjects from "../assets/no-projects.png";

export default function EmptyPage({ onCreateProject }) {
  return (
    <div className="w-4/5 flex flex-col items-center py-36">
      <img src={NoProjects} alt="Notebook" className="w-20 h-20" />
      <h2 className="text-stone-500 text-xl font-bold my-4">
        No Project Selected
      </h2>
      <p className="text-stone-500">
        Select a project or get started with a new one
      </p>
      <button onClick={onCreateProject} className="bg-stone-700 text-stone-400 rounded-md px-4 py-2 my-7">
        Create new project
      </button>
    </div>
  );
}
