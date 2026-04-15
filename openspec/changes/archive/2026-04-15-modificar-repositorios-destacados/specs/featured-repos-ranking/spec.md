## ADDED Requirements

### Requirement: Ranking de destacados por scoring configurable
El sistema SHALL ordenar repositorios elegibles mediante un score calculado con señales configurables de relevancia profesional.

#### Scenario: Ordenamiento descendente por score
- **WHEN** existe más de un repositorio elegible
- **THEN** la lista final se ordena de mayor a menor score

#### Scenario: Ajuste de pesos del scoring
- **WHEN** se modifican pesos de señales de relevancia
- **THEN** el ranking se recalcula usando la nueva configuración sin cambiar la estructura del algoritmo

### Requirement: Estabilidad del ranking ante datos incompletos
El cálculo de score MUST manejar datos ausentes sin producir errores ni resultados no deterministas.

#### Scenario: Campo opcional faltante
- **WHEN** un repositorio no tiene una señal opcional (por ejemplo descripción o actividad reciente)
- **THEN** el sistema aplica valor por defecto definido y continúa el cálculo correctamente
