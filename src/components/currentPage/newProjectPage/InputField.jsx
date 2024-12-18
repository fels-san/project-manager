export default function InputField({
  label,
  type = "text",
  ref,
  defaultValue,
  isTextArea = false,
  setList,
  hasError,
}) {
  function handleAddItem(event) {
    if (event.key !== "Enter") return;

    const itemName = ref.current.value.trim();

    if (itemName) {
      setList((prevList) => [...prevList, itemName]);
      ref.current.value = "";
    }
  }

  return (
    <div className="mt-4">
      <label className={"uppercase font-bold text-stone-600"}>
        {label}
      </label>
      {isTextArea ? (
        <textarea
          className={`${
            hasError ? "border-red-500 " : "border-stone-300 "
          }bg-stone-200 w-full h-20 px-2 mt-1 border-b-2 focus:outline-none focus:border-b-2 focus:border-stone-900`}
          type={type}
          ref={ref}
          defaultValue={defaultValue}
          required
        />
      ) : (
        <input
          className={`${
            hasError ? "border-red-500 " : "border-stone-300 "
          }bg-stone-200 w-full h-10 px-2 mt-1 border-b-2 focus:outline-none focus:border-b-2 focus:border-stone-900`}
          type={type}
          ref={ref}
          defaultValue={defaultValue}
          onKeyDown={handleAddItem}
          required
        />
      )}
      {hasError && (
        <p className="text-red-500 text-sm mt-1">{`${label} is required.`}</p>
      )}
    </div>
  );
}
