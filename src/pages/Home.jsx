import React, { useRef } from 'react';
import Hero from '../components/Hero';
import FeaturedCarousel from '../components/FeaturedCarousel';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, Sparkles, Award, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import damascusKnife from '../assets/damascus_knife_1782222745245.png';

export default function Home({ products, onAddToCart }) {
  // Scroll-Linked Animation Config for trust badges section
  const trustSectionRef = useRef(null);
  const { scrollYProgress: trustScroll } = useScroll({
    target: trustSectionRef,
    offset: ["start end", "end center"]
  });

  const trustY1 = useTransform(trustScroll, [0, 0.65], [60, 0]);
  const trustOpacity1 = useTransform(trustScroll, [0, 0.55], [0, 1]);

  const trustY2 = useTransform(trustScroll, [0.12, 0.77], [60, 0]);
  const trustOpacity2 = useTransform(trustScroll, [0.12, 0.67], [0, 1]);

  const trustY3 = useTransform(trustScroll, [0.24, 0.89], [60, 0]);
  const trustOpacity3 = useTransform(trustScroll, [0.24, 0.79], [0, 1]);

  // Scroll-Linked Animation Config for editorial "Nossa Arte" section
  const historiaSectionRef = useRef(null);
  const { scrollYProgress: historiaScroll } = useScroll({
    target: historiaSectionRef,
    offset: ["start end", "center center"]
  });

  const textX = useTransform(historiaScroll, [0, 0.85], [-60, 0]);
  const textOpacity = useTransform(historiaScroll, [0, 0.65], [0, 1]);

  const imageX = useTransform(historiaScroll, [0, 0.85], [60, 0]);
  const imageOpacity = useTransform(historiaScroll, [0, 0.65], [0, 1]);

  const testimonialY = useTransform(historiaScroll, [0.35, 0.95], [45, 0]);
  const testimonialOpacity = useTransform(historiaScroll, [0.35, 0.8], [0, 1]);

  return (
    <>
      {/* Hero Banner */}
      <Hero />

      {/* Premium Trust Badges */}
      <section ref={trustSectionRef} className="bg-graphite-dark text-white py-12 px-6 md:px-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <motion.div 
            style={{ y: trustY1, opacity: trustOpacity1 }}
            className="flex flex-col items-center space-y-3"
          >
            <ShieldCheck className="w-8 h-8 text-terracotta" />
            <h3 className="text-lg font-serif font-medium tracking-wide">Garantia Vitalícia</h3>
            <p className="text-xs text-white/60 font-light max-w-xs">
              Nossas peças em ferro fundido e aço damasco possuem garantia vitalícia contra defeitos de fabricação.
            </p>
          </motion.div>
          
          <motion.div 
            style={{ y: trustY2, opacity: trustOpacity2 }}
            className="flex flex-col items-center space-y-3"
          >
            <Sparkles className="w-8 h-8 text-terracotta" />
            <h3 className="text-lg font-serif font-medium tracking-wide">Acabamento Manual</h3>
            <p className="text-xs text-white/60 font-light max-w-xs">
              Cada panela e faca passa por polimento e afiação manual por mestres artesãos.
            </p>
          </motion.div>
          
          <motion.div 
            style={{ y: trustY3, opacity: trustOpacity3 }}
            className="flex flex-col items-center space-y-3"
          >
            <Award className="w-8 h-8 text-terracotta" />
            <h3 className="text-lg font-serif font-medium tracking-wide">Frete Seguro Premium</h3>
            <p className="text-xs text-white/60 font-light max-w-xs">
              Envio em embalagens de madeira personalizadas e com seguro total incluído.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Products Section (Infinite Carousel) */}
      <FeaturedCarousel products={products} onAddToCart={onAddToCart} />

      {/* Editorial "Nossa Arte" Section */}
      <section id="historia" ref={historiaSectionRef} className="py-24 bg-offwhite-dark px-6 md:px-12 border-b border-graphite/5 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div 
            style={{ x: textX, opacity: textOpacity }}
            className="space-y-6 md:pr-12"
          >
            <span className="text-xs text-terracotta font-bold uppercase tracking-[0.3em]">Nossa Filosofia</span>
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-graphite leading-tight">
              Forjando momentos, <br />
              eternizando receitas.
            </h2>
            <p className="text-sm md:text-base text-graphite/70 font-light leading-relaxed">
              Na RP Utilidades Gourmet, acreditamos que cozinhar não é apenas preparar alimentos, mas uma performance artística. Nascemos da paixão pela alta gastronomia e pelo design funcional de alto padrão. 
            </p>
            <p className="text-sm md:text-base text-graphite/70 font-light leading-relaxed">
              Trabalhamos exclusivamente com materiais nobres como o aço inoxidável 18/10, ferro fundido esmaltado e legítimo aço damasco. Cada utensílio é pensado para garantir ergonomia, durabilidade e beleza insuperáveis na sua cozinha.
            </p>
            
            <div className="pt-6 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-terracotta" />
                <span className="font-sans font-bold text-base text-graphite">RP Utilidades Gourmet</span>
              </div>
              
              <Link 
                to="/catalogo" 
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-rp text-white rounded-full text-xs font-semibold uppercase tracking-wider hover:opacity-95 transition-opacity duration-300 shadow-md"
              >
                <span>Explorar Nosso Catálogo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Side Image */}
          <motion.div 
            style={{ x: imageX, opacity: imageOpacity }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-lg overflow-hidden border border-graphite/10 shadow-2xl bg-white">
              <img 
                src={damascusKnife} 
                alt="Faca Damasco Premium RP Utilidades Gourmet" 
                className="w-full h-full object-cover transition-transform duration-[2000ms] hover:scale-110"
              />
            </div>
            
            {/* Floating Testimonial */}
            <motion.div 
              style={{ y: testimonialY, opacity: testimonialOpacity }}
              className="absolute -bottom-6 -left-6 bg-white p-5 rounded border border-graphite/5 shadow-xl max-w-xs hidden sm:block"
            >
              <div className="flex items-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-amber text-amber" />
                ))}
              </div>
              <p className="text-[11px] text-graphite-light font-medium italic">
                "O equilíbrio das facas e panelas da RP Utilidades Gourmet é simplesmente incrível. Ferramentas indispensáveis para quem ama cozinhar."
              </p>
              <span className="block mt-2 text-[9px] text-terracotta font-bold uppercase tracking-widest">
                — Chef Helena Rizzo
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Catalog CTA Banner */}
      <section className="py-16 px-6 md:px-12 bg-graphite-dark text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <span className="text-xs text-amber font-bold uppercase tracking-[0.3em]">Linha Completa</span>
          <h2 className="text-3xl md:text-4xl font-sans font-bold">
            Descubra Toda a Coleção RP Utilidades Gourmet
          </h2>
          <p className="text-white/70 text-sm md:text-base font-light max-w-2xl mx-auto">
            Utilize nossos filtros avançados e barra de pesquisa para encontrar a peça perfeita para a sua cozinha ou presente inesquecível.
          </p>
          <div>
            <Link 
              to="/catalogo"
              className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-rp text-white font-semibold text-xs tracking-widest uppercase rounded-full shadow-lg hover:shadow-terracotta/30 transition-all duration-300 scale-100 hover:scale-105"
            >
              <span>Acessar o Catálogo de Produtos</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
