export default function DropdownItem({ onSelect, type, isDescending = false }) {
  return (
    <li>
      <button
        className="inline-flex items-baseline w-full gap-1 py-2 pl-1 hover:bg-stone-100"
        onClick={() => onSelect(type, isDescending)}
      >
        {type}
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
      </button>
    </li>
  );
}
