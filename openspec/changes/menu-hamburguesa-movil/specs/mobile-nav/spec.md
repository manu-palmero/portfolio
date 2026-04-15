## ADDED Requirements

### Requirement: Botón hamburger visible en móvil
El botón hamburger SHALL ser visible únicamente en viewports menores a 860px.

#### Scenario: Botón visible en móvil
- **WHEN** el viewport es menor a 860px
- **THEN** el botón hamburger es visible y el menú desktop está oculto

#### Scenario: Botón oculto en desktop
- **WHEN** el viewport es igual o mayor a 860px
- **THEN** el botón hamburger está oculto y los links desktop son visibles

### Requirement: Animación hamburger a X
El botón SHALL transformar de 3 líneas horizontales a X cuando se togglea.

#### Scenario: Open animation
- **WHEN** el usuario toca el botón hamburger
- **THEN** las 3 líneas rotan y traducen para formar una X con animación de 300ms

#### Scenario: Close animation
- **WHEN** el menú está abierto y el usuario toca el botón
- **THEN** la X revierte a 3 líneas con animación de 300ms

### Requirement: Menú desplegable con blur
El menú SHALL desplegarse desde arriba con fondo blur cuando está abierto.

#### Scenario: Menú abierto
- **WHEN** el menú se abre
- **THEN** aparece con animación slide-down desde arriba
- **AND** tiene `backdrop-filter: blur(16px)` con fondo semi-transparente

### Requirement: Cierre al hacer clic en enlace
El menú SHALL cerrarse cuando el usuario hace clic en cualquier enlace.

#### Scenario: Navegación cierra menú
- **WHEN** usuario toca "Sobre mí", "Skills", "Proyectos" o "Contacto"
- **THEN** el menú se cierra
- **AND** se hace scroll a la sección correspondiente

### Requirement: Bloqueo de scroll
El body SHALL tener scroll bloqueado mientras el menú está abierto.

#### Scenario: Scroll bloqueado
- **WHEN** el menú está abierto
- **THEN** `body { overflow: hidden }`
- **AND** al cerrar, el scroll se restaura
