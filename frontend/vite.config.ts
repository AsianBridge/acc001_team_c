import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
  },
  build: {
    rollupOptions: {
      external: ["react-dom/client"],
    },
  },
  optimizeDeps: {
    include: ["@mui/material", "@mui/lab", "@aws-amplify/ui-react"],
  },
});
