import SortIcon from "./icons/SortIcon";

type DropDownItemProps = {
  onSelect: () => void;
  type: string;
  isDescending?: boolean | null;
};

export default function DropdownItem({
  onSelect,
  type,
  isDescending = null,
}: DropDownItemProps) {
  return (
    <li>
      <button
        type="button"
        className="inline-flex items-baseline w-full gap-1 py-2 pl-1 hover:bg-stone-100"
        onClick={onSelect}
      >
        {type}
        {isDescending !== null ? (
          <SortIcon isDescending={isDescending} />
        ) : null}
      </button>
    </li>
  );
}
