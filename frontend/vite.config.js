// /frontend/vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: ".", // frontendフォルダ内をルートにする
  resolve: {
    alias: {
      "@": "/src", // オプション（便利な別名）
    },
  },
});
