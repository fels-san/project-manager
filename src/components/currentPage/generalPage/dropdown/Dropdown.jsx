import { useState } from "react";

import DropdownItem from "./DropdownItem";
import SortIcon from "./SortIcon";
import ArrowIcon from "./ArrowIcon";

export default function Dropdown({ options, selectedOption, onChange, style = null }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  function handleSelect(...options) {
    onChange(...options);
    setIsDropdownOpen(false);
  };


  return (
    <div className="relative">
      <button
        className={`${ style ? style : "text-white w-48 bg-stone-700 hover:bg-stone-800 focus:outline-none font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center justify-around"}`}
        type="button"
        onClick={toggleDropdown}
      >
        {selectedOption.title + " "}
        {selectedOption.isDescending !== null &&
        selectedOption.isDescending !== undefined ? (
          <SortIcon isDescending={selectedOption.isDescending} />
        ) : null}
        <ArrowIcon isOpen={isDropdownOpen} />
      </button>

      {isDropdownOpen && (
        <div className="absolute mt-1 z-10 w-48 bg-white rounded shadow">
          <ul
            className="p-3 space-y-1 text-sm text-stone-700"
            aria-labelledby="dropdownBgHoverButton"
          >
            {options.map((option, index) => {
              return (
                <DropdownItem
                  key={index}
                  onSelect={handleSelect}
                  type={option.type}
                  isDescending={option.isDescending}
                />
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
