# Garden-Themed Form

A beautiful and functional form validator inspired by www.garden.finance, featuring clean UI and advanced validation with debouncing. This package provides a simple yet powerful form validation solution with a garden-inspired theme.

## Live Demo

Check out the live demo: [Garden-Themed Form Demo](https://catalog-week2-assignment.vercel.app/)

## Features

- Clean, garden-inspired UI design
- Form validation with debouncing
- Support for multiple input types (text, email, password, number, select, radio)
- Built with TypeScript and React
- Tailwind CSS integration
- Easy to customize and extend

## Installation

To use the published package in your project:

```bash
npm i garden-themed-form
```

## Prerequisites

Before using this package, ensure you have the following dependencies installed:

- Tailwind CSS
- Vite
- React

## Setup Instructions

1. Install the package:
```bash
npm i garden-themed-form
```

2. Install Tailwind CSS and its dependencies:
```bash
npm install -D tailwindcss postcss autoprefixer
npm install vite-plugin-lib-inject-css
npx tailwindcss init -p
```

3. Configure your `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "declaration": true,
    "noEmit": true,
    "allowImportingTsExtensions": true
  },
  "include": [
    "src/**/*"
  ]
}
```

4. Update your `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    './node_modules/garden-themed-form/dist/**/*.{js,jsx,ts,tsx}',
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to bottom, #c9edde, #d1e4fa)',
      },
      colors: {
        'custom-gray': '#55525d',
      },
      fontFamily: {
        satoshi: ['Satoshi', 'Helvetica Neue', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

5. Configure your `postcss.config.js`:
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

6. Set up your `vite.config.ts`:
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
  ],
});
```

7. Configure your CSS (`index.css`):
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Usage Example

```tsx
import React from "react";
import { FormValidator } from 'garden-themed-form';

const App = () => {
  interface Field {
    name: string;
    type?: string;
    options?: string[];
  }

  const fields: Field[] = [
    { name: 'name', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'password', type: 'password' },
    { name: 'age', type: 'number' },
    { name: 'city', type: 'select', options: ['New York', 'Los Angeles', 'Chicago', 'Houston'] },
    { name: 'gender', type: 'radio', options: ['Male', 'Female'] }
  ];

  return (
    <div className="bg-custom-gradient min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full">
        <FormValidator fields={fields} />
      </div>
    </div>
  );
};

export default App;
```

## Development

If you want to contribute to this project:

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Build the project:
```bash
npm run build
```

## Troubleshooting

If you encounter any styling issues:
- Ensure all configuration files are properly set up
- Clear your cache and node_modules: `rm -rf node_modules && npm install`
- Rebuild your project: `npm run build`
- Check if all peer dependencies are installed correctly

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

