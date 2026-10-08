import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5180, // Cambia el puerto a 5180 para el frontend de docentes
  },
});
