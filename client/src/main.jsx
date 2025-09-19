import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import "./index.css";
import "./ace_setup";
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

const queryClient = new QueryClient()

createRoot(document.getElementById("root")).render(
   <StrictMode>
      <QueryClientProvider client={queryClient}>
         <App />
         {/*<ReactQueryDevtools initialIsOpen={false} />*/}
      </QueryClientProvider>
   </StrictMode>
);
