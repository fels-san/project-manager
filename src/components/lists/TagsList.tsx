import { useAppSelector } from "../../hooks";

type TagsListProps = {
  selectedTags: string[];
  onTagSelection: (tag: string) => void;
}

export default function TagsList({ selectedTags, onTagSelection }: TagsListProps) {
  const projects = useAppSelector((state) => state.projects.projects);

  const tags = Array.from(
    new Set(projects.flatMap((project) => project.tag))
  );

  return (
    <div className="pb-3">
      <h2 className="text-stone-800 text-2xl font-bold my-4">
        Tags <span className="opacity-55">{tags.length}</span>
      </h2>
      <div className="flex flex-wrap gap-x-2 gap-y-2">
        {tags.map((tag) => ( 
          <div key={tag}>
            <button
              type="button"
              onClick={() => onTagSelection(tag)}
              className={`${
                selectedTags.includes(tag)
                  ? "border-2 bg-stone-600 text-stone-100 px-2"
                  : "border-0 text-stone-700 "
              } whitespace-pre-wrap break-normal text-base font-medium border-stone-900 rounded-md px-0 py-0 cursor-pointer transform transition-transform duration-75 hover:scale-105`}
            >
              {`${tag} `}
              <span className="opacity-55">
                {
                  projects.filter((project) => project.tag.includes(tag))
                    .length
                }
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
