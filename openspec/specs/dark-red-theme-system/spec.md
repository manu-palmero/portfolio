# dark-red-theme-system Specification

## Purpose
TBD - created by archiving change agregar-tema-oscuro. Update Purpose after archive.
## Requirements
### Requirement: Tema oscuro con acento rojo consistente
La interfaz SHALL usar un sistema de tokens visuales dark-first con acentos rojos consistentes para fondos, superficies, texto, bordes y estados interactivos.

#### Scenario: Aplicación consistente de tokens
- **WHEN** se renderiza cualquier sección principal del portfolio
- **THEN** los colores y estilos visuales se aplican desde tokens semánticos del tema dark-red

#### Scenario: Estados interactivos visibles
- **WHEN** el usuario interactúa con enlaces, botones o tarjetas (hover/focus/active)
- **THEN** los estados interactivos muestran variaciones de color/contraste coherentes con el tema dark-red

### Requirement: Legibilidad y contraste mínimo
El sistema visual MUST mantener contraste legible entre texto y fondo en componentes principales y elementos de navegación.

#### Scenario: Contenido textual en secciones principales
- **WHEN** se visualiza texto en hero, about, skills, projects y contact
- **THEN** el texto presenta contraste suficiente respecto del fondo para lectura cómoda

#### Scenario: Elementos de navegación destacados
- **WHEN** un enlace de navegación está en estado hover o activo
- **THEN** la jerarquía visual se mantiene clara sin perder legibilidad del label

