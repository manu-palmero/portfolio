import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Stats } from './components/Stats';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

// 1. Importás el componente Wallpaper
import { Wallpaper } from './components/Wallpaper';

export default function App() {
  return (
    <>
      {/* 2. Lo ponés al principio del fragmento/contenedor principal */}
      <Wallpaper />
      
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Stats />
      <Contact />
      
      {/* Botón para volver al principio */}
      <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '60px' }}>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="social-button"
          style={{ cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.95rem', color: 'var(--text-primary)' }}
        >
          ↑ Volver al principio
        </button>
      </div>

      <Footer />
    </>
  );
}
