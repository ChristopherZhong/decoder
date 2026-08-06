import { describe, it, expect } from 'vitest';
import { base64Algo, urlAlgo, hexAlgo, rot13Algo } from './algorithms';

describe('Base64 Algorithm', () => {
  it('should encode and decode standard text', () => {
    const input = 'Hello, World!';
    const encoded = base64Algo.encode(input);
    expect(encoded).toBe('SGVsbG8sIFdvcmxkIQ==');
    expect(base64Algo.decode(encoded)).toBe(input);
  });

  it('should handle Unicode and Emojis', () => {
    const input = 'こんにちは 🌎 🔥';
    const encoded = base64Algo.encode(input);
    expect(base64Algo.decode(encoded)).toBe(input);
  });

  it('should return empty string for empty input', () => {
    expect(base64Algo.encode('')).toBe('');
    expect(base64Algo.decode('')).toBe('');
  });

  it('should throw error for invalid Base64 input', () => {
    expect(() => base64Algo.decode('This is not base64!!!')).toThrow('Invalid Base64 input');
  });
});

describe('URL Percent Algorithm', () => {
  it('should encode and decode standard and special characters', () => {
    const input = 'Hello World! @#&?';
    const encoded = urlAlgo.encode(input);
    expect(encoded).toBe('Hello%20World!%20%40%23%26%3F');
    expect(urlAlgo.decode(encoded)).toBe(input);
  });

  it('should return empty string for empty input', () => {
    expect(urlAlgo.encode('')).toBe('');
    expect(urlAlgo.decode('')).toBe('');
  });

  it('should throw error for malformed URL input', () => {
    expect(() => urlAlgo.decode('%E0%A4%A')).toThrow('Malformed URL percent-encoded input');
  });
});

describe('Hexadecimal Algorithm', () => {
  it('should encode and decode standard text', () => {
    const input = 'ABC';
    const encoded = hexAlgo.encode(input);
    expect(encoded).toBe('414243');
    expect(hexAlgo.decode(encoded)).toBe(input);
  });

  it('should handle cleanups like spaces, colons, and prefixes', () => {
    const input = 'Hello';
    const encoded = hexAlgo.encode(input); // 48656c6c6f
    expect(encoded).toBe('48656c6c6f');
    expect(hexAlgo.decode('48 65 6c 6c 6f')).toBe(input);
    expect(hexAlgo.decode('48:65:6c:6c:6f')).toBe(input);
    expect(hexAlgo.decode('0x480x650x6c0x6c0x6f')).toBe(input);
    expect(hexAlgo.decode('\\x48\\x65\\x6c\\x6c\\x6f')).toBe(input);
  });

  it('should return empty string for empty input', () => {
    expect(hexAlgo.encode('')).toBe('');
    expect(hexAlgo.decode('')).toBe('');
  });

  it('should throw error for odd length hex string', () => {
    expect(() => hexAlgo.decode('414')).toThrow('Hexadecimal string must have an even length.');
  });

  it('should throw error for invalid characters', () => {
    expect(() => hexAlgo.decode('414G')).toThrow('Hexadecimal string contains invalid characters.');
  });

  it('should throw error for invalid UTF-8 bytes', () => {
    // FF is an invalid UTF-8 single byte
    expect(() => hexAlgo.decode('FF')).toThrow('Decoded bytes do not form a valid UTF-8 string.');
  });
});

describe('ROT13 Algorithm', () => {
  it('should encode and decode correctly', () => {
    const input = 'Hello, World! 123';
    const encoded = rot13Algo.encode(input);
    expect(encoded).toBe('Uryyb, Jbeyq! 123');
    expect(rot13Algo.decode(encoded)).toBe(input);
  });

  it('should return empty string for empty input', () => {
    expect(rot13Algo.encode('')).toBe('');
    expect(rot13Algo.decode('')).toBe('');
  });
});
