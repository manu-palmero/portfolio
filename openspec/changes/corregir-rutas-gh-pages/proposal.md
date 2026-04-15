## Why

El portfolio no se ve en GitHub Pages porque las rutas de assets son absolutas (`/assets/...`) en lugar de relativas al context path (`/portfolio/assets/...`). El repo `portfolio` se deploya como project site, sirviendo desde `/portfolio/`, pero Vite genera paths que asume root (`/`).

## What Changes

- Agregar `base: '/portfolio/'` en `vite.config.js` para que Vite genere paths relativos al context path
- Regenerar el build y verificar que los assets apuntan a `/portfolio/assets/...`

## Capabilities

### New Capabilities

- `gh-pages-deployment`: Configuración de Vite para deploy en GitHub Pages como project site.

### Modified Capabilities

*(ninguna)*

## Impact

- `vite.config.js` - Configuración de build
- Workflow de GitHub Actions - No requiere cambios, sigue usando `dist/`
