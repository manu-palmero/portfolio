// Proyectos hardcodeados - idealmente obtener de GitHub API
export function Projects() {
  const projects = [
    {
      name: "Patch-Recovery",
      description:
        "CI service that patches recovery.img of Dynamic Samsung devices to enable fastbootd.",
      language: "Python",
      stars: 0,
      forks: 1,
      url: "https://github.com/manu-palmero/Patch-Recovery",
    },
    {
      name: "dotfiles",
      description:
        "Archivos de configuración personal para mi entorno de desarrollo.",
      language: "Shell",
      stars: 0,
      forks: 0,
      url: "https://github.com/manu-palmero/dotfiles",
    },
    {
      name: "Tarea-git-programación",
      description: "Ejercicios de práctica con Git y control de versiones.",
      language: "Markdown",
      stars: 0,
      forks: 0,
      url: "https://github.com/manu-palmero/Tarea-git-programaci-n",
    },
    {
      name: "tarea-git",
      description: "Repositorio de práctica para comandos básicos de Git.",
      language: "Markdown",
      stars: 0,
      forks: 0,
      url: "https://github.com/manu-palmero/tarea-git",
    },
    {
      name: "tareaGitRamas",
      description: "Ejercicios de trabajo con ramas en Git.",
      language: "Markdown",
      stars: 0,
      forks: 0,
      url: "https://github.com/manu-palmero/tareaGitRamas",
    },
  ];

  return (
    <section className="projects" id="projects">
      <div className="container">
        <h2 className="section-title animate-in">Proyectos</h2>
        <div className="projects-grid">
          {projects.map((project, idx) => (
            <a
              key={idx}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`project-card animate-in delay-${idx + 1}`}
            >
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <div className="project-meta">
                <span className="language">
                  <span className="lang-dot"></span>
                  {project.language}
                </span>
                <span className="stats">
                  ⭐ {project.stars} &nbsp; 🍴 {project.forks}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}