import React from 'react';
import SortIcon from './SortIcon';

export default function DropdownItem({ onSelect, type, isDescending = null }) {
  return (
    <li>
      <button
        type="button"
        className="inline-flex items-baseline w-full gap-1 py-2 pl-1 hover:bg-stone-100"
        onClick={onSelect}
      >
        {type}
        {isDescending !== null ? (
          <SortIcon isDescending={isDescending} />
        ) : null}
      </button>
    </li>
  );
}
