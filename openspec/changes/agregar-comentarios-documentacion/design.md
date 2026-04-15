## Context

Los componentes React en `src/components/` fueron creados recientemente sin documentación interna. El cambio anterior de modularización dejó 8 archivos sin comentarios.

## Goals / Non-Goals

**Goals:**
- Documentar lógica de componentes con comentarios cortos en español
- Mantener tono seco y偶尔 sarcástico (según las reglas del proyecto)
- Facilitar mantenibilidad futura

**Non-Goals:**
- No agregar JSDoc completo
- No documentar cada línea (solo lógica no-obvia)
- No cambiar comportamiento del código

## Decisions

1. **Estilo de comentarios**
   - Decisión: Español con tono argentino seco/sarcástico
   - Rationale: Mantiene consistencia con personalidad del proyecto

2. **Qué documentar**
   - useState, useEffect hooks
   - Funciones de scroll/navegación
   - Datos hardcodeados (proyectos, social links)
   - Lógica de rendering condicional

3. **Dónde NO comentar**
   - JSX que es auto-explicativo
   - Imports obvios
   - Cosas que se leen bien sin comentario

## Risks / Trade-offs

- **Riesgo**: Comentar demasiado → ruido
  - Mitigación: Solo "por qué", no "qué"

- **Riesgo**: Inconsistencia entre archivos
  - Mitigación: Mismo patrón en todos

## Migration Plan

1. Leer cada archivo de componente
2. Agregar comentarios en puntos clave
3. Verificar que build sigue pasando
4. No requiere rollback (solo comentarios)