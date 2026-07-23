import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

export default function FeaturedCarousel({ products, onAddToCart }) {
  const [isHovered, setIsHovered] = useState(false);

  // Take top 10 products for featured section
  const featuredProducts = products.slice(0, 10);

  // Duplicate items for a seamless 360 infinite loop
  const duplicatedProducts = [...featuredProducts, ...featuredProducts];

  return (
    <section id="destaques" className="py-12 md:py-14 bg-offwhite relative overflow-hidden border-b border-graphite/5">
      {/* Background Decorative Accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-terracotta/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-terracotta text-xs font-semibold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Seleção Exclusiva</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-graphite tracking-tight">
              Produtos em Destaque
            </h2>
            <p className="text-graphite/70 text-xs md:text-sm font-light max-w-xl">
              Peças artesanais e utilitários de alto desempenho refinados para enriquecer suas experiências gastronômicas.
            </p>
          </div>

          {/* Catalog Link */}
          <div className="self-start md:self-auto">
            <Link 
              to="/catalogo" 
              className="inline-flex items-center space-x-2 text-xs font-semibold tracking-wider text-graphite hover:text-terracotta transition-colors duration-300 group bg-white border border-graphite/10 px-4 py-2 rounded-full shadow-sm hover:border-terracotta/30"
            >
              <span>Ver Catálogo</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Infinite Autoplay Marquee Track Container - Parent div controls hover pause */}
      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-full overflow-hidden relative py-2 select-none"
      >
        {/* Soft edge gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-offwhite to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-offwhite to-transparent z-10 pointer-events-none" />

        {/* Continuous Autoplay Track */}
        <div
          className="flex space-x-5 w-max"
          style={{
            animation: 'marquee 35s linear infinite',
            animationPlayState: isHovered ? 'paused' : 'running',
          }}
        >
          {duplicatedProducts.map((product, index) => (
            <div 
              key={`${product.id}-${index}`}
              className="w-[250px] sm:w-[275px] md:w-[290px] flex-none"
            >
              <ProductCard product={product} onAddToCart={onAddToCart} />
            </div>
          ))}
        </div>
      </div>

      {/* Inline CSS animation keyframes for infinite marquee */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
