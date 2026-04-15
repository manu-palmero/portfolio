// Datos estáticos hardcodeados - idealmente irían de una fuente externa
export function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <h2 className="section-title animate-in">Sobre Mí</h2>
        <div className="about-card animate-in ">
          <div className="avatar">
            <span>MP</span>
          </div>
          <div className="about-content">
            <p>
              Hola! Soy Manu, desarrollador de Argentina con pasión por crear
              soluciones innovadoras. Me especializo en desarrollo Android con
              Kotlin, pero también trabajo con Python, Java y Shell scripting.
            </p>
            <p>
              Me gusta automatizar procesos, experimentar con nuevas tecnologías
              y contribuir a proyectos de código abierto. Siempre estoy
              aprendiendo algo nuevo.
            </p>
            <div className="about-meta">
              <span className="location">📍 Argentina</span>
              <span className="badge available">
                ✓ Disponible para trabajar
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}