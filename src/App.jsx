import { useState, useEffect, useMemo } from 'react'

const PORTFOLIO_OWNER = 'manu-palmero'
const FEATURED_LIMIT = 4

const languageWeights = {
  Kotlin: 2,
  Python: 2,
  JavaScript: 1.5,
  Java: 1.5,
  Shell: 1.25
}

const projectTypeWeights = {
  product: 2,
  tool: 1.5,
  library: 1.25,
  practice: -1
}

function calculateRelevanceScore(repo) {
  const hasDescription = Boolean(repo.description?.trim())
  const languageWeight = languageWeights[repo.language] ?? 0.75
  const starsWeight = Math.min(repo.stars ?? 0, 50) * 0.05
  const forksWeight = Math.min(repo.forks ?? 0, 10) * 0.1
  const typeWeight = projectTypeWeights[repo.type] ?? 0

  const lastUpdate = repo.updatedAt ? new Date(repo.updatedAt) : null
  const now = new Date()
  const diffInDays = lastUpdate
    ? Math.max(0, Math.floor((now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24)))
    : 365

  let activityWeight = 0
  if (diffInDays <= 30) activityWeight = 2
  else if (diffInDays <= 90) activityWeight = 1
  else if (diffInDays <= 180) activityWeight = 0.5

  return Number((
    (hasDescription ? 2 : 0) +
    languageWeight +
    starsWeight +
    forksWeight +
    typeWeight +
    activityWeight
  ).toFixed(2))
}

function curateFeaturedRepos(repos) {
  return repos
    .filter((repo) => repo.owner === PORTFOLIO_OWNER && repo.fork === false)
    .map((repo) => ({ ...repo, relevanceScore: calculateRelevanceScore(repo) }))
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, FEATURED_LIMIT)
}

function formatRelativeUpdate(dateString) {
  if (!dateString) return 'Sin fecha reciente'
  const date = new Date(dateString)
  const now = new Date()
  const days = Math.max(1, Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)))

  if (days < 30) return `Actualizado hace ${days} día${days > 1 ? 's' : ''}`
  const months = Math.floor(days / 30)
  if (months < 12) return `Actualizado hace ${months} mes${months > 1 ? 'es' : ''}`
  const years = Math.floor(months / 12)
  return `Actualizado hace ${years} año${years > 1 ? 's' : ''}`
}

// Navbar Component
function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-content">
        <div className="logo">MP</div>
        <div className="nav-links">
          <button onClick={() => scrollTo('about')}>Sobre mí</button>
          <button onClick={() => scrollTo('skills')}>Skills</button>
          <button onClick={() => scrollTo('projects')}>Proyectos</button>
          <button onClick={() => scrollTo('contact')}>Contacto</button>
        </div>
      </div>
    </nav>
  )
}

// Hero Component
function Hero() {
  const [text, setText] = useState('')
  const fullText = 'Desarrollador | Creador | Apasionado por la tecnología'

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
      }
    }, 50)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      <div className="hero-content">
        <h1 className="reveal">Manu Palmero</h1>
        <p className="typing-text reveal delay-1">{text}<span className="cursor">|</span></p>
        <button className="cta-button reveal delay-2" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
          Ver Proyectos
        </button>
      </div>
    </section>
  )
}

// About Component
function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <h2 className="section-title reveal">Sobre Mí</h2>
        <div className="about-card reveal delay-1">
          <div className="avatar">
            <span>MP</span>
          </div>
          <div className="about-content">
            <p>
              Hola! Soy Manu, desarrollador de Argentina con pasión por crear soluciones 
              innovadoras. Me especializo en desarrollo Android con Kotlin, pero también 
              trabajo con Python, Java y Shell scripting.
            </p>
            <p>
              Me gusta automatizar procesos, experimentar con nuevas tecnologías y 
              contribuir a proyectos de código abierto. Siempre estoy aprendiendo algo nuevo.
            </p>
            <div className="about-meta">
              <span className="location">📍 Argentina</span>
              <span className="badge available">✓ Disponible para trabajar</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Skills Component
