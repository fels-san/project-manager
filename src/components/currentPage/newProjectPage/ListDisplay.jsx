import Delete from "../../../assets/x.svg";

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
          className="flex flex-row justify-evenly text-stone-700 text-base font-semibold h-min border-stone-900 border-2 rounded-full px-0 py-0 text-center cursor-pointer transform transition-transform duration-75 hover:scale-105"
        >
          {item}
          <img className="w-5" src={Delete} alt="delete" />
        </div>
      ))}
    </div>
  );
}
