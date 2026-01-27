# Ag Spray Mixing Calculator

## Overview
A React-based agricultural spray mixing calculator that helps calculate product amounts for tank mixes based on fill volume, application rate, and product specifications.

## Tech Stack
- React 18 with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- PostCSS with Autoprefixer

## Project Structure
```
src/
  App.tsx       - Main application component with all UI and logic
  main.tsx      - React entry point
  index.css     - Global styles and Tailwind imports
public/
  manifest.json - PWA manifest
  sw.js         - Service worker for offline support
dist/           - Production build output
```

## Development
- Run `npm run dev` to start the development server on port 5000
- Run `npm run build` to create a production build
- Run `npm run preview` to preview the production build

## Deployment
Configured for static deployment using the `dist` directory after building.
