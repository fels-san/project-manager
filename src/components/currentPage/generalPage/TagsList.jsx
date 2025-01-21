import { React, useContext } from 'react';

import { ProjectManagementContext } from '../../../store/project-management-context';

export default function TagsList({ selectedTags, onTagSelection }) {
  const { projects, tags } = useContext(ProjectManagementContext);

  return (
    <div className="pb-3">
      <h2 className="text-stone-800 text-2xl font-bold my-4">
        Tags <span className="opacity-55">{tags.length}</span>
      </h2>
      <div className="flex flex-wrap gap-x-2 gap-y-2">
        {tags.map((tag) => (
          <div key={tag.name}>
            <button
              type="button"
              onClick={() => onTagSelection(tag.name)}
              className={`${
                selectedTags.includes(tag.name)
                  ? 'border-2 bg-stone-600 text-stone-100 px-2'
                  : 'border-0 text-stone-700 '
              } whitespace-pre-wrap break-normal text-base font-medium border-stone-900 rounded-md px-0 py-0 cursor-pointer transform transition-transform duration-75 hover:scale-105`}
            >
              {`${tag.name} `}
              <span className="opacity-55">
                {
                  projects.filter((project) => project.tag.includes(tag.name))
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
