// Links a redes sociales hardcodeados
export function Contact() {
  const socials = [
    { name: "GitHub", icon: "🐙", url: "https://github.com/manu-palmero" },
    {
      name: "LinkedIn",
      icon: "💼",
      url: "https://www.linkedin.com/in/manu-palmero/",
    },
    { name: "Email", icon: "✉️", url: "mailto:manu.palmero@example.com" },
  ];

  return (
    <section className="contact" id="contact">
      <div className="container">
        <h2 className="section-title animate-in">Contacto</h2>
        <p className="contact-text animate-in ">
          ¿Te gustaría trabajar conmigo o simplemente charlar sobre tecnología?
        </p>
        <div className="social-links animate-in ">
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
  );
}