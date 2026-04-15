// Stats hardcodeados - podrían venir de GitHub API
export function Stats() {
  const stats = [
    { value: 20, label: "Repositorios" },
    { value: 76, label: "Stars" },
    { value: 3, label: "Seguidores" },
  ];

  return (
    <section className="stats" id="stats">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className={`stat-card animate-in delay-${idx + 1}`}>
              <span className="stat-value">{stat.value}+</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
        <p className="stats-note animate-in ">
          🎯 Miembro de{" "}
          <a
            href="https://github.com/manu-palmero?tab=achievements"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pull Shark
          </a>{" "}
          club
        </p>
      </div>
    </section>
  );
}