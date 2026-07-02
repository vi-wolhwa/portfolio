import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' 로 두면 빌드 결과물(dist/index.html)을 어떤 경로에서 열어도 자원이 로드됩니다.
export default defineConfig({
  plugins: [react()],
  base: './',
});
