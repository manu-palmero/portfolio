# Portfolio

## Deploy automático con GitHub Pages

Este proyecto publica en GitHub Pages usando GitHub Actions.

### Precondiciones

1. En el repositorio de GitHub, ir a **Settings → Pages**.
2. En **Build and deployment**, elegir **Source: GitHub Actions**.
3. Verificar que la rama principal de trabajo sea `master` (o ajustar el trigger del workflow).

### Workflow de deploy

- Archivo: `.github/workflows/deploy-pages.yml`
- Triggers soportados:
  - `push` a `master`
  - `workflow_dispatch` (manual)
- Jobs:
  - `build`: checkout, setup de Node 20, `npm ci`, `npm run build`, validación de `dist`, subida de artifact de Pages.
  - `deploy`: consume artifact y publica con `actions/deploy-pages`.

### Permisos mínimos declarados

- `contents: read`
- `pages: write`
- `id-token: write`

### Checklist de verificación

- [ ] El workflow corre automáticamente al hacer push a `master`.
- [ ] El workflow puede ejecutarse manualmente desde la pestaña **Actions**.
- [ ] El job `build` falla claramente si no se genera `dist/`.
- [ ] El job `deploy` sólo corre si `build` finaliza correctamente.
- [ ] El run expone URL final publicada en la salida del deployment.
