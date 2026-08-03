import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: "react-vendor",
              test: /node_modules[\\/](react|react-dom|react-router|react-router-dom)([\\/]|$)/,
            },
            {
              name: "query-vendor",
              test: /node_modules[\\/]@tanstack[\\/]/,
            },
            {
              name: "supabase-vendor",
              test: /node_modules[\\/]@supabase[\\/]/,
            },
            {
              name: "lucide-vendor",
              test: /node_modules[\\/]lucide-react([\\/]|$)/,
            },
          ],
        },
      },
    },
  },
})
