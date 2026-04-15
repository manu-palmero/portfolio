import { useState, useEffect } from "react";

export function Navbar() {
  // Estado para detectar scroll y cambiar estilos del navbar
  const [scrolled, setScrolled] = useState(false);
  // Estado del menú móvil (abierto/cerrado)
  const [menuOpen, setMenuOpen] = useState(false);

  // Escucha scroll para agregar clase "scrolled" al navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    // Agrega clase .menu-open al body para evitar scroll mientras el menú está activo
    if (menuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  }, [menuOpen]);

  // Navega a la sección y cierra el menú móvil si está abierto
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  // Toggle del menú móvil
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-content">
          <div className="logo">MP</div>
          <div className="nav-links">
            <button onClick={() => scrollTo("about")}>Sobre mí</button>
            <button onClick={() => scrollTo("skills")}>Skills</button>
            <button onClick={() => scrollTo("projects")}>Proyectos</button>
            <button onClick={() => scrollTo("contact")}>Contacto</button>
          </div>
          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
      
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <button onClick={() => scrollTo("about")}>Sobre mí</button>
        <button onClick={() => scrollTo("skills")}>Skills</button>
        <button onClick={() => scrollTo("projects")}>Proyectos</button>
        <button onClick={() => scrollTo("contact")}>Contacto</button>
      </div>
    </>
  );
}