import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './decoder-app';
import { DecoderApp } from './decoder-app';
import { TextPanel } from './text-panel';

describe('DecoderApp Integration', () => {
  let element: DecoderApp;

  beforeEach(() => {
    element = document.createElement('decoder-app') as DecoderApp;
    document.body.appendChild(element);
  });

  afterEach(() => {
    element.remove();
  });

  it('should successfully perform basic encoding of text', async () => {
    await element.updateComplete;
    const inputPanel = element.shadowRoot?.querySelector('text-panel[title="Input"]') as TextPanel;
    expect(inputPanel).toBeDefined();

    // Set input text
    inputPanel.value = 'hello';
    inputPanel.dispatchEvent(
      new CustomEvent('text-changed', {
        detail: { value: 'hello' },
        bubbles: true,
        composed: true,
      }),
    );

    await element.updateComplete;

    const outputPanel = element.shadowRoot?.querySelector(
      'text-panel[title="Output"]',
    ) as TextPanel;
    expect(outputPanel.value).toBe('aGVsbG8=');
  });
});
