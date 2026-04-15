## Context

El portfolio es una React app con Vite que se deploya a GitHub Pages como **project site** (repo: `portfolio`). GitHub Pages sirve el sitio desde `/portfolio/`, pero Vite por defecto genera rutas absolutas desde `/`, causando 404 en producción.

## Goals / Non-Goals

**Goals:**
- Corregir rutas de assets para que funcionen en GitHub Pages
- Mantener dev server funcionando normalmente

**Non-Goals:**
- Cambiar el workflow de deploy (ya usa GitHub Actions correctamente)
- Implementar routing multi-página
- Modificar la estructura del sitio

## Decisions

### Base path configuration

**Decisión**: Agregar `base: '/portfolio/'` en vite.config.js

**Alternativas evaluadas**:
1. `base: '/portfolio/'` - Usa el repo name como base path
2. `base: './'` - Rutas relativas, pero puede romper con SPA routing
3. Rewrites en GitHub Pages - Overengineering para este caso

**Rationale**: GitHub Pages project sites sirven desde `/{repo-name}/`. Usar `base` en Vite genera los paths correctos automáticamente y es la práctica recomendada en la文档 de Vite para deploys en subdirectorios.

## Risks / Trade-offs

| Risk | Mitigation |
|------|-----------|
| Dev server espera `/portfolio/` | Vite ignora `base` en dev mode por defecto |
| Otros assets (favicon, public/) | Verificar que también usan paths relativos |

## Migration Plan

1. Modificar `vite.config.js` agregando `base: '/portfolio/'`
2. Ejecutar `npm run build`
3. Verificar `dist/index.html` tiene paths correctos
4. Push para trigger de GitHub Actions
5. Esperar ~2 min y verificar en `https://manu-palmero.github.io/portfolio/`
