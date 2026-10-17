import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  assetsInclude: ['**/*.glsl'],
  build: {
    target: 'es2020',
  },
  server: {
    port: 5173,
  },
});
