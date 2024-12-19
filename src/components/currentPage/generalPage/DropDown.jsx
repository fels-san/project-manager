import { useState } from "react";
import DropdownItem from "./DropDownItem";

export default function Dropdown({ sortType, isDescending, onSortChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      <button
        className="text-white w-48 bg-stone-700 hover:bg-stone-800 focus:outline-none font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center justify-around"
        type="button"
        onClick={toggleDropdown}
      >
        {sortType + " "}
        {isDescending ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="15"
            fill="currentColor"
            viewBox="0 0 14 15"
          >
            <path
              fillRule="evenodd"
              d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="15"
            fill="currentColor"
            viewBox="0 0 14 15"
          >
            <path
              fillRule="evenodd"
              d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"
            />
          </svg>
        )}
        <svg
          className={`ml-2 w-4 h-4 transform transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      {isOpen && (
        <div
          id="dropdownBgHover"
          className="absolute mt-1 z-10 w-44 bg-white rounded shadow"
        >
          <ul
            className="p-3 space-y-1 text-sm text-stone-700"
            aria-labelledby="dropdownBgHoverButton"
          >
            <DropdownItem onSelect={onSortChange} type="By Creation Date" />
            <DropdownItem
              onSelect={onSortChange}
              type="By Creation Date"
              isDescending={true}
            />
            <DropdownItem onSelect={onSortChange} type="By Project Status" />
            <DropdownItem
              onSelect={onSortChange}
              type="By Project Status"
              isDescending={true}
            />
          </ul>
        </div>
      )}
    </div>
  );
}
