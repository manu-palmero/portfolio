# featured-repos-presentation Specification

## Purpose
TBD - created by archiving change modificar-repositorios-destacados. Update Purpose after archive.
## Requirements
### Requirement: Presentación consistente de metadatos
La sección de destacados SHALL mostrar metadatos clave de cada repositorio con estructura visual consistente.

#### Scenario: Repositorio con metadatos completos
- **WHEN** un repositorio tiene nombre, descripción, lenguaje, score y actividad
- **THEN** la tarjeta renderiza todos esos datos respetando la jerarquía visual definida

#### Scenario: Repositorio con metadatos incompletos
- **WHEN** faltan campos opcionales en un repositorio destacado
- **THEN** la tarjeta usa fallback de contenido sin romper layout ni dejar espacios vacíos ambiguos

### Requirement: Límite y recorte determinista de destacados
La interfaz MUST aplicar un límite máximo de tarjetas destacadas después de ordenar por relevancia.

#### Scenario: Más repos elegibles que cupos visibles
- **WHEN** la cantidad de repositorios elegibles supera el límite configurado
- **THEN** solo se muestran los repositorios con mejor ranking hasta completar el cupo

