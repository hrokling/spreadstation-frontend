import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  envDir: '.', // Look for .env files in the root directory
  envPrefix: 'VITE_', // Only expose variables that start with VITE_
  server: {
    port: 5173,
    strictPort: true, // Fail if port is busy instead of trying another
    host: true, // Allow external connections
  },
});
