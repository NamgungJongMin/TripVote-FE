import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: [
      { find: "@", replacement: "/src" },
      { find: "@components", replacement: "src/components" },
      { find: "@assets", replacement: "src/assets" },
      { find: "@hooks", replacement: "src/hooks" },
      { find: "@pages", replacement: "src/pages" },
      { find: "@routes", replacement: "src/routes" },
      { find: "@types", replacement: "src/types" },
      { find: "@utils", replacement: "src/utils" },
      { find: "@sass", replacement: "src/sass" },
    ],
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
});
