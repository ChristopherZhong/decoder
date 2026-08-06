import type { Preview } from '@storybook/web-components';
import '../src/style.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'light', value: '#f8fafc' },
        { name: 'dark', value: '#0b0f19' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
