import { useState, useEffect } from 'react'

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
    }, 25)
    return () => clearInterval(timer)
  }, [])
  return (
    // TODO: Cambiar cursor por uno en forma de I, o como el de la consola de comandos
    <section className="hero" id="hero">
      <div className="hero-bg">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      <div className="hero-content">
        <h1 className="animate-in">Manuel Palmero</h1>
        <p className="typing-text animate-in delay-1">{text}<span className="cursor">|</span></p>
        <button className="cta-button animate-in delay-2" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
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
        <h2 className="section-title animate-in">Sobre Mí</h2>
        <div className="about-card animate-in delay-1">
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
        <h2 className="section-title animate-in">Tech Stack</h2>
        <div className="skills-grid">
          {skillCategories.map((category, idx) => (
            <div key={idx} className={`skill-card animate-in delay-${idx + 1}`}>
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
      stars: 0,
      forks: 1,
      url: 'https://github.com/manu-palmero/Patch-Recovery'
    },
    {
      name: 'dotfiles',
      description: 'Archivos de configuración personal para mi entorno de desarrollo.',
      language: 'Shell',
      stars: 0,
      forks: 0,
      url: 'https://github.com/manu-palmero/dotfiles'
    },
    {
      name: 'Tarea-git-programación',
      description: 'Ejercicios de práctica con Git y control de versiones.',
      language: 'Markdown',
      stars: 0,
      forks: 0,
      url: 'https://github.com/manu-palmero/Tarea-git-programaci-n'
    },
    {
      name: 'tarea-git',
      description: 'Repositorio de práctica para comandos básicos de Git.',
      language: 'Markdown',
      stars: 0,
      forks: 0,
      url: 'https://github.com/manu-palmero/tarea-git'
    },
    {
      name: 'tareaGitRamas',
      description: 'Ejercicios de trabajo con ramas en Git.',
      language: 'Markdown',
      stars: 0,
      forks: 0,
      url: 'https://github.com/manu-palmero/tareaGitRamas'
    }
  ]

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
            <div key={idx} className={`stat-card animate-in delay-${idx + 1}`}>
              <span className="stat-value">{stat.value}+</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
        <p className="stats-note animate-in delay-4">
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
        <h2 className="section-title animate-in">Contacto</h2>
        <p className="contact-text animate-in delay-1">
          ¿Te gustaría trabajar conmigo o simplemente charlar sobre tecnología?
        </p>
        <div className="social-links animate-in delay-2">
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
      <p>© 2026 Manuel Palmero.</p>
    </footer>
  )
}

// Main App
function App() {
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
