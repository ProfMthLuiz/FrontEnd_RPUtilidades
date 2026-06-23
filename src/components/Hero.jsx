import React from 'react';
import { motion } from 'framer-motion';
import heroBg from '../assets/hero_bg_1782222677289.png';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const scrollToCollection = (e) => {
    e.preventDefault();
    const target = document.querySelector('#colecao');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative h-[90vh] md:h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with elegant overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Cozinha de Luxo L'Artisan" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-graphite-dark/45 backdrop-brightness-[0.85]" />
      </div>

      {/* Hero Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-6 max-w-4xl flex flex-col items-center"
      >
        <motion.span 
          variants={itemVariants}
          className="text-white/80 uppercase tracking-[0.25em] text-xs md:text-sm font-semibold mb-4"
        >
          Coleção Exclusiva
        </motion.span>
        
        <motion.h1 
          variants={itemVariants}
          className="text-4xl md:text-6xl lg:text-7xl font-serif text-white font-normal leading-[1.15] mb-6 tracking-wide drop-shadow-sm"
        >
          A arte de cozinhar <br />
          <span className="italic font-light text-white/95">com elegância</span>
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-base md:text-lg text-white/85 font-light tracking-wide max-w-xl mb-10 leading-relaxed"
        >
          Utensílios de alto padrão que transformam ingredientes em obras-primas. Sinta a excelência do ferro fundido e do aço damasco em cada toque.
        </motion.p>

        <motion.div variants={itemVariants}>
          <a 
            href="#colecao"
            onClick={scrollToCollection}
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-terracotta hover:bg-terracotta-dark text-white font-medium uppercase tracking-[0.2em] text-xs transition-all duration-300 rounded shadow-2xl shadow-terracotta/30 overflow-hidden"
          >
            {/* Hover reflection effect */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
            Ver Coleção
          </a>
        </motion.div>
      </motion.div>

      {/* Bottom fade line */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-offwhite to-transparent pointer-events-none z-10" />
    </section>
  );
}
