## Context

La sección de “Proyectos Destacados” ya tiene una base de filtrado y score, pero la selección de repositorios puede quedar acoplada a datos estáticos y criterios poco transparentes para futuras actualizaciones. El objetivo es estabilizar y mejorar reglas de elegibilidad, ranking y presentación para que el listado represente mejor el perfil técnico sin introducir mantenimiento frágil.

El cambio impacta lógica de frontend y contrato de datos de cada repositorio mostrado (campos, fallback y visualización), sin requerir backend adicional.

## Goals / Non-Goals

**Goals:**
- Definir reglas de selección explícitas y fáciles de ajustar para determinar qué repositorios pueden ser destacados.
- Refinar scoring/ranking para reflejar relevancia profesional de forma más estable.
- Mejorar la presentación de metadatos y fallback para mantener consistencia visual aun con información incompleta.
- Facilitar evolución futura del listado sin reescribir lógica central.

**Non-Goals:**
- Integrar APIs externas en esta iteración si no son necesarias para el criterio.
- Cambiar otras secciones del portfolio fuera de “Proyectos Destacados”.
- Implementar analítica avanzada o machine learning para ranking.

## Decisions

1. **Separar elegibilidad, score y rendering en pasos explícitos**
   - Decisión: pipeline en tres etapas (`filter -> score -> present`) con funciones claramente separadas.
   - Rationale: mejora legibilidad, testabilidad y mantenimiento.
   - Alternativas consideradas:
     - Función monolítica única: más rápida inicialmente, más difícil de ajustar.

2. **Configurar scoring con pesos declarativos**
   - Decisión: modelar pesos por señales (lenguaje, actividad, stars, tipo, descripción) en una estructura configurable.
   - Rationale: permite calibrar ranking sin tocar algoritmo base.
   - Alternativas consideradas:
     - Reglas hardcodeadas dispersas: alto riesgo de inconsistencias.

3. **Fallback de metadatos obligatorio para presentación**
   - Decisión: definir defaults para descripción, fecha y tipo cuando falten datos.
   - Rationale: evita tarjetas rotas o vacías en el grid.
   - Alternativas consideradas:
     - Omitir tarjetas con datos incompletos: puede eliminar repos valiosos.

4. **Validación defensiva de elegibilidad**
   - Decisión: mantener verificación de owner/fork y excluir automáticamente repos inválidos.
   - Rationale: preserva coherencia con requisito de mostrar solo repos propios relevantes.

## Risks / Trade-offs

- [Sobreajuste del score produce ranking poco intuitivo] → Mitigación: documentar pesos y revisar resultados con ejemplos reales.
- [Datos incompletos degradan confianza del usuario] → Mitigación: fallback uniforme y copy explícito cuando falta metadata.
- [Cambios frecuentes de criterio generan inestabilidad visual] → Mitigación: versionar criterios y evitar ajustes no justificados.
- [Demasiado filtrado reduce cantidad de destacados] → Mitigación: definir umbral mínimo y fallback de selección secundaria.
