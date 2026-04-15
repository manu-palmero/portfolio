## ADDED Requirements

### Requirement: Hamburger button visibility
El navbar SHALL mostrar un botón hamburger en viewports menores a 860px.

#### Scenario: Hamburger shows on mobile
- **WHEN** el ancho del viewport es menor a 860px
- **THEN** el botón con clase `.hamburger` es visible

#### Scenario: Hamburger hidden on desktop
- **WHEN** el ancho del viewport es mayor o igual a 860px
- **THEN** el botón con clase `.hamburger` está oculto (display: none)

### Requirement: Mobile menu toggle
El botón hamburger SHALL alternar la visibilidad del menú móvil al hacer click.

#### Scenario: Open menu on click
- **WHEN** usuario hace click en botón hamburger
- **THEN** el menú móvil con clase `.mobile-menu` recibe clase `.open` y se muestra con animación

#### Scenario: Close menu on click
- **WHEN** el menú móvil está abierto y usuario hace click en hamburger
- **THEN** la clase `.open` se remueve y el menú se oculta con animación

### Requirement: Mobile menu navigation
El menú móvil SHALL incluir los mismos enlaces que la navegación de escritorio.

#### Scenario: Mobile menu has all links
- **WHEN** el menú móvil está abierto
- **THEN** muestra enlaces: Sobre mí, Skills, Proyectos, Contacto

### Requirement: Menu closes on navigation
El menú móvil SHALL cerrarse automáticamente cuando el usuario hace click en un enlace.

#### Scenario: Navigation closes menu
- **WHEN** usuario hace click en cualquier enlace del menú móvil
- **THEN** el menú se cierra y se hace scroll a la sección correspondiente

### Requirement: Body scroll lock
El menú móvil SHALL bloquear el scroll del body cuando está abierto.

#### Scenario: Body scroll locked
- **WHEN** el menú móvil está abierto
- **THEN** el body tiene la clase `menu-open` que aplica `overflow: hidden`