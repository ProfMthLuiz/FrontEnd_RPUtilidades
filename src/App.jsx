import React, { useState, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import WhatsappButton from './components/WhatsappButton';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, Sparkles, Award, Star } from 'lucide-react';
import damascusKnife from './assets/damascus_knife_1782222745245.png';

export default function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  // 1. Scroll-Linked Animation Config for trust badges section
  const trustSectionRef = useRef(null);
  const { scrollYProgress: trustScroll } = useScroll({
    target: trustSectionRef,
    offset: ["start end", "end center"]
  });

  // Staggered Y and Opacity progress linked directly to scroll progress
  const trustY1 = useTransform(trustScroll, [0, 0.65], [60, 0]);
  const trustOpacity1 = useTransform(trustScroll, [0, 0.55], [0, 1]);

  const trustY2 = useTransform(trustScroll, [0.12, 0.77], [60, 0]);
  const trustOpacity2 = useTransform(trustScroll, [0.12, 0.67], [0, 1]);

  const trustY3 = useTransform(trustScroll, [0.24, 0.89], [60, 0]);
  const trustOpacity3 = useTransform(trustScroll, [0.24, 0.79], [0, 1]);


  // 2. Scroll-Linked Animation Config for editorial "Nossa Arte" section
  const historiaSectionRef = useRef(null);
  const { scrollYProgress: historiaScroll } = useScroll({
    target: historiaSectionRef,
    offset: ["start end", "center center"]
  });

  // Slide-in and fade configurations mapped 1-to-1 with scroll position
  const textX = useTransform(historiaScroll, [0, 0.85], [-60, 0]);
  const textOpacity = useTransform(historiaScroll, [0, 0.65], [0, 1]);

  const imageX = useTransform(historiaScroll, [0, 0.85], [60, 0]);
  const imageOpacity = useTransform(historiaScroll, [0, 0.65], [0, 1]);

  const testimonialY = useTransform(historiaScroll, [0.35, 0.95], [45, 0]);
  const testimonialOpacity = useTransform(historiaScroll, [0.35, 0.8], [0, 1]);


  // Cart logic
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setCartOpen(true); // Open drawer on addition
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const handleUpdateQuantity = (productId, quantity) => {
    if (quantity <= 0) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-offwhite text-graphite overflow-x-hidden">
      {/* Header and Cart Drawer */}
      <Header 
        cart={cart} 
        onRemoveFromCart={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
      />

      {/* Hero Section */}
      <Hero />

      {/* Premium Trust Badges - Linked to Scroll Progress */}
      <section ref={trustSectionRef} className="bg-graphite-dark text-white py-12 px-6 md:px-12">
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

      {/* Main Product Showcase Section */}
      <ProductGrid onAddToCart={handleAddToCart} />

      {/* Editorial "Nossa Arte" Section - Linked to Scroll Progress */}
      <section id="historia" ref={historiaSectionRef} className="py-24 bg-offwhite-dark px-6 md:px-12 border-t border-b border-graphite/5 overflow-hidden">
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
              Na L'Artisan, acreditamos que cozinhar não é apenas preparar alimentos, mas uma performance artística. Nascemos da paixão pela metalurgia clássica e pelo design minimalista. 
            </p>
            <p className="text-sm md:text-base text-graphite/70 font-light leading-relaxed">
              Trabalhamos exclusivamente com ligas nobres como o aço inoxidável 18/10 e o legítimo aço damasco de 67 camadas. Nossos cabos em madeiras selecionadas são selados manualmente para garantir ergonomia, durabilidade e beleza insuperáveis.
            </p>
            
            {/* Signature Block */}
            <div className="pt-6 flex items-center gap-4">
              <div className="w-12 h-[1px] bg-terracotta" />
              <span className="font-serif italic text-lg text-graphite-light">Mestre Cuteleiro & Fundidor, L'Artisan</span>
            </div>
          </motion.div>

          {/* Side Image with Zoom & Floating Badges */}
          <motion.div 
            style={{ x: imageX, opacity: imageOpacity }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-lg overflow-hidden border border-graphite/10 shadow-2xl bg-white">
              <img 
                src={damascusKnife} 
                alt="Faca Damasco Premium L'Artisan" 
                className="w-full h-full object-cover transition-transform duration-[2000ms] hover:scale-110"
              />
            </div>
            {/* Floating details badge */}
            <motion.div 
              style={{ y: testimonialY, opacity: testimonialOpacity }}
              className="absolute -bottom-6 -left-6 bg-white p-5 rounded border border-graphite/5 shadow-xl max-w-xs hidden sm:block"
            >
              <div className="flex items-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-terracotta text-terracotta" />
                ))}
              </div>
              <p className="text-[11px] text-graphite-light font-medium italic">
                "O equilíbrio da faca damasco L'Artisan é simplesmente divino. O corte desliza perfeitamente sobre qualquer ingrediente."
              </p>
              <span className="block mt-2 text-[9px] text-terracotta font-bold uppercase tracking-widest">
                — Chef Helena Rizzo
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Elegant Premium Footer */}
      <footer className="bg-graphite text-white pt-20 pb-10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-white/10">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-semibold tracking-wider text-white">L'Artisan</h3>
            <p className="text-xs text-white/50 font-light leading-relaxed">
              Utensílios culinários de altíssimo padrão. A união perfeita entre o design minimalista contemporâneo e o artesanato clássico.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-terracotta">Navegação</h4>
            <ul className="space-y-2 text-xs text-white/60 font-light">
              <li><a href="#hero" className="hover:text-white transition-colors duration-300">Início</a></li>
              <li><a href="#colecao" className="hover:text-white transition-colors duration-300">Coleções</a></li>
              <li><a href="#historia" className="hover:text-white transition-colors duration-300">Nossa Arte</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Termos & Garantia</a></li>
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-terracotta">Atendimento</h4>
            <ul className="space-y-2 text-xs text-white/60 font-light">
              <li>Alameda Lorena, 1420 - Jardins, SP</li>
              <li>contato@lartisan.com.br</li>
              <li>+55 (11) 99999-9999</li>
              <li>Segunda a Sábado, 10h às 19h</li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-terracotta">Assine a Gazette</h4>
            <p className="text-xs text-white/50 font-light">
              Receba convites para lançamentos privados e dicas exclusivas de gastronomia.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex">
              <input 
                type="email" 
                placeholder="Seu e-mail premium" 
                className="bg-white/5 border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-terracotta flex-1 rounded-l-sm"
              />
              <button 
                type="submit"
                className="bg-terracotta hover:bg-terracotta-dark text-white px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-r-sm transition-colors duration-300"
              >
                Ingressar
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom copyright */}
        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] text-white/40 font-light">
          <p>© {new Date().getFullYear()} L'Artisan. Todos os direitos reservados.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-white transition-colors">Políticas de Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos de Serviço</a>
          </div>
        </div>
      </footer>

      {/* Floating Whatsapp Button */}
      <WhatsappButton />
    </div>
  );
}
