import React, { useEffect } from 'react';
import Lenis from 'lenis';
import CustomCursor from '../components/CustomCursor';
import ScrollProgress from '../components/ScrollProgress';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Timeline from '../components/Timeline';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import DeploymentModal from '../components/DeploymentModal';
import { useState } from 'react';

export default function PublicPortfolio() {
  const [deployModalOpen, setDeployModalOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <div className="relative bg-[#050505] text-white min-h-screen selection:bg-mint-400 selection:text-black font-sans">
      <CustomCursor />
      <ScrollProgress />
      
      <Navbar onOpenDeployModal={() => setDeployModalOpen(true)} />
      
      <main>
        <Hero />
        <Stats />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <Services />
        <Testimonials />
        <Contact />
      </main>

      <Footer />

      <DeploymentModal
        isOpen={deployModalOpen}
        onClose={() => setDeployModalOpen(false)}
      />
    </div>
  );
}
