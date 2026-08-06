/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    emptyOutDir: true,
    outDir: '../dist',
  },
  root: 'src',
  test: {
    environment: 'happy-dom',
    globals: true,
  },
});
