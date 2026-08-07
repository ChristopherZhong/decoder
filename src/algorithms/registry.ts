/// <reference types="vite/client" />
import { Algorithm } from './types/algorithm.interface';

// Eagerly glob-import all files ending in `.algorithm.ts`
const modules = import.meta.glob<{ [key: string]: unknown }>('./*.algorithm.ts', { eager: true });

export const algorithms: Record<string, Algorithm> = {};

for (const path in modules) {
  const module = modules[path];
  for (const key in module) {
    const value = module[key];
    if (
      value &&
      typeof value === 'object' &&
      'id' in value &&
      'name' in value &&
      'encode' in value &&
      'decode' in value
    ) {
      const algo = value as Algorithm;
      algorithms[algo.id] = algo;
    }
  }
}
