import { useState } from "react";

import DropdownItem from "./DropdownItem";
import SortIcon from "./icons/SortIcon";
import ArrowIcon from "./icons/ArrowIcon";

type DropDownProps = {
  options: { type: string; isDescending?: boolean }[];
  selectedOption: { type: string; isDescending?: boolean };
  onChange: (type: string, descending?: boolean) => void;
  style?: string;
};

export default function Dropdown({
  options,
  selectedOption,
  onChange,
  style = "",
}: DropDownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  function handleSelect(type: string, isDescending?: boolean) {
    onChange(type, isDescending);

    toggleDropdown();
  }

  const buttonStyle =
    style === ""
      ? "text-white w-48 bg-stone-700 hover:bg-stone-800 focus:outline-none font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center justify-around"
      : style;

  return (
    <div className="relative">
      <button className={buttonStyle} type="button" onClick={toggleDropdown}>
        {`${selectedOption.type} `}
        {selectedOption.isDescending != null && (
          <SortIcon isDescending={selectedOption.isDescending} />
        )}
        <ArrowIcon isOpen={isDropdownOpen} />
      </button>

      {isDropdownOpen && (
        <div className="absolute mt-1 z-10 w-48 bg-white rounded shadow">
          <ul
            className="p-3 space-y-1 text-sm text-stone-700"
            aria-labelledby="dropdownBgHoverButton"
          >
            {options.map((option: { type: string; isDescending?: boolean }) => (
              <DropdownItem
                key={option.type + option.isDescending}
                onSelect={() => handleSelect(option.type, option.isDescending)}
                type={option.type}
                isDescending={option.isDescending}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
