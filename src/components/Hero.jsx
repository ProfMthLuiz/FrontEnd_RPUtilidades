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

  return (
    <section id="hero" className="relative h-[90vh] md:h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with elegant overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Cozinha RP Utilidades Gourmet"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-graphite-dark/50 backdrop-brightness-[0.85]" />
      </div>

      {/* Hero Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-6 max-w-4xl flex flex-col items-center"
      >

        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl lg:text-7xl font-sans text-white font-bold leading-[1.15] mb-6 tracking-tight drop-shadow-md"
        >
          A arte de cozinhar <br />
          <span className="italic font-light text-gradient-rp">com máxima excelência</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-base md:text-lg text-white/90 font-light tracking-wide max-w-xl mb-10 leading-relaxed"
        >
          Utensílios gastronômicos de alto padrão que transformam ingredientes em obras-primas. Sinta a performance do ferro fundido, aço inox e cerâmica.
        </motion.p>

        <motion.div variants={itemVariants}>
          <a
            href="#destaques"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#destaques')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-rp text-white font-semibold uppercase tracking-[0.2em] text-xs transition-all duration-300 rounded-full shadow-2xl shadow-terracotta/30 overflow-hidden hover:scale-105"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
            Conhecer Produtos
          </a>
        </motion.div>
      </motion.div>

      {/* Bottom fade line */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-offwhite to-transparent pointer-events-none z-10" />
    </section>
  );
}
