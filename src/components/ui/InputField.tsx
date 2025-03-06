import { useState } from "react";

type InputFieldProps = {
  label: string;
  type?: string;
  defaultValue?: string;
  onAddItem?: (value: string) => void;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  suggestionsList?: string[];
  isTextArea?: boolean;
  isListInput?: boolean;
  hasError?: boolean;
};

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
}: InputFieldProps) {
  const [inputValue, setInputValue] = useState<string>(defaultValue);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { value } = event.target;
    setInputValue(value);

    if (onChange) {
      onChange(event);
    }

    if (isListInput && value) {
      const matches = suggestionsList.filter((item) =>
        item.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredSuggestions(matches);
    } else {
      setFilteredSuggestions([]);
    }
  }

  function handleAddItem(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter" || !isListInput) return;
    if (!onAddItem) return;
    event.preventDefault();

    const value = inputValue.trim();

    if (value) {
      onAddItem(value);
      setInputValue("");
      setFilteredSuggestions([]);
    }
  }

  function handleSuggestionClick(suggestion: string) {
    setInputValue(suggestion);
    setFilteredSuggestions([]);
  }

  return (
    <div className="mt-4">
      <label
        htmlFor={isTextArea ? "textarea-id" : "input-id"}
        className="uppercase font-bold text-stone-600"
      >
        {label}
      </label>
      {isTextArea ? (
        <textarea
          id="textarea-id"
          className={`${
            hasError ? "border-red-500 " : "border-stone-300 "
          }bg-stone-200 w-full h-20 px-2 mt-1 border-b-2 focus:outline-none focus:border-b-2 focus:border-stone-900`}
          defaultValue={defaultValue}
          onChange={handleInputChange}
          required
        />
      ) : (
        <input
          id="input-id"
          className={`${
            hasError ? "border-red-500 " : "border-stone-300 "
          }bg-stone-200 w-full h-10 px-2 mt-1 border-b-2 focus:outline-none focus:border-b-2 focus:border-stone-900`}
          type={type}
          value={inputValue}
          onKeyDown={handleAddItem}
          onChange={handleInputChange}
        />
      )}
      {filteredSuggestions.length > 0 && (
        <div className="text-stone-500 italic text-sm mt-2">
          <p>Maybe you meant:</p>
          <ul>
            {filteredSuggestions.map((suggestion) => (
              <li key={suggestion} className="font-semibold">
                <button
                  type="button"
                  tabIndex={0}
                  onClick={() => handleSuggestionClick(suggestion)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleSuggestionClick(suggestion);
                    }
                  }}
                >
                  {suggestion}
                </button>
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
