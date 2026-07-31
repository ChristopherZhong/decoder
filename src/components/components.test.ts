import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './theme-toggle';
import './algorithm-selector';
import './text-panel';
import './decoder-app';
import { ThemeToggle } from './theme-toggle';
import { AlgorithmSelector } from './algorithm-selector';
import { TextPanel } from './text-panel';
import { DecoderApp } from './decoder-app';

describe('ThemeToggle Component', () => {
  let element: ThemeToggle;

  beforeEach(() => {
    element = document.createElement('theme-toggle') as ThemeToggle;
    document.body.appendChild(element);
  });

  afterEach(() => {
    element.remove();
  });

  it('should initialize and apply the default theme', () => {
    expect(element.theme).toBeDefined();
    const hasThemeClass =
      document.documentElement.classList.contains('dark') ||
      document.documentElement.classList.contains('light');
    expect(hasThemeClass).toBe(true);
  });

  it('should toggle theme on click', () => {
    const initialTheme = element.theme;
    const button = element.shadowRoot?.querySelector('button');
    expect(button).toBeDefined();
    button?.click();
    expect(element.theme).not.toBe(initialTheme);
  });
});

describe('AlgorithmSelector Component', () => {
  let element: AlgorithmSelector;

  beforeEach(() => {
    element = document.createElement('algorithm-selector') as AlgorithmSelector;
    document.body.appendChild(element);
  });

  afterEach(() => {
    element.remove();
  });

  it('should render correct default values', () => {
    expect(element.selectedAlgorithm).toBe('base64');
    expect(element.mode).toBe('encode');
  });

  it('should render options for base64, url, hex, rot13', () => {
    const select = element.shadowRoot?.querySelector('select');
    expect(select).toBeDefined();
    const options = Array.from(select?.querySelectorAll('option') || []).map((opt) => opt.value);
    expect(options).toContain('base64');
    expect(options).toContain('url');
    expect(options).toContain('hex');
    expect(options).toContain('rot13');
  });
});

describe('TextPanel Component', () => {
  let element: TextPanel;

  beforeEach(() => {
    element = document.createElement('text-panel') as TextPanel;
    document.body.appendChild(element);
  });

  afterEach(() => {
    element.remove();
  });

  it('should render title and value', async () => {
    element.title = 'Test Input';
    element.value = 'Hello';
    await element.updateComplete;

    const titleSpan = element.shadowRoot?.querySelector('.panel-title');
    expect(titleSpan?.textContent).toBe('Test Input');

    const textarea = element.shadowRoot?.querySelector('textarea');
    expect(textarea?.value).toBe('Hello');
  });

  it('should trigger text-changed event on textarea input', async () => {
    let triggeredValue = '';
    element.addEventListener('text-changed', (e: Event) => {
      triggeredValue = (e as CustomEvent).detail.value;
    });

    await element.updateComplete;
    const textarea = element.shadowRoot?.querySelector('textarea');
    if (textarea) {
      textarea.value = 'New Value';
      textarea.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    }

    expect(triggeredValue).toBe('New Value');
  });
});

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
