export default function ListDisplay({ list, setList }) {
  function handleDeleteItem(item) {
    setList((prevList) => prevList.filter((i) => i !== item));
  }

  return (
    <div
      className="grid gap-3 mb-2"
      style={{ gridTemplateColumns: "repeat(auto-fill, 165px)" }}
    >
      {list.map((item, index) => (
        <div
          key={index}
          onClick={() => handleDeleteItem(item)}
          className="flex flex-col justify-center text-stone-700 text-base font-semibold min-h-12 border-stone-900 border-2 rounded-md px-4 py-2 text-center cursor-pointer transform transition-transform duration-75 hover:scale-105"
        >
          {item}
        </div>
      ))}
    </div>
  );
}
