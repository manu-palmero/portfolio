## Context

El proyecto es un frontend estático (Vite/React) y actualmente su publicación no está formalizada mediante CI/CD de GitHub Pages. Esto obliga a despliegues manuales y dificulta trazabilidad, repetibilidad y validación previa a publicar.

Hay que incorporar un workflow confiable, con permisos mínimos, compatible con el flujo de GitHub Pages y que deje claro cuándo se dispara un deploy y cómo recuperarse ante fallos.

## Goals / Non-Goals

**Goals:**
- Automatizar build y deploy del sitio hacia GitHub Pages desde GitHub Actions.
- Asegurar que el pipeline use acciones oficiales para Pages y permisos explícitos mínimos.
- Definir condiciones de ejecución claras (push a rama principal y ejecución manual).
- Mejorar la trazabilidad del despliegue con jobs separados para build y deploy.

**Non-Goals:**
- Cambiar la arquitectura de la aplicación frontend.
- Incorporar entornos múltiples (staging/preview) en esta iteración.
- Reemplazar GitHub Pages por otro proveedor de hosting.

## Decisions

1. **Adoptar workflow oficial de GitHub Pages (build + deploy separados)**
   - Decisión: modelar dos jobs (`build` y `deploy`) usando artefacto de Pages como contrato entre ambos.
   - Rationale: reduce ambigüedad operativa y alinea con el flujo recomendado por GitHub.
   - Alternativas consideradas:
     - Job único build+deploy: más corto, pero menos trazable y más difícil de depurar.
     - Deploy externo (Netlify/Vercel): fuera de alcance del pedido.

2. **Permisos mínimos y entorno dedicado de Pages**
   - Decisión: declarar permisos explícitos (`contents: read`, `pages: write`, `id-token: write`) y usar environment de despliegue.
   - Rationale: minimiza superficie de riesgo y habilita controles nativos de despliegue.
   - Alternativas consideradas:
     - Permisos amplios por defecto: más simple, menos seguro.

3. **Triggers controlados para despliegue**
   - Decisión: ejecutar en push a `master` (o rama principal del repo) y `workflow_dispatch` para publicación manual.
   - Rationale: cubre automatización continua y recuperación operativa sin commits adicionales.
   - Alternativas consideradas:
     - Solo manual: menor riesgo de deploy accidental, pero pierde continuidad CI/CD.
     - Solo push: limita capacidad de relanzar deploy ante fallos transitorios.

4. **Documentar precondiciones de Pages**
   - Decisión: registrar en documentación operativa los requisitos de configuración (Pages source por GitHub Actions).
   - Rationale: evita errores comunes de “workflow correcto pero Pages mal configurado”.

## Risks / Trade-offs

- [Rama de trigger incorrecta] → Mitigación: parametrizar/documentar rama objetivo según branch por defecto del repositorio.
- [Build falla por entorno de CI] → Mitigación: fijar versión de Node y mantener lockfile consistente.
- [Deploy bloqueado por permisos/environments] → Mitigación: validar permisos y configuración de environment en repo settings.
- [Falsa sensación de éxito sin publicar] → Mitigación: usar acciones oficiales de Pages y verificar URL final del deployment.
