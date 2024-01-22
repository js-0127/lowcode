import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { join } from "node:path";
import { visualizer } from "rollup-plugin-visualizer";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
    }),
  ],
  resolve: {
    alias: {
      "@": join(__dirname, "src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          library: ["antd"],
        },
      },
    },
    minify: "esbuild",
    target: "esnext",
  },
});
