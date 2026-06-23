import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import ProductCard from './ProductCard';
import { productsData } from '../data/productsData';

// Individual Scroll Animate Wrapper for cards to achieve scrub/timeline effect
function ScrollAnimateCard({ children }) {
  const cardRef = useRef(null);
  
  // Track scroll progress of this specific card
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"]
  });

  // Map progress: 0 (entering bottom of screen) to 0.75 (towards center of screen)
  const y = useTransform(scrollYProgress, [0, 0.75], [60, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  return (
    <motion.div ref={cardRef} style={{ y, opacity }} className="h-full">
      {children}
    </motion.div>
  );
}

export default function ProductGrid({ onAddToCart }) {
  const [activeTab, setActiveTab] = useState('todos');

  const tabs = [
    { id: 'todos', name: 'Todos os Utensílios' },
    { id: 'panelas', name: 'Panelas' },
    { id: 'talheres', name: 'Talheres' }
  ];

  const filteredProducts = activeTab === 'todos' 
    ? productsData 
    : productsData.filter(product => product.category === activeTab);

  return (
    <section id="colecao" className="py-20 px-6 md:px-12 max-w-7xl mx-auto space-y-12">
      {/* Section Title */}
      <div className="text-center space-y-3">
        <span className="text-xs text-terracotta font-bold uppercase tracking-[0.3em]">
          Nossas Peças de Assinatura
        </span>
        <h2 className="text-3xl md:text-5xl font-serif text-graphite font-medium">
          A Coleção de Alta Cozinha
        </h2>
        <p className="text-sm md:text-base text-graphite/60 font-light max-w-xl mx-auto leading-relaxed">
          Explore nossa seleção com curadoria de panelas esmaltadas de alta performance e talheres forjados artesanalmente.
        </p>
      </div>

      {/* Elegant Filter Tabs */}
      <div className="flex justify-center border-b border-graphite/10 pb-1 max-w-md mx-auto">
        <div className="flex gap-4 md:gap-8">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative py-3 text-xs md:text-sm font-medium uppercase tracking-widest transition-colors duration-300 ${
                  isActive ? 'text-terracotta' : 'text-graphite/50 hover:text-graphite'
                }`}
              >
                {tab.name}
                {isActive && (
                  <motion.div 
                    layoutId="activeUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-terracotta"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Products Grid with Scroll Animations linked to scroll progress */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <motion.div
              layout
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
            >
              <ScrollAnimateCard>
                <ProductCard 
                  product={product} 
                  onAddToCart={onAddToCart} 
                />
              </ScrollAnimateCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-20 text-graphite/50">
          Nenhum produto encontrado nesta categoria.
        </div>
      )}
    </section>
  );
}
