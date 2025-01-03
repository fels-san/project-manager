import Delete from "../../../assets/x.svg";

export default function ListDisplay({ list, setList }) {
  function handleDeleteItem(item) {
    setList((prevList) => prevList.filter((i) => i !== item));
  }

  return (
    <div className="flex flex-row gap-3">
      {list.map((item, index) => (
        <div
          key={index}
          onClick={() => handleDeleteItem(item)}
          className="flex flex-row justify-between gap-2 text-stone-700 text-base font-semibold h-min border-stone-900 border-2 rounded-full px-4 py-0 mt-2 text-center items-center cursor-pointer transform transition-transform duration-75 hover:scale-105"
        >
          {item.name ? item.name : item}
          <img className="w-5 h-min" src={Delete} alt="delete" />
        </div>
      ))}
    </div>
  );
}
