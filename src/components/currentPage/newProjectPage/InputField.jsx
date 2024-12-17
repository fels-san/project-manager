export default function InputField({
  label,
  type = "text",
  ref,
  isTextArea = false,
  setList,
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
    <div>
      <label className={"uppercase font-bold text-stone-600 mb-2"}>
        {label}
      </label>
      {isTextArea ? (
        <textarea
          className="bg-stone-200 w-full h-20 px-2 mb-4 border-b-2 border-stone-300 focus:outline-none focus:border-b-2 focus:border-stone-900"
          type={type}
          ref={ref}
          required
        />
      ) : (
        <input
          className="bg-stone-200 w-full h-10 px-2 mb-4 border-b-2 border-stone-300 focus:outline-none focus:border-b-2 focus:border-stone-900"
          type={type}
          ref={ref}
          onKeyDown={handleAddItem}
          required
        />
      )}
    </div>
  );
}
