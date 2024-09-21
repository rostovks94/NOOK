import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './',  // Корень проекта
  build: {
    outDir: 'dist',  // Папка для сборки
    assetsDir: 'assets',  // Папка для статических файлов
    rollupOptions: {
      input: './index.html',  // Указываем путь к вашему index.html
    },
  },
});