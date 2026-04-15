## Why

El código actual de `App.jsx` contiene 8 componentes en un solo archivo de ~330 líneas. Esto dificulta el mantenimiento, testing y navegación del código. Además, el hamburger menu para móvil está implementado en CSS pero no existe en el JSX, por lo que la navegación móvil no funciona.

## What Changes

- Extraer cada componente de `App.jsx` a su propio archivo en `src/components/`
- Crear el componente `Navbar.jsx` completo con hamburger menu funcional para móvil
- Implementar menú móvil con overlay y animaciones de apertura/cierre
- Agregar exports nombrados para cada componente
- Actualizar imports en `main.jsx`

## Capabilities

### New Capabilities

- `component-modularization`: Estructura de componentes separados por archivo para mejor mantenibilidad
- `mobile-nav`: Navegación móvil con hamburger menu funcional

### Modified Capabilities

- Ninguno. Los componentes existentes mantienen el mismo comportamiento visual y funcional.

## Impact

- **Archivos afectados**: `src/App.jsx`, `src/main.jsx`, nuevo directorio `src/components/`
- **Dependencias**: Sin cambios
- **Breaking**: No hay breaking changes visibles al usuario