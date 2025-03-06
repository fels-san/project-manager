import React from "react";

const ArrowIcon = React.memo(({ isOpen }: { isOpen: boolean }) => {
  return (
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
      />
    </svg>
  );
});

export default ArrowIcon;
