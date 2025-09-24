import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
   plugins: [react()],
   server: {
      proxy: {
         "/api": "http://localhost:5000/",
         "/socket.io": "http://localhost:5000/"
      }
   },
   resolve: {
      alias: {
         "@scss": path.resolve(__dirname, "./src/scss"),
         "@components": path.resolve(__dirname, "./src/components"),
         "@ace_customs": path.resolve(__dirname, "./src/ace_customs"),
         "@stores": path.resolve(__dirname, "./src/stores"),
         "@api": path.resolve(__dirname, "./src/api")
      }
   },
   optimizeDeps: { include: ["ace-builds"] },
   build: {
      chunkSizeWarningLimit: 10000,
      rollupOptions: {
         output: {
            manualChunks: {
               react: ["react", "react-dom"],
               ui: ["lucide-react", "react-icons"],
               "editor-build": ["ace-builds"],
               "editor-ace-core": ["react-ace"],
               explorer: ["react-file-icon"],
               data: ["axios", "socket.io-client"],
               caching: [
                  "@tanstack/react-query",
                  "@tanstack/react-query-devtools"
               ],
               utils: ["clsx", "lodash.debounce", "prop-types", "zustand"]
            }
         }
      },
      outDir: "../server/public",
      emptyOutDir: true,
   }
});
