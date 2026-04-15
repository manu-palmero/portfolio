## ADDED Requirements

### Requirement: Reglas explícitas de elegibilidad para destacados
El sistema SHALL evaluar cada repositorio contra reglas de elegibilidad explícitas antes de incluirlo en la lista de destacados.

#### Scenario: Repositorio elegible
- **WHEN** un repositorio cumple las reglas de owner, estado de fork y criterios mínimos definidos
- **THEN** el repositorio pasa a la etapa de ranking

#### Scenario: Repositorio no elegible
- **WHEN** un repositorio incumple cualquier regla obligatoria de elegibilidad
- **THEN** el repositorio se excluye de destacados sin interrumpir el render

### Requirement: Reglas de elegibilidad mantenibles
Las reglas MUST estar centralizadas y ser modificables sin reescribir el flujo completo de selección.

#### Scenario: Ajuste de criterio de elegibilidad
- **WHEN** se actualiza un criterio de filtrado
- **THEN** el cambio afecta únicamente la configuración/regla centralizada y mantiene el resto del pipeline intacto
