## ADDED Requirements

### Requirement: Vite base path for GitHub Pages
El build de Vite SHALL generar rutas de assets relativas al context path `/portfolio/` cuando se deploya a GitHub Pages como project site.

#### Scenario: Build genera paths correctos
- **WHEN** se ejecuta `npm run build`
- **THEN** el `index.html` generado contiene `<script src="/portfolio/assets/index-xxx.js">` y `<link href="/portfolio/assets/index-xxx.css">`

#### Scenario: Assets servidos correctamente
- **WHEN** el navegador carga `https://manu-palmero.github.io/portfolio/`
- **THEN** los assets se cargan desde `https://manu-palmero.github.io/portfolio/assets/...`

#### Scenario: Dev server sin cambios
- **WHEN** se ejecuta `npm run dev`
- **THEN** la app sigue funcionando en `localhost:5173` con rutas absolutas (comportamiento por defecto en dev)
