import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/Memo/",
  plugins: [react()],
  optimizeDeps: { include: ["react/jsx-runtime"] },
  server: {
    historyApiFallback: true,
  },
});