import { createRootRoute, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import { MessageBanner } from "@components/MessageBanner"

export const Route = createRootRoute({
  component: () => (
    <>
      <MessageBanner />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})
