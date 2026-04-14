import { createFileRoute, Outlet } from "@tanstack/react-router";
import { isAuthenticated } from "../auth";

export const Route = createFileRoute("/_unauthenticated")({
  beforeLoad: () => {
    if (isAuthenticated()) {
      // Future: throw redirect({ to: "/app" })
    }
  },
  component: UnauthenticatedLayout,
});

function UnauthenticatedLayout() {
  return (
    <>
      <header className="absolute top-0 right-0 p-4 px-8">
        <a href="#" className="text-white font-medium hover:underline">
          Sign in
        </a>
      </header>
      <Outlet />
    </>
  );
}
