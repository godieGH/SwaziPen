import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react()
  ],
  server: {
    proxy: {
      'api': 'http://localhost:5000/',
    },
  },
  resolve: {
    alias: {
      '@scss': path.resolve(__dirname, './src/scss'),
      '@components': path.resolve(__dirname, './src/components'),
      '@ace_customs': path.resolve(__dirname, './src/ace-customs'),
    },
  },
  optimizeDeps: { include: ['ace-builds'] }
});