## Context

El portfolio actual usa React + Vite con una estructura de secciones en `src/App.jsx` y estilos centralizados en `src/index.css`. Ya existe una base visual oscura y algunas animaciones, pero la identidad visual no está estandarizada (tokens/criterios), el acento cromático principal no está alineado al rojo solicitado, y la curación de destacados se define con datos hardcodeados sin reglas explícitas de relevancia.

Restricciones clave:
- El cambio debe priorizar impacto visual sin comprometer legibilidad ni performance en móviles.
- Debe evitar mostrar forks y priorizar repositorios propios relevantes.
- No se requiere cambiar API pública; el alcance es presentación y lógica de selección de contenido destacado.

## Goals / Non-Goals

**Goals:**
- Establecer un sistema visual dark + red consistente y reutilizable en toda la UI.
- Definir un lenguaje de animación coherente para entradas de secciones y microinteracciones.
- Formalizar reglas de curación de repos destacados (autoría, exclusión de forks, relevancia).
- Mejorar claridad narrativa de la sección de proyectos mediante metadatos y jerarquía visual.

**Non-Goals:**
- Reescribir completamente la arquitectura de componentes del portfolio.
- Implementar backend propio para analytics o métricas avanzadas de repositorios.
- Introducir un sistema de theming multi-brand o multi-tenant.

## Decisions

1. **Adoptar design tokens para tema dark-red**
   - Decisión: centralizar colores, tipografías, sombras y estados en variables/tokens semánticos.
   - Rationale: reduce inconsistencias y simplifica evolución visual.
   - Alternativas consideradas:
     - Ajustes ad-hoc por componente: rápido al inicio, pero aumenta deuda visual.
     - Framework de diseño completo (p.ej. Tailwind + plugin): más potente, pero sobredimensionado para este alcance.

2. **Definir motion system en dos niveles (macro + micro)**
   - Decisión: usar animaciones de entrada para secciones (macro) y feedback de hover/focus/click en elementos interactivos (micro), con duraciones y easings normalizados.
   - Rationale: logra percepción moderna sin ruido visual.
   - Alternativas consideradas:
     - Animaciones intensivas en todo el layout: mayor impacto inicial, peor performance y fatiga visual.
     - Casi sin animación: más seguro en performance, pero no cumple objetivo estético solicitado.

3. **Curación de destacados basada en reglas explícitas**
   - Decisión: aplicar un filtro estricto por autoría (`owner == manu-palmero`) y exclusión de forks (`fork == false`), luego ordenar por score de relevancia.
   - Rationale: alinea la vitrina profesional con trabajo propio y evita ruido.
   - Alternativas consideradas:
     - Curación manual total: control alto, mantenimiento constante y propenso a desactualización.
     - Mostrar repos recientes sin score: simple, pero no optimiza relevancia profesional.

4. **Relevancia con scoring transparente**
   - Decisión: puntuar repos según señales simples (descripción, lenguaje principal, stars acotados, actividad reciente y tipo de proyecto).
   - Rationale: criterio reproducible y auditable.
   - Alternativas consideradas:
     - Ordenar solo por stars: sesga proyectos viejos.
     - Ordenar solo por fecha: favorece repos nuevos pero no necesariamente relevantes.

## Risks / Trade-offs

- [Exceso de animación puede degradar UX/performance] → Mitigación: límites por viewport, transiciones con duraciones acotadas y fallback para dispositivos de bajo rendimiento.
- [Paleta roja mal calibrada puede afectar contraste/accesibilidad] → Mitigación: validar contraste mínimo y reservar rojo intenso para acentos, no para texto base.
- [Reglas de relevancia pueden excluir repos útiles] → Mitigación: documentar score y permitir ajuste de pesos sin cambiar estructura.
- [Dependencia de metadatos incompletos en repos] → Mitigación: definir fallback cuando falte descripción/lenguaje para evitar tarjetas vacías.
