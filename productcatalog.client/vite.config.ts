import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { env } from 'process';

// Backend (ASP.NET) HTTP url from launchSettings.json
const target = env.ASPNETCORE_URLS?.split(';')[0] || 'http://localhost:5051';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: parseInt(env.DEV_SERVER_PORT || '50161'),
    proxy: {
      '^/api': {
        target,
        changeOrigin: true,
        secure: false,
        rewrite: (p) => p,
      },
    },
  },
});
