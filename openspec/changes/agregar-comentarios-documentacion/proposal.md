## Why

El código actual de los componentes en `src/components/` no tiene comentarios que documenten la lógica o intención del código. Agregar comentarios cortos por fragmentos mejora la mantenibilidad, facilita la colaboración y ayuda a entender decisiones de diseño sin necesidad de modificar código.

## What Changes

- Agregar comentarios en español (tono seco, sarcástico ocasional) en cada archivo de componente
- Documentar: hooks, funciones de utilidad, lógica de rendering, manejo de estado
- Mantener comentarios breves (1-2 líneas) que expliquen el "por qué" no el "qué"
- Evitar redundancia con código obvious
- Agregar comentarios en App.jsx para la composición de componentes

## Capabilities

### New Capabilities

- `code-documentation`: Sistema de comentarios cortos para documentar lógica de componentes

### Modified Capabilities

- Ninguno

## Impact

- **Archivos afectados**: `src/components/*.jsx`, `src/App.jsx`
- **Dependencias**: Sin cambios
- **Breaking**: No