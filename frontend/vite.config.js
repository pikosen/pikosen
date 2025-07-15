import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  build: {
    outDir: "dist",
  },
  server: { historyApiFallback: true },
  // Conditionally set base path:
  // For development (npm run dev), use '/'
  // For production builds, use process.env.VITE_BASE_PATH or '/pikosen/'
  base: mode === "development" ? "/" : process.env.VITE_BASE_PATH || "/pikosen/",
}))
