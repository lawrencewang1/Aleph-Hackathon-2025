import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": process.env,
  },
  server: {
    allowedHosts: [
      'd5cf-136-152-214-133.ngrok-free.app'
    ]
  }
});
