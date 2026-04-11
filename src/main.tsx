import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import { Provider } from "react-redux"
import { store } from "./store"
import { routeTree } from "./routeTree.gen"
import "./styles.css"

const router = createRouter({ routeTree })

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
