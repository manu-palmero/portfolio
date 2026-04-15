## Why

El menú de navegación es invisible en dispositivos móviles. El CSS actual oculta los links con `display: none` en breakpoints menores a 860px, pero no existe ningún botón hamburger para togglear el menú, dejando la navegación inaccesible en móvil.

## What Changes

- Agregar botón hamburger animado en el navbar (visible solo en móvil)
- Implementar animación de 3 líneas a X al togglear
- Menú desplegable con backdrop blur desde arriba a la derecha
- Cerrar menú al hacer clic en un enlace
- Bloquear scroll del body cuando el menú está abierto

## Capabilities

### New Capabilities

- `mobile-nav`: Menú hamburguesa animado para navegación en dispositivos móviles.

### Modified Capabilities

*(ninguna)*

## Impact

- `src/App.jsx` - Componente Navbar (agregar estado isOpen, botón hamburger)
- `src/index.css` - Estilos del hamburger, menú desplegable, body scroll lock
