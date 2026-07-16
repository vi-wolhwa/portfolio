import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  // GitHub Pages 프로젝트 페이지(vi-wolhwa.github.io/portfolio/)에 배포하기 위한 서브패스.
  // `npm run dev` 는 영향받지 않고 항상 '/' 를 쓴다 — build 시에만 적용.
  base: command === 'build' ? '/portfolio/' : '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: { api: 'modern-compiler' },
    },
  },
}));
