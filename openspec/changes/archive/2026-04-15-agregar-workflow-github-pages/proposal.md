## Why

Actualmente el deploy del portfolio depende de pasos manuales, lo que introduce errores y retrasa la publicación de cambios. Agregar un workflow de GitHub Pages permite automatizar build + deploy en cada actualización relevante y asegurar una entrega consistente.

## What Changes

- Incorporar un workflow de GitHub Actions para construir y publicar el sitio en GitHub Pages.
- Definir gatillos de ejecución (push a rama principal y/o ejecución manual) con permisos mínimos necesarios.
- Configurar artefactos de build y job de deployment usando mecanismos oficiales de Pages.
- Documentar requisitos de configuración del repositorio para que el deploy sea reproducible.

## Capabilities

### New Capabilities
- `github-pages-ci-deploy`: Pipeline CI/CD para generar y publicar automáticamente el portfolio en GitHub Pages.
- `pages-deploy-safety-controls`: Reglas operativas para evitar despliegues inválidos y mejorar trazabilidad del proceso.

### Modified Capabilities
- Ninguna.

## Impact

- Afecta configuración de CI en `.github/workflows/`.
- Impacta proceso de entrega y operación del frontend estático.
- No cambia APIs funcionales del portfolio; sí cambia el mecanismo de publicación.
