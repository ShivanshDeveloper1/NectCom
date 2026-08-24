const fs = require('fs');
const path = require('path');

const clientDir = 'c:\\Users\\ganes\\OneDrive\\Desktop\\SaaS\\client';

const dirs = [
  'src/assets',
  'src/components/ui',
  'src/components/layout',
  'src/components/home',
  'src/components/product',
  'src/components/cart',
  'src/components/auth',
  'src/context',
  'src/data',
  'src/pages',
  'src/services',
];

dirs.forEach(dir => {
  fs.mkdirSync(path.join(clientDir, dir), { recursive: true });
});

const files = {
  'package.json': `{
  "name": "krishna-ayurveda-client",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@tailwindcss/vite": "^4.0.0",
    "axios": "^1.7.9",
    "framer-motion": "^12.4.7",
    "lucide-react": "^0.475.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.1.5",
    "tailwindcss": "^4.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "vite": "^6.1.0"
  }
}
`,
  'vite.config.js': `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
})
`,
  'index.html': `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet">
    <title>Krishna's Herbal & Ayurveda | 100% Pure & Authentic Ayurvedic Products</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`,
  'src/index.css': `@import "tailwindcss";

@theme {
  --color-primary: #2D6A4F;
  --color-primary-dark: #1B4332;
  --color-primary-light: #52B788;
  --color-secondary: #D4A373;
  --color-amber: #E9C46A;
  --color-accent: #E76F51;
  --color-surface: #FEFAE0;

  --font-heading: 'Playfair Display', serif;
  --font-body: 'Inter', sans-serif;
}

@layer base {
  body {
    @apply font-body bg-surface text-gray-900;
  }
  h1, h2, h3, h4, h5, h6 {
    @apply font-heading;
  }
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: var(--color-surface);
}
::-webkit-scrollbar-thumb {
  background: var(--color-primary-light);
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--color-primary);
}

/* Utilities */
@layer utilities {
  .container-custom {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
  }
  .micro-anim {
    @apply transition-all duration-300 ease-in-out;
  }
}
`,
  'src/main.jsx': `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
`,
};

for (const [filename, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(clientDir, filename), content);
}
console.log("Base files created successfully.");
