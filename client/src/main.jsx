import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"
import App from "./App.jsx";

(async () => {
   if (
      import.meta.env.DEV &&
      /Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent)
   ) {
      const eruda = await import("eruda");
      eruda.init();
   }
})();

createRoot(document.getElementById("root")).render(
   <StrictMode>
      <App />
   </StrictMode>
);
