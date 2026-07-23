import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import WhatsappButton from './components/WhatsappButton';
import Home from './pages/Home';
import CatalogPage from './pages/CatalogPage';
import Logo from './components/Logo';
import { productsData } from './data/productsData';


// Helper component to handle scrolling when navigating between routes or clicking anchor hashes
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

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
    <div className="min-h-screen bg-offwhite text-graphite overflow-x-hidden flex flex-col justify-between">
      <ScrollToTop />

      {/* Header and Cart Drawer */}
      <Header 
        cart={cart} 
        onRemoveFromCart={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
      />

      {/* Main Routes */}
      <main className="flex-1">
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                products={productsData} 
                onAddToCart={handleAddToCart} 
              />
            } 
          />
          <Route 
            path="/catalogo" 
            element={
              <CatalogPage 
                products={productsData} 
                onAddToCart={handleAddToCart} 
              />
            } 
          />
        </Routes>
      </main>

      {/* Elegant Global Footer */}
      <footer className="bg-graphite text-white pt-16 pb-10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-white/10">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <Logo light={true} />
            <p className="text-xs text-white/60 font-light leading-relaxed">
              Utensílios gastronômicos de altíssimo padrão. A união perfeita entre o design funcional moderno e a máxima durabilidade para a sua cozinha.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-amber">Navegação</h4>
            <ul className="space-y-2 text-xs text-white/60 font-light">
              <li><a href="/" className="hover:text-white transition-colors duration-300">Início</a></li>
              <li><a href="/catalogo" className="hover:text-white transition-colors duration-300">Catálogo</a></li>
              <li><a href="/#destaques" className="hover:text-white transition-colors duration-300">Produtos em Destaque</a></li>
              <li><a href="/#historia" className="hover:text-white transition-colors duration-300">Nossa Arte</a></li>
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-amber">Atendimento</h4>
            <ul className="space-y-2 text-xs text-white/60 font-light">
              <li>Alameda Lorena, 1420 - Jardins, SP</li>
              <li>contato@rputilidadesgourmet.com.br</li>
              <li>+55 (17) 99657-4430</li>
              <li>Segunda a Sábado, 10h às 19h</li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-amber">Assine a Gazette</h4>
            <p className="text-xs text-white/60 font-light">
              Receba convites para lançamentos exclusivos e ofertas para sua cozinha.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex">
              <input 
                type="email" 
                placeholder="Seu e-mail" 
                className="bg-white/10 border border-white/20 px-3 py-2 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-amber flex-1 rounded-l-sm"
              />
              <button 
                type="submit"
                className="bg-gradient-rp hover:opacity-90 text-white px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-r-sm transition-opacity duration-300"
              >
                Ingressar
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom copyright */}
        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] text-white/40 font-light">
          <p>© {new Date().getFullYear()} RP Utilidades Gourmet. Todos os direitos reservados.</p>
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
