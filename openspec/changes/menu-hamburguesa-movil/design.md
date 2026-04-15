## Context

El navbar actual tiene navegación desktop funcional pero en móvil los links están ocultos sin mecanismo de acceso. El breakpoint está en 860px. Se necesita implementar un menú hamburguesa que siga la estética del sitio (dark theme, gradientes sutiles).

## Goals / Non-Goals

**Goals:**
- Navegación accesible en móvil (< 860px)
- Animación hamburger → X fluida
- Menú con backdrop blur consistente con el navbar scrolled
- UX nativa: cierra al navegar, bloquea scroll

**Non-Goals:**
- Cambiar la navegación desktop
- Implementar gestures o swipe
- Soporte para tablets (solo phone o desktop)

## Decisions

### Botón hamburger: CSS-only transform

**Decisión**: Usar 3 spans con CSS transform para la animación (en vez de SVG morphing)

**Alternativas evaluadas**:
1. 3 spans + CSS transform → Más simple, ~50 líneas CSS
2. SVG path morphing → Más smooth pero más complejo
3. Icono pre-renderizado → Menos flexible

**Rationale**: CSS-only es suficiente para 3 rayas → X. Permite control total del timing y easing sin dependencias externas.

### Menú: Slide desde arriba, blur background

```
┌──────────────────────────────────┐
│  ┌─ navbar ─────────────────┐   │
│  │ MP              ☰/✕      │   │
│  └───────────────────────────┘   │
│                                  │
│  ┌─ backdrop ────────────────┐   │
│  │  blur(16px)              │   │
│  │                          │   │
│  │    Sobre mí              │   │
│  │    Skills               │   │
│  │    Proyectos            │   │
│  │    Contacto             │   │
│  └──────────────────────────┘   │
└──────────────────────────────────┘
```

**Rationale**: Slide desde arriba mantiene el patrón iOS/Android nativo. Blur conecta visualmente con el navbar scrolled.

### Scroll lock: Body overflow

**Decisión**: Agregar/remover `overflow: hidden` al body cuando el menú abre/cierra

**Rationale**: Simple, funciona en todos los browsers. Alternativas como `position: fixed` causan jump de scroll.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Scroll lock causa layout shift | Body tiene altura fija en móvil; no debería afectar |
| Animaciones no suaves en low-end | Usar `transform` y `opacity` (GPU accelerated) |
| Accesibilidad: keyboard navigation | Focus trap dentro del menú cuando está abierto |

## Migration Plan

1. Modificar `Navbar()` en `App.jsx`:
   - Agregar `useState(false)` para `isOpen`
   - Agregar `useEffect` para ESC key y click outside
   - Agregar botón hamburger

2. Modificar `index.css`:
   - Agregar estilos `.hamburger` y `.hamburger.open`
   - Modificar `@media (max-width: 860px)` para mostrar hamburger
   - Agregar estilos del menú desplegable
   - Agregar `.menu-open` class al body

3. Testear en DevTools responsive mode
4. Build y deploy
