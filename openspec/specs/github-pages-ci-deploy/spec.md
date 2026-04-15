# github-pages-ci-deploy Specification

## Purpose
TBD - created by archiving change agregar-workflow-github-pages. Update Purpose after archive.
## Requirements
### Requirement: Pipeline automático de build y deploy a GitHub Pages
El repositorio SHALL ejecutar un workflow de GitHub Actions que construya el sitio y lo despliegue en GitHub Pages usando jobs separados para build y deploy.

#### Scenario: Deploy automático por cambio en rama principal
- **WHEN** se hace push a la rama principal configurada para despliegue
- **THEN** el workflow ejecuta build, publica artefacto de Pages y realiza deploy exitoso

#### Scenario: Deploy manual bajo demanda
- **WHEN** un mantenedor dispara el workflow manualmente
- **THEN** el pipeline corre el mismo flujo build+deploy con los mismos controles que en ejecución automática

### Requirement: Uso de mecanismo oficial de Pages
El workflow MUST usar el mecanismo oficial de GitHub Pages para empaquetado y publicación del artefacto estático.

#### Scenario: Empaquetado de build
- **WHEN** finaliza el build del frontend
- **THEN** el artefacto generado es cargado mediante el paso oficial de Pages

#### Scenario: Publicación del artefacto
- **WHEN** el job de deploy inicia con artefacto válido
- **THEN** la publicación se realiza mediante el paso oficial de deployment de Pages

