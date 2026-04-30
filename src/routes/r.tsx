import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/r")({
  component: RoomLayout,
});

function RoomLayout() {
  return (
    <div className="min-h-screen min-w-screen bg-white relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-bold -rotate-25 z-0 text-gray-100">
        coparlor
      </div>
      <div className="z-10 relative">
        <Outlet />
      </div>
    </div>
  );
}
