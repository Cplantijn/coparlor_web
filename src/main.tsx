import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "@tanstack/react-router"
import { Provider } from "react-redux"
import { store } from "@store"
import { initAuthAction } from "@store/auth"
import { router } from "./router"
import "./styles.css"

// Initialize authentication
store.dispatch(initAuthAction());

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
