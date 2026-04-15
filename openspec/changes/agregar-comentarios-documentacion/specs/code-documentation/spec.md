## ADDED Requirements

### Requirement: Documentación de hooks
Cada componente que use useState o useEffect SHALL tener un comentario corto explicando el propósito del hook.

#### Scenario: useState documentado
- **WHEN** un componente usa useState
- **THEN** existe un comentario arriba del hook explicando qué estado maneja

#### Scenario: useEffect documentado
- **WHEN** un componente usa useEffect
- **THEN** existe un comentario explicando el side effect y cuándo se ejecuta

### Requirement: Funciones de navegación documentadas
Las funciones que realizan scroll o navegación SHALL incluir un comentario breve.

#### Scenario: scrollTo documentado
- **WHEN** existe función scrollTo en Navbar
- **THEN** tiene comentario indicando hacia dónde navega

### Requirement: Datos hardcodeados documentados
Los arrays de datos (proyectos, social links, skills) SHALL incluir un comentario indicando su naturaleza.

#### Scenario: Projects array tiene comentario
- **WHEN** se define el array de proyectos
- **THEN** tiene un comentario indicando que son datos estáticos/hardcodeados

### Requirement: Estilo consistente
Los comentarios SHALL seguir el estilo del proyecto: español, tono seco/sarcástico ocasional, máximo 2 líneas.

#### Scenario: Comentario con estilo apropiado
- **WHEN** se agrega un comentario
- **THEN** está en español y tiene tono consistente con el proyecto