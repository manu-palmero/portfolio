## ADDED Requirements

### Requirement: Component modularization
El proyecto SHALL separar cada componente UI en su propio archivo bajo `src/components/` para mejorar mantenibilidad y testabilidad.

#### Scenario: Component files exist
- **WHEN** se listan los archivos en `src/components/`
- **THEN** existen archivos individuales: Navbar.jsx, Hero.jsx, About.jsx, Skills.jsx, Projects.jsx, Stats.jsx, Contact.jsx, Footer.jsx

### Requirement: Export structure
Cada componente SHALL ser exportado como export named para permitir imports selectivos.

#### Scenario: Named exports work
- **WHEN** se importa un componente desde App.jsx
- **THEN** el import usa syntax `import { Navbar } from './components/Navbar'`

### Requirement: App composition
El componente principal SHALL importar y renderizar todos los componentes desde sus archivos separados.

#### Scenario: App renders all components
- **WHEN** se ejecuta la aplicación
- **THEN** todos los componentes (Navbar, Hero, About, Skills, Projects, Stats, Contact, Footer) se renderizan correctamente