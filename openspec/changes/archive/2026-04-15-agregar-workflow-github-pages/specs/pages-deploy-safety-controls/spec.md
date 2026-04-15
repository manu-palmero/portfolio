## ADDED Requirements

### Requirement: Permisos mínimos para workflow de deployment
El workflow MUST declarar permisos mínimos requeridos para build y deploy a GitHub Pages.

#### Scenario: Ejecución con permisos válidos
- **WHEN** corre el workflow de despliegue
- **THEN** el token del workflow dispone únicamente de permisos necesarios para lectura de contenido y publicación en Pages

#### Scenario: Prevención de sobrepermisos
- **WHEN** se revisa la configuración del workflow
- **THEN** no existen permisos globales innecesarios para el pipeline de deployment

### Requirement: Controles operativos y trazabilidad
El proceso de deploy SHALL exponer trazabilidad de ejecución y fallar explícitamente cuando el build o la configuración de Pages no sean válidos.

#### Scenario: Falla de build
- **WHEN** el build del sitio falla en CI
- **THEN** el job de deploy no se ejecuta y el workflow reporta estado fallido

#### Scenario: Configuración de Pages incorrecta
- **WHEN** el repositorio no está configurado para publicar mediante GitHub Actions
- **THEN** el proceso de deployment falla con señal visible para corrección operativa