function Skills() {
  const skillCategories = [
    {
      title: 'Lenguajes',
      skills: ['Kotlin', 'Java', 'Python', 'Shell', 'JavaScript']
    },
    {
      title: 'Herramientas',
      skills: ['Git', 'Docker', 'VS Code', 'Android Studio', 'IntelliJ']
    },
    {
      title: 'Plataformas',
      skills: ['Android', 'Linux', 'Debian', 'GitHub Actions']
    }
  ]

  return (
    <section className="skills" id="skills">
      <div className="container">
        <h2 className="section-title reveal">Tech Stack</h2>
        <div className="skills-grid">
          {skillCategories.map((category, idx) => (
            <div key={idx} className={`skill-card reveal delay-${idx + 1}`}>
              <h3>{category.title}</h3>
              <div className="skill-tags">
                {category.skills.map((skill, i) => (
                  <span key={i} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Projects Component
function Projects() {
  const projects = [
    {
      name: 'Patch-Recovery',
      description: 'CI service that patches recovery.img of Dynamic Samsung devices to enable fastbootd.',
      language: 'Python',
      stars: 9,
      forks: 1,
      owner: 'manu-palmero',
      fork: false,
      type: 'tool',
      updatedAt: '2026-03-20',
      url: 'https://github.com/manu-palmero/Patch-Recovery'
    },
    {
      name: 'dotfiles',
      description: 'Archivos de configuración personal para mi entorno de desarrollo.',
      language: 'Shell',
      stars: 3,
      forks: 0,
      owner: 'manu-palmero',
      fork: false,
      type: 'product',
      updatedAt: '2026-04-01',
      url: 'https://github.com/manu-palmero/dotfiles'
    },
    {
      name: 'Tarea-git-programación',
      description: 'Ejercicios de práctica con Git y control de versiones.',
      language: 'Markdown',
      stars: 0,
      forks: 0,
      owner: 'manu-palmero',
      fork: false,
      type: 'practice',
      updatedAt: '2025-11-10',
      url: 'https://github.com/manu-palmero/Tarea-git-programaci-n'
    },
    {
      name: 'tarea-git',
      description: 'Repositorio de práctica para comandos básicos de Git.',
      language: 'Markdown',
      stars: 0,
      forks: 0,
      owner: 'manu-palmero',
      fork: false,
      type: 'practice',
      updatedAt: '2025-10-01',
      url: 'https://github.com/manu-palmero/tarea-git'
    },
    {
      name: 'android-kotlin-utils',
      description: 'Utilities y snippets reutilizables para proyectos Android con Kotlin.',
      language: 'Kotlin',
      stars: 12,
      forks: 2,
      owner: 'manu-palmero',
      fork: false,
      type: 'library',
      updatedAt: '2026-02-11',
      url: 'https://github.com/manu-palmero/android-kotlin-utils'
    },
    {
      name: 'linux-workflow-notes',
      description: '',
      language: 'Shell',
      stars: 1,
      forks: 0,
      owner: 'manu-palmero',
      fork: false,
      type: 'tool',
      updatedAt: '2025-07-15',
      url: 'https://github.com/manu-palmero/linux-workflow-notes'
    },
    {
      name: 'awesome-upstream-project',
      description: 'Fork de referencia técnica.',
      language: 'JavaScript',
      stars: 30,
      forks: 12,
      owner: 'manu-palmero',
      fork: true,
      type: 'library',
      updatedAt: '2026-04-07',
      url: 'https://github.com/manu-palmero/awesome-upstream-project'
    },
    {
      name: 'external-showcase',
      description: 'Repo de ejemplo de terceros',
      language: 'JavaScript',
      stars: 99,
      forks: 20,
      owner: 'other-owner',
      fork: false,
      type: 'product',
      updatedAt: '2026-04-05',
      url: 'https://github.com/other-owner/external-showcase'
    }
  ]

  const featuredProjects = useMemo(() => curateFeaturedRepos(projects), [projects])

  useEffect(() => {
    const hasInvalidRepo = featuredProjects.some(
      (project) => project.owner !== PORTFOLIO_OWNER || project.fork === true
    )

    if (hasInvalidRepo) {
      console.warn('Repositorio inválido detectado en destacados')
    }
  }, [featuredProjects])

  return (
    <section className="projects" id="projects">
      <div className="container">
        <h2 className="section-title reveal">Proyectos Destacados</h2>
        <p className="projects-note reveal delay-1">
          Solo repos propios, no forks. Ordenados por relevancia profesional.
        </p>
        <div className="projects-grid">
          {featuredProjects.map((project, idx) => (
            <a 
              key={idx} 
              href={project.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`project-card reveal delay-${idx + 1}`}
            >
              <div className="project-header">
                <h3>{project.name}</h3>
                <span className="relevance-chip">Score {project.relevanceScore}</span>
              </div>
              <p>{project.description || 'Proyecto con metadata mínima, priorizado por señales técnicas.'}</p>
              <div className="project-meta">
                <span className="language">
                  <span className="lang-dot"></span>
                  {project.language}
                </span>
                <span className="stats">
                  ⭐ {project.stars} &nbsp; 🍴 {project.forks}
                </span>
              </div>
              <div className="project-footer-meta">
                <span className={`type-chip ${project.type}`}>{project.type}</span>
                <span>{formatRelativeUpdate(project.updatedAt)}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// Stats Component
function Stats() {
  const stats = [
    { value: 20, label: 'Repositorios' },
    { value: 76, label: 'Stars' },
    { value: 3, label: 'Seguidores' }
  ]

  return (
    <section className="stats" id="stats">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className={`stat-card reveal delay-${idx + 1}`}>
              <span className="stat-value">{stat.value}+</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
        <p className="stats-note reveal delay-4">
          🎯 Miembro de <a href="https://github.com/manu-palmero?tab=achievements" target="_blank" rel="noopener noreferrer">Pull Shark</a> club
        </p>
      </div>
    </section>
  )
}

// Contact Component
function Contact() {
  const socials = [
    { name: 'GitHub', icon: '🐙', url: 'https://github.com/manu-palmero' },
    { name: 'LinkedIn', icon: '💼', url: 'https://www.linkedin.com/in/manu-palmero/' },
    { name: 'Email', icon: '✉️', url: 'mailto:manu.palmero@example.com' }
  ]

  return (
    <section className="contact" id="contact">
      <div className="container">
        <h2 className="section-title reveal">Contacto</h2>
        <p className="contact-text reveal delay-1">
          ¿Te gustaría trabajar conmigo o simplemente charlar sobre tecnología?
        </p>
        <div className="social-links reveal delay-2">
          {socials.map((social, idx) => (
            <a 
              key={idx} 
              href={social.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-button"
            >
              <span className="social-icon">{social.icon}</span>
              {social.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// Footer Component
function Footer() {
  return (
    <footer className="footer">
      <p>© 2024 Manu Palmero. Hecho con 💙 y ☕</p>
    </footer>
  )
}

// Main App
function App() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="app">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Stats />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
