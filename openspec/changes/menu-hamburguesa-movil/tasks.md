## 1. React: Navbar Component

- [x] 1.1 Agregar estado `useState(false)` para `isOpen`
- [x] 1.2 Agregar botón hamburger (3 spans) visible en < 860px
- [x] 1.3 Toggle `isOpen` al click en hamburger
- [x] 1.4 Agregar función `scrollTo` que cierre el menú
- [x] 1.5 Agregar `useEffect` para cerrar con ESC key
- [x] 1.6 Agregar `useEffect` para cerrar con click outside

## 2. CSS: Hamburger Button

- [x] 2.1 Crear `.hamburger` con 3 spans (líneas)
- [x] 2.2 Animación: spans → X con `transform: rotate` y `translate`
- [x] 2.3 Estilo: color, tamaño, cursor pointer

## 3. CSS: Mobile Menu

- [x] 3.1 Crear `.nav-links.open` con `position: fixed`
- [x] 3.2 Agregar `backdrop-filter: blur(16px)` con fondo semi-transparente
- [x] 3.3 Animación slide-down con `transform: translateY`
- [x] 3.4 Estilos de los botones del menú (vertical, centrados)

## 4. CSS: Scroll Lock

- [x] 4.1 Agregar `.menu-open` class al body cuando está abierto
- [x] 4.2 `body.menu-open { overflow: hidden }`

## 5. Verificación

- [x] 5.1 Testear en DevTools con viewport < 860px
- [x] 5.2 Verificar animación open/close
- [x] 5.3 Verificar cierre al click en link
- [x] 5.4 Ejecutar `npm run build`
