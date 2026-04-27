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
      <Footer />
    </>
  );
}
