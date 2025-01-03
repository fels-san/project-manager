import { useState } from "react";

export default function InputField({
  label,
  type = "text",
  defaultValue = "",
  onAddItem,
  onChange,
  suggestionsList = [],
  isTextArea = false,
  isListInput = false,
  hasError,
}) {
  const [inputValue, setInputValue] = useState(defaultValue);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (onChange) {
      onChange(e);
    }

    if (isListInput && value) {
      const matches = suggestionsList.filter((item) =>
        item.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredSuggestions(matches);
    } else {
      setFilteredSuggestions([]);
    }
  };

  function handleAddItem(event) {
    if (event.key !== "Enter" || !isListInput) return;

    const value = inputValue.trim();

    if (value) {
      onAddItem(value);
      setInputValue("");
      setFilteredSuggestions([]);
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setFilteredSuggestions([]);
  };

  return (
    <div className="mt-4">
      <label className={"uppercase font-bold text-stone-600"}>{label}</label>
      {isTextArea ? (
        <textarea
          className={`${
            hasError ? "border-red-500 " : "border-stone-300 "
          }bg-stone-200 w-full h-20 px-2 mt-1 border-b-2 focus:outline-none focus:border-b-2 focus:border-stone-900`}
          type={type}
          defaultValue={defaultValue}
          onChange={handleInputChange}
          required
        />
      ) : (
        <input
          className={`${
            hasError ? "border-red-500 " : "border-stone-300 "
          }bg-stone-200 w-full h-10 px-2 mt-1 border-b-2 focus:outline-none focus:border-b-2 focus:border-stone-900`}
          type={type}
          value={inputValue}
          onKeyDown={handleAddItem}
          onChange={handleInputChange}
          required
        />
      )}
      {filteredSuggestions.length > 0 && (
        <div className="text-stone-500 italic text-sm mt-2">
          <p>Maybe you meant:</p>
          <ul>
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                className="font-semibold"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
      {hasError && (
        <p className="text-red-500 text-sm mt-1">{`${label} is required.`}</p>
      )}
    </div>
  );
}
