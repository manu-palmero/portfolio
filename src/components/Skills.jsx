// Datos hardcodeados de skills - podrían venir de una API o config
export function Skills() {
  const skillCategories = [
    {
      title: "Lenguajes",
      skills: ["Kotlin", "Java", "Python", "Shell", "JavaScript"],
    },
    {
      title: "Herramientas",
      skills: ["Git", "Docker", "VS Code", "Android Studio", "IntelliJ"],
    },
    {
      title: "Plataformas",
      skills: ["Android", "Linux", "Debian", "GitHub Actions"],
    },
  ];

  return (
    <section className="skills" id="skills">
      <div className="container">
        <h2 className="section-title animate-in">Tech Stack</h2>
        <div className="skills-grid">
          {skillCategories.map((category, idx) => (
            <div key={idx} className={`skill-card animate-in delay-${idx + 1}`}>
              <h3>{category.title}</h3>
              <div className="skill-tags">
                {category.skills.map((skill, i) => (
                  <span key={i} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}