import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: 'https://Holcimger.github.io/DaisyUI/', // Reemplaza 'DaisyUI' con el nombre de tu repositorio
});
