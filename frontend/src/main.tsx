import { createRoot } from "react-dom/client";
import App from "./App.tsx";
// import "./index.css";
import MiniKitProvider from "./minikit-provider.tsx";
import { StrictMode } from "react";
import { ErudaProvider } from "./components/Eruda";

createRoot(document.getElementById("verification")!).render(
  <StrictMode>
    <ErudaProvider>
      <MiniKitProvider>
        <App />
      </MiniKitProvider>
    </ErudaProvider>
  </StrictMode>
);
