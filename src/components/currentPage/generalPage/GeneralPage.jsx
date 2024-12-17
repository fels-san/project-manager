import ProjectsList from "./ProjectsList";
import EmployeesList from "./EmployeesList";
import TagsList from "./TagsList";

export default function GeneralPage() {

  return (
    <div className="box-border h-full w-full bg-stone-50 flex flex-col items-start justify-start pl-10 py-10 pr-44 overflow-y-auto">
      <ProjectsList />
      <hr className="mt-10 w-full border-2 text-stone-400 bg-stone-400 h-0.5" />
      <EmployeesList />
      <hr className="mt-10 w-full border-2 text-stone-400 bg-stone-400 h-0.5" />
      <TagsList />
    </div>
  );
}
