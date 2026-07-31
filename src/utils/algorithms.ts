export interface Algorithm {
  id: string;
  name: string;
  encode: (input: string) => string;
  decode: (input: string) => string;
}

export const base64Algo: Algorithm = {
  id: 'base64',
  name: 'Base64',
  encode: (input: string): string => {
    if (!input) return '';
    const bytes = new TextEncoder().encode(input);
    let binString = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binString += String.fromCharCode(bytes[i]);
    }
    return btoa(binString);
  },
  decode: (input: string): string => {
    if (!input) return '';
    const cleaned = input.trim().replace(/\s+/g, '');
    try {
      const binString = atob(cleaned);
      const bytes = new Uint8Array(binString.length);
      for (let i = 0; i < binString.length; i++) {
        bytes[i] = binString.charCodeAt(i);
      }
      return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
    } catch {
      throw new Error('Invalid Base64 input or invalid UTF-8 sequence.');
    }
  },
};

export const urlAlgo: Algorithm = {
  id: 'url',
  name: 'URL Percent Encoding',
  encode: (input: string): string => {
    if (!input) return '';
    return encodeURIComponent(input);
  },
  decode: (input: string): string => {
    if (!input) return '';
    try {
      return decodeURIComponent(input);
    } catch {
      throw new Error('Malformed URL percent-encoded input.');
    }
  },
};

export const hexAlgo: Algorithm = {
  id: 'hex',
  name: 'Hexadecimal',
  encode: (input: string): string => {
    if (!input) return '';
    const bytes = new TextEncoder().encode(input);
    return Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  },
  decode: (input: string): string => {
    if (!input) return '';
    // Clean spaces, colons, and prefix "0x" or "\x"
    const cleaned = input.replace(/\s+|:|0x|\\x/gi, '');
    if (cleaned.length % 2 !== 0) {
      throw new Error('Hexadecimal string must have an even length.');
    }
    if (!/^[0-9a-fA-F]*$/.test(cleaned)) {
      throw new Error('Hexadecimal string contains invalid characters.');
    }
    const bytes = new Uint8Array(cleaned.length / 2);
    for (let i = 0; i < cleaned.length; i += 2) {
      bytes[i / 2] = parseInt(cleaned.substring(i, i + 2), 16);
    }
    try {
      return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
    } catch {
      throw new Error('Decoded bytes do not form a valid UTF-8 string.');
    }
  },
};

export const rot13Algo: Algorithm = {
  id: 'rot13',
  name: 'ROT13',
  encode: (input: string): string => {
    if (!input) return '';
    return input.replace(/[a-zA-Z]/g, (char) => {
      const code = char.charCodeAt(0);
      const start = code >= 97 ? 97 : 65;
      return String.fromCharCode(((code - start + 13) % 26) + start);
    });
  },
  decode: (input: string): string => {
    if (!input) return '';
    // ROT13 is symmetric
    return rot13Algo.encode(input);
  },
};

export const algorithms: Record<string, Algorithm> = {
  base64: base64Algo,
  url: urlAlgo,
  hex: hexAlgo,
  rot13: rot13Algo,
};
