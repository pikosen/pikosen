import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  build: {
    outDir: "dist",
  },
  server: { historyApiFallback: true },
  base: process.env.VITE_BASE_PATH || "/pikosen/",
}))
