import { useState, useEffect } from "react";

export function Hero() {
  // Texto que se va escribiendo carácter por carácter (efecto typewriter)
  const [text, setText] = useState("");
  const fullText = "Desarrollador | Creador | Apasionado por la tecnología";

  // Efecto typewriter: agrega un carácter cada 25ms hasta completar el texto
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 25);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      <div className="hero-content">
        <h1 className="animate-in">Manuel Palmero</h1>
        <p className="typing-text animate-in ">
          {text}
          <span className="cursor">|</span>
        </p>
        <button
          className="cta-button animate-in "
          onClick={() =>
            document
              .getElementById("projects")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Ver Proyectos
        </button>
      </div>
    </section>
  );
}