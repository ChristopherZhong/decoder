import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './decoder-app';
import { DecoderApp } from './decoder-app';
import { TextPanel } from './text-panel';

describe('DecoderApp Integration', () => {
  let element: DecoderApp;

  beforeEach(() => {
    localStorage.clear();
    const newUrl = `${window.location.pathname}`;
    window.history.replaceState(null, '', newUrl);
  });

  afterEach(() => {
    if (element) {
      element.remove();
    }
    localStorage.clear();
    const newUrl = `${window.location.pathname}`;
    window.history.replaceState(null, '', newUrl);
  });

  it('should successfully perform basic encoding of text', async () => {
    element = document.createElement('decoder-app') as DecoderApp;
    document.body.appendChild(element);

    await element.updateComplete;
    const inputPanel = element.shadowRoot?.querySelector('text-panel[title="Input"]') as TextPanel;
    expect(inputPanel).toBeDefined();

    // Set input text
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

  it('should restore state from localStorage on load', async () => {
    localStorage.setItem('devencoder_input', 'stored text');
    localStorage.setItem('devencoder_algo', 'rot13');
    localStorage.setItem('devencoder_mode', 'decode');

    element = document.createElement('decoder-app') as DecoderApp;
    document.body.appendChild(element);

    await element.updateComplete;

    const inputPanel = element.shadowRoot?.querySelector('text-panel[title="Input"]') as TextPanel;
    expect(inputPanel.value).toBe('stored text');

    const algoSelector = element.shadowRoot?.querySelector('algorithm-selector') as HTMLElement & {
      selectedAlgorithm: string;
      mode: string;
    };
    expect(algoSelector.selectedAlgorithm).toBe('rot13');
    expect(algoSelector.mode).toBe('decode');
  });

  it('should restore state from URL search params on load with higher precedence than localStorage', async () => {
    localStorage.setItem('devencoder_input', 'stored text');
    localStorage.setItem('devencoder_algo', 'rot13');
    localStorage.setItem('devencoder_mode', 'decode');

    const newUrl = `${window.location.pathname}?input=url+text&algo=hex&mode=encode`;
    window.history.replaceState(null, '', newUrl);

    element = document.createElement('decoder-app') as DecoderApp;
    document.body.appendChild(element);

    await element.updateComplete;

    const inputPanel = element.shadowRoot?.querySelector('text-panel[title="Input"]') as TextPanel;
    expect(inputPanel.value).toBe('url text');

    const algoSelector = element.shadowRoot?.querySelector('algorithm-selector') as HTMLElement & {
      selectedAlgorithm: string;
      mode: string;
    };
    expect(algoSelector.selectedAlgorithm).toBe('hex');
    expect(algoSelector.mode).toBe('encode');
  });

  it('should update localStorage and URL search params when state changes', async () => {
    element = document.createElement('decoder-app') as DecoderApp;
    document.body.appendChild(element);

    await element.updateComplete;

    const inputPanel = element.shadowRoot?.querySelector('text-panel[title="Input"]') as TextPanel;
    inputPanel.dispatchEvent(
      new CustomEvent('text-changed', {
        detail: { value: 'hello world' },
        bubbles: true,
        composed: true,
      }),
    );

    const algoSelector = element.shadowRoot?.querySelector('algorithm-selector') as HTMLElement & {
      selectedAlgorithm: string;
      mode: string;
    };
    algoSelector.dispatchEvent(
      new CustomEvent('algo-changed', {
        detail: { algorithm: 'url' },
        bubbles: true,
        composed: true,
      }),
    );

    algoSelector.dispatchEvent(
      new CustomEvent('mode-changed', {
        detail: { mode: 'decode' },
        bubbles: true,
        composed: true,
      }),
    );

    await element.updateComplete;

    expect(localStorage.getItem('devencoder_input')).toBe('hello world');
    expect(localStorage.getItem('devencoder_algo')).toBe('url');
    expect(localStorage.getItem('devencoder_mode')).toBe('decode');

    const params = new URLSearchParams(window.location.search);
    expect(params.get('input')).toBe('hello world');
    expect(params.get('algo')).toBe('url');
    expect(params.get('mode')).toBe('decode');
  });

  it('should clear stored input state when input is cleared', async () => {
    element = document.createElement('decoder-app') as DecoderApp;
    document.body.appendChild(element);

    await element.updateComplete;

    const inputPanel = element.shadowRoot?.querySelector('text-panel[title="Input"]') as TextPanel;
    // set input
    inputPanel.dispatchEvent(
      new CustomEvent('text-changed', {
        detail: { value: 'temp text' },
        bubbles: true,
        composed: true,
      }),
    );

    await element.updateComplete;
    expect(localStorage.getItem('devencoder_input')).toBe('temp text');

    // clear input
    inputPanel.dispatchEvent(
      new CustomEvent('text-changed', {
        detail: { value: '' },
        bubbles: true,
        composed: true,
      }),
    );

    await element.updateComplete;
    expect(localStorage.getItem('devencoder_input')).toBeNull();
    const params = new URLSearchParams(window.location.search);
    expect(params.get('input')).toBeNull();
  });
});
