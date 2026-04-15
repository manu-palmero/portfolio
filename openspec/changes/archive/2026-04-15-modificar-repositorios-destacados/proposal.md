## Why

La sección de repositorios destacados necesita criterios más claros y mantenibles para reflejar mejor el perfil profesional y evitar ruido de proyectos poco relevantes. Formalizar este cambio permite ajustar selección, orden y presentación sin depender de ediciones ad-hoc.

## What Changes

- Redefinir reglas de selección de repositorios destacados para priorizar valor profesional y consistencia de contenido.
- Ajustar el algoritmo de ranking/orden para que el listado final sea más representativo.
- Mejorar estructura de datos y fallback de metadatos para evitar tarjetas vacías o inconsistentes.
- Actualizar la presentación visual de destacados para comunicar mejor relevancia y contexto de cada repositorio.

## Capabilities

### New Capabilities
- `featured-repos-selection-rules`: Reglas explícitas de elegibilidad y filtrado para repositorios destacados.
- `featured-repos-ranking`: Priorización de repositorios mediante scoring configurable y estable.
- `featured-repos-presentation`: Reglas de presentación de metadatos y fallback para tarjetas de destacados.

### Modified Capabilities
- Ninguna.

## Impact

- Afecta lógica de selección/orden de repositorios en frontend.
- Afecta rendering de la sección de proyectos destacados y su contenido visible.
- No introduce cambios de API externa; impacta comportamiento y experiencia de usuario en UI.
