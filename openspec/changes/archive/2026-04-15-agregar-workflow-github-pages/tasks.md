## 1. Estructura base del workflow de Pages

- [x] 1.1 Crear workflow de GitHub Actions para Pages en `.github/workflows/` con nombre y gatillos definidos (push a rama principal + manual).
- [x] 1.2 Separar pipeline en jobs `build` y `deploy`, declarando dependencia explícita de deploy respecto de build.
- [x] 1.3 Configurar runtime de Node y ejecución de instalación/build del proyecto de forma reproducible.

## 2. Integración oficial con GitHub Pages

- [x] 2.1 Incorporar pasos oficiales para preparar Pages y publicar artefacto estático de build.
- [x] 2.2 Configurar job de deploy para consumir el artefacto de Pages y ejecutar publicación en environment de Pages.
- [x] 2.3 Verificar que la salida de build usada para deploy corresponda al directorio estático correcto del proyecto.

## 3. Seguridad operativa y controles

- [x] 3.1 Declarar permisos mínimos necesarios en el workflow (`contents: read`, `pages: write`, `id-token: write`).
- [x] 3.2 Asegurar que no existan permisos globales innecesarios ni pasos de deploy que salteen validaciones de build.
- [x] 3.3 Añadir señales claras de fallo para casos de build inválido o configuración incorrecta de Pages.

## 4. Documentación y validación del flujo

- [x] 4.1 Documentar precondiciones del repositorio para Pages (source por GitHub Actions y rama principal).
- [x] 4.2 Validar ejecución automática por push y ejecución manual por `workflow_dispatch`.
- [x] 4.3 Confirmar trazabilidad del deployment (run logs + URL final de Pages) y registrar checklist de verificación.
