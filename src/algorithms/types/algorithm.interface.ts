export interface Algorithm {
  id: string;
  name: string;
  encode: (input: string) => string;
  decode: (input: string) => string;
}

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
