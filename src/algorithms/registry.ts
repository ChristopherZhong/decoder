import { Algorithm } from './types/algorithm.interface';
import { base64Algorithm } from './base-64.algorithm';
import { rot13Algorithm } from './rot-13.algorithm';
import { urlPercentEncodingAlgorithm } from './url-percent-encoding.algorithm';
import { hexadecimalAlgorithm } from './hexadecimal.algorithm';

export const algorithms: Record<string, Algorithm> = {
  base64: base64Algorithm,
  url: urlPercentEncodingAlgorithm,
  hex: hexadecimalAlgorithm,
  rot13: rot13Algorithm,
};
