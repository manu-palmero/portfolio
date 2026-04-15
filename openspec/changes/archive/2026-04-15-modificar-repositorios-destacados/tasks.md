## 1. Reglas de selección de destacados

- [x] 1.1 Centralizar reglas de elegibilidad de repositorios destacados en una configuración explícita.
- [x] 1.2 Aplicar filtro obligatorio por criterios definidos (owner, fork y mínimos de calidad de metadata).
- [x] 1.3 Validar que repos no elegibles se excluyan sin afectar renderizado de la sección.

## 2. Ranking configurable de repositorios

- [x] 2.1 Extraer señales de relevancia (lenguaje, actividad, stars, tipo, descripción) en una estructura uniforme.
- [x] 2.2 Implementar cálculo de score basado en pesos configurables y ordenamiento descendente.
- [x] 2.3 Incorporar valores por defecto para señales faltantes y asegurar estabilidad del ranking.

## 3. Presentación y fallback de metadatos

- [x] 3.1 Ajustar la tarjeta de destacados para mostrar metadatos clave con jerarquía consistente.
- [x] 3.2 Implementar fallback visual/textual para campos opcionales ausentes (descripción, actividad u otros).
- [x] 3.3 Aplicar límite determinista de elementos mostrados tras el ordenamiento por score.

## 4. Verificación funcional del listado final

- [x] 4.1 Comprobar que los destacados resultantes cumplen reglas de elegibilidad.
- [x] 4.2 Verificar que el orden final respeta el score esperado en casos típicos y edge cases.
- [x] 4.3 Revisar consistencia visual del grid con mezcla de repos completos e incompletos en metadata.
