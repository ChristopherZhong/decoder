/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  base: './',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  test: {
    globals: true,
    environment: 'happy-dom',
  },
});
