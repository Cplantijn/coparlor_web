type Props = {
  label: string;
  onClick: () => void;
};

export default function Action({ label, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="min-h-10 rounded bg-amber-400 cursor-pointer px-4 py-2 text-sm font-semibold text-stone-950 shadow hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
    >
      {label}
    </button>
  );
}
