import { Algorithm } from './algorithm.interface';

export function isAlgorithm(value: unknown): value is Algorithm {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  const obj = value as Record<string, unknown>;
  return (
    'id' in obj &&
    typeof obj.id === 'string' &&
    'name' in obj &&
    typeof obj.name === 'string' &&
    'encode' in obj &&
    typeof obj.encode === 'function' &&
    'decode' in obj &&
    typeof obj.decode === 'function'
  );
}
