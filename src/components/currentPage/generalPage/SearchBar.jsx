import React from "react";

export default function SearchBar({ onSearchChange }) {
  return (
    <form>
      <div className="relative mb-4 w-96">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            className="text-stone-500 font-bold"
            viewBox="0 0 18 18"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </div>
        <input
          type="search"
          autoComplete="off"
          inputMode="search"
          className="block w-full px-4 py-2 pl-11 text-base text-stone-900 border-2 border-stone-300 rounded-lg focus:outline-none"
          placeholder="What do you want to find?"
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>
    </form>
  );
}
