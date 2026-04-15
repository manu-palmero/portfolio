# featured-repos-curation Specification

## Purpose
TBD - created by archiving change agregar-tema-oscuro. Update Purpose after archive.
## Requirements
### Requirement: Exclusión de forks y repos no propios
La sección de destacados MUST mostrar únicamente repositorios cuyo owner sea el usuario del portfolio y que no estén marcados como fork.

#### Scenario: Repositorio fork detectado
- **WHEN** un repositorio está marcado como fork
- **THEN** ese repositorio no aparece en la lista de destacados

#### Scenario: Repositorio de tercero detectado
- **WHEN** un repositorio no pertenece al owner configurado del portfolio
- **THEN** ese repositorio se excluye automáticamente de destacados

### Requirement: Priorización por relevancia profesional
Los repositorios elegibles SHALL ordenarse por un score de relevancia que considere señales de valor profesional (descripción, stack, actividad y tracción).

#### Scenario: Ranking de repos elegibles
- **WHEN** existe más de un repositorio elegible
- **THEN** la lista de destacados se ordena por score de relevancia de mayor a menor

#### Scenario: Información incompleta en un repositorio
- **WHEN** un repositorio elegible carece de alguna señal (por ejemplo, descripción vacía)
- **THEN** el sistema aplica fallback definido y mantiene la estabilidad del ranking sin fallar la renderización

