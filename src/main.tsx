import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"

import { HTML5Backend } from "react-dnd-html5-backend"
import { DndProvider } from "react-dnd"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <App />
    </DndProvider>
  </React.StrictMode>
)
