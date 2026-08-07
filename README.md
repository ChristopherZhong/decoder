# ⚡ DevEncoder

[![Deploy to GitHub Pages](https://github.com/ChristopherZhong/decoder/actions/workflows/deploy.yml/badge.svg)](https://github.com/ChristopherZhong/decoder/actions/workflows/deploy.yml)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![Built with Lit](https://img.shields.io/badge/built%20with-Lit-blue?logo=lit&color=324fff)](https://lit.dev/)
[![Vite](https://img.shields.io/badge/Vite-B736FF?logo=vite&logoColor=FFD62E)](https://vite.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

**DevEncoder** is a fast, highly secure, client-side decoding and encoding web application. Built utilizing modern frontend technologies like **TypeScript**, **Lit Web Components**, and **Vite**, it empowers developers and users to securely convert textual data across multiple encoding formats directly within their web browser.

🔒 **Privacy First:** Since all conversions are computed purely client-side using native browser APIs and local JavaScript, **none of your input data is ever transmitted to a server**.

---

## 🚀 Live Demo & Deployment

DevEncoder is configured to build and publish automatically to GitHub Pages. Every commit pushed to the `main` branch triggers the GitHub Actions CI/CD deployment workflow.

* **Live Demo:** [https://christopherzhong.github.io/decoder/](https://christopherzhong.github.io/decoder/)
* **GitHub Actions Workflow:** `.github/workflows/deploy.yml`
* **Target Environment:** GitHub Pages (`dist/` directory artifacts upload)

---

## ✨ Features

- **Instant Conversion:** Converts your input in real-time as you type or paste.
- **Bi-directional Encoding & Decoding:** Toggle between *Encode* and *Decode* modes seamlessly.
- **Multiple Supported Formats:** Switch between Base64, Hexadecimal, URL encoding, and ROT13.
- **Error Handling Banner:** Real-time feedback for invalid inputs (e.g., malformed base64 strings or odd-length hex strings).
- **Interactive Workspace Utilities:**
  - 📋 **Copy to Clipboard:** Instantly copy encoded or decoded outputs.
  - 📋 **Paste from Clipboard:** Conveniently paste clipboard contents with a single click.
  - 🧹 **Clear Canvas:** Instantly wipe text inputs for a clean start.
  - 🔄 **Swap Panels:** Promote the current output to the input panel and flip the mode (Encode/Decode) automatically for multi-pass conversions.
- **Responsive & Accessible UI:** Full support for desktop, tablet, and mobile layouts.
- **Light & Dark Mode:** Sleek theme toggler to suit your coding environment.

---

## 🛠 Supported Algorithms

| Algorithm | ID | Description | Features / Custom Behavior |
| :--- | :--- | :--- | :--- |
| **Base64** | `base64` | Standard Base64 encoder/decoder | Utilizes native `TextEncoder`/`TextDecoder` and `btoa`/`atob`. Clears whitespaces/newlines automatically before decoding. |
| **Hexadecimal** | `hex` | Base16 hexadecimal representation | Encodes characters to 2-character hex codes. Decodes standard hex strings, ignores spaces, colons, `0x` prefixes, and `\x` prefixes. |
| **URL Percent Encoding** | `url` | Standard URI percent encoding | Utilizes robust `encodeURIComponent` and `decodeURIComponent` helpers to safely escape and restore Special characters. |
| **ROT13** | `rot13` | Symmetrical shift cipher | A Caesar cipher with a shift of 13. Symmetrical (encoding and decoding apply the same operation). |

---

## 📦 Project Architecture

The workspace is highly modularized, keeping logic and components cleanly decoupled:

```bash
src/
├── algorithms/                 # Decoding/Encoding algorithms & dynamic registry
│   ├── types/
│   │   └── algorithm.interface.ts # Interface definition for algorithms
│   ├── base-64.algorithm.ts    # Standard Base64 encoder/decoder
│   ├── hexadecimal.algorithm.ts # Hexadecimal representation encoder/decoder
│   ├── rot-13.algorithm.ts     # ROT13 shift cipher encoder/decoder
│   ├── url-percent-encoding.algorithm.ts # URL percent encoding encoder/decoder
│   ├── is-algorithm.guard.ts   # Type guard for validating algorithms
│   └── registry.ts             # Central dynamic registry for all algorithms
├── components/                 # Lit Web Components
│   ├── algorithm-selector.ts   # UI controls for selecting algorithm and mode
│   ├── decoder-app.ts          # Main application container and coordinator
│   ├── text-panel.ts           # Interactive panel for input/output text areas
│   └── theme-toggle.ts         # Handles system preference and dark/light switching
├── index.html                  # Main entry page
├── index.ts                    # Entry script bootstrapping the main element
└── style.css                   # Global styling definitions and CSS variables
```

---

## ⚙️ Configuration Notes

### Custom TypeScript Mappings

This project utilizes special custom TypeScript mappings defined within `package.json` under `devDependencies`:
- `"typescript": "npm:@typescript/typescript6@^6.0.2"` maps the standard `typescript` package to TypeScript v6.
- `"@typescript/native": "npm:typescript@^7.0.2"` maps standard typescript to v7.

Please preserve these mappings to ensure consistent building and type checking across your development environment.

---

## 💻 Local Development Setup

Follow these steps to run, test, and develop DevEncoder locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher is recommended)
- `npm` (packaged with Node.js)

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/ChristopherZhong/decoder.git
cd decoder
npm install
```

### 2. Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the local development server at `http://localhost:5173/` with hot module replacement (HMR). |
| `npm run build` | Compiles TypeScript declarations (`tsc`) and builds the optimized production static bundle into the `dist/` directory using Vite. |
| `npm run preview` | Previews the built production static site locally. |
| `npm run test` | Runs the full Vitest suite in single-run mode. |
| `npm run test:watch`| Runs the Vitest suite in interactive watch mode. |
| `npm run lint` | Runs ESLint flat config checking against all TypeScript files under `src/`. |
| `npm run format` | Invokes Prettier to automatically format and overwrite code in `src/` (supports `.ts`, `.css`, and `.html`). |
| `npm run storybook` | Starts Storybook on port `6006` to visually inspect, document, and interact with Web Components in isolation. |
| `npm run build-storybook` | Compiles Storybook into a static build package. |

### 3. Running Tests

This project uses **Vitest** along with **Happy DOM** for testing web components and DOM interactions.

```bash
# Run tests once
npm run test
```

### 4. Code Formatting & Linting

We enforce strict formatting rules with ESLint and Prettier. To verify or auto-fix your code before committing:

```bash
# Formats all files
npm run format

# Lints TypeScript sources
npm run lint
```

---

## 📄 License

This project is licensed under the [Apache License 2.0](LICENSE).
