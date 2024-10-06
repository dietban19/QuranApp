import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { FontProvider } from "./context/FontContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <FontProvider>
        <App />
      </FontProvider>
    </BrowserRouter>
  </StrictMode>
);
