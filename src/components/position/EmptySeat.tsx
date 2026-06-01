export function EmptySeat(props: {
  seatNumber: number;
  canJoin: boolean;
  canAddBot: boolean;
  onJoin: () => void;
  onAddBot: () => void;
}) {
  return (
    <div className="relative p-2 border rounded-sm w-48 flex flex-col items-center border-gray-200 hover:bg-gray-100 gap-1">
      <span className="text-4xl flex items-center gap-1">
        <span className="text-gray-300 text-sm">Seat</span> {props.seatNumber}
      </span>
      <button
        className="p-1 rounded-sm bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 disabled:text-gray-600 text-white text-xs font-bold cursor-pointer disabled:cursor-not-allowed"
        disabled={!props.canJoin}
        onClick={props.onJoin}
      >
        Join
      </button>
      {props.canAddBot && (
        <button
          className="p-1 rounded-sm bg-green-500 hover:bg-green-700 text-white text-xs font-bold cursor-pointer"
          onClick={props.onAddBot}
        >
          Add Bot
        </button>
      )}
    </div>
  );
}
