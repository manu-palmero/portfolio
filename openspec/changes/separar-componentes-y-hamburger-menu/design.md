## Context

El portfolio actual tiene todos los componentes en un solo archivo `App.jsx`. Los estilos CSS ya tienen implementada la lógica del hamburger menu (clases `.hamburger`, `.mobile-menu`, animaciones), pero el componente Navbar en JSX no incluye el botón de hamburger ni el menú móvil.

**Estado actual:**
- `App.jsx`: 8 componentes en un archivo
- `Navbar.jsx` (no existe): Solo hay función dentro de App.jsx
- CSS tiene `.hamburger` y `.mobile-menu` pero no se renderiza nada

## Goals / Non-Goals

**Goals:**
- Extraer componentes a archivos individuales en `src/components/`
- Implementar hamburger menu funcional para viewport < 860px
- Mantener comportamiento visual identical
- Mejorar mantenibilidad y testabilidad

**Non-Goals:**
- No agregar testing framework (fuera de scope)
- No modificar diseño visual existente
- No agregar nuevas features

## Decisions

1. **Estructura de archivos por componente**
   - Decisión: Crear `src/components/Navbar.jsx`, `Hero.jsx`, etc.
   - Alternativa considerada: Usar directorios por componente (Navbar/index.jsx)
   - Rationale: Más simple para componentes pequeños, no necesita barrel exports

2. **Hamburger menu state management**
   - Decisión: Estado local `isOpen` en Navbar con `useState`
   - Alternativa considerada: Global state (Context) o CSS-only toggle
   - Rationale: Solo Navbar necesita este estado, no justifica complejidad extra

3. **Mobile menu overlay**
   - Decisión: Fixed overlay con backdrop-filter blur (ya existe en CSS)
   - Rationale: CSS ya tiene implementadas las animaciones y estilos

## Risks / Trade-offs

- **Riesgo**: Retrocompatibilidad de imports
  - Mitigación: Mantener exports con mismos nombres que antes

- **Riesgo**: Breakpoints no coinciden entre JS y CSS
  - Mitigación: Usar el mismo breakpoint (860px) que ya está en CSS

## Migration Plan

1. Crear directorio `src/components/`
2. Crear cada archivo de componente
3. Actualizar `App.jsx` para importar desde `./components/`
4. Actualizar `main.jsx` si es necesario
5. Verificar en dev server que todo funciona

**Rollback**: git revert o restaurar `App.jsx` original si hay problemas.