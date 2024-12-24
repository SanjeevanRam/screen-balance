import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const isDevelopment = mode === 'development';
  return {
    plugins: [react()],
    server: {
      proxy: isDevelopment
        ? {
            '/api': 'http://localhost:5000', // Proxy API requests in development
          }
        : undefined,
    },
  };
});
