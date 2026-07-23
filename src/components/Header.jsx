import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, Trash2, Plus, Minus } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import Logo from './Logo';

export default function Header({ cart, onRemoveFromCart, onUpdateQuantity, cartOpen, setCartOpen }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleWhatsappCheckout = () => {
    const phone = "5517996574430";
    let message = "Olá RP Utilidades Gourmet! Gostaria de finalizar o pedido com os seguintes itens:\n\n";
    cart.forEach(item => {
      message += `- ${item.name} (${item.quantity}x) - R$ ${(item.price * item.quantity).toFixed(2)}\n`;
    });
    message += `\n*Total: R$ ${totalPrice.toFixed(2)}*`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full z-40 bg-offwhite/95 backdrop-blur-md border-b border-graphite/5 px-6 md:px-12 py-3.5 flex items-center justify-between"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
          <Logo />
        </Link>


        {/* Floating Navigation Menu (Desktop) */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-widest uppercase">
          <NavLink 
            to="/" 
            end
            className={({ isActive }) => 
              `transition-colors duration-300 relative group py-2 ${isActive ? 'text-terracotta font-semibold' : 'text-graphite hover:text-terracotta'}`
            }
          >
            Início
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-terracotta transition-all duration-300 group-hover:w-full"></span>
          </NavLink>

          <NavLink 
            to="/catalogo" 
            className={({ isActive }) => 
              `transition-colors duration-300 relative group py-2 ${isActive ? 'text-terracotta font-semibold' : 'text-graphite hover:text-terracotta'}`
            }
          >
            Catálogo
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-terracotta transition-all duration-300 group-hover:w-full"></span>
          </NavLink>

          <a href="/#destaques" className="text-graphite hover:text-terracotta transition-colors duration-300 relative group py-2">
            Destaques
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-terracotta transition-all duration-300 group-hover:w-full"></span>
          </a>

          <a href="/#historia" className="text-graphite hover:text-terracotta transition-colors duration-300 relative group py-2">
            Nossa Arte
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-terracotta transition-all duration-300 group-hover:w-full"></span>
          </a>
        </nav>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-6">
          <button 
            onClick={() => setCartOpen(true)}
            className="relative p-2 text-graphite hover:text-terracotta transition-colors duration-300"
            aria-label="Sacola de compras"
          >
            <ShoppingBag className="w-6 h-6 stroke-[1.5]" />
            {totalItems > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-terracotta text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center"
              >
                {totalItems}
              </motion.span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-graphite hover:text-terracotta transition-colors duration-300"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[73px] left-0 w-full z-30 bg-offwhite border-b border-graphite/10 py-6 px-6 flex flex-col space-y-4 md:hidden shadow-xl"
          >
            <Link 
              to="/" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium tracking-wide text-graphite hover:text-terracotta transition-colors"
            >
              Início
            </Link>
            <Link 
              to="/catalogo" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium tracking-wide text-graphite hover:text-terracotta transition-colors"
            >
              Catálogo
            </Link>
            <a 
              href="/#destaques" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium tracking-wide text-graphite hover:text-terracotta transition-colors"
            >
              Destaques
            </a>
            <a 
              href="/#historia" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium tracking-wide text-graphite hover:text-terracotta transition-colors"
            >
              Nossa Arte
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slide-over Shopping Cart Drawer */}

      <AnimatePresence>
        {cartOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 z-50 bg-black"
            />
            {/* Drawer */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.4 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-offwhite shadow-2xl flex flex-col"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-graphite/10 flex items-center justify-between">
                <h2 className="text-xl font-semibold tracking-wider flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-terracotta" />
                  Sua Sacola
                </h2>
                <button 
                  onClick={() => setCartOpen(false)}
                  className="p-2 text-graphite hover:text-terracotta transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Drawer Body / Cart Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-graphite/60 space-y-4">
                    <ShoppingBag className="w-16 h-16 stroke-[1] text-graphite/40" />
                    <p className="font-medium text-lg">Sua sacola está vazia.</p>
                    <p className="text-sm">Explore nossa coleção e adicione peças exclusivas.</p>
                    <button 
                      onClick={() => setCartOpen(false)}
                      className="mt-4 px-6 py-2 bg-graphite text-offwhite hover:bg-terracotta transition-colors text-xs font-semibold uppercase tracking-widest"
                    >
                      Continuar Navegando
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <motion.div 
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex gap-4 border-b border-graphite/5 pb-6 last:border-0"
                    >
                      <div className="w-20 h-20 bg-offwhite-dark rounded overflow-hidden flex-shrink-0 border border-graphite/5">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-serif font-medium text-sm text-graphite line-clamp-1">{item.name}</h3>
                          <p className="text-xs text-graphite/50 capitalize mt-0.5">{item.category}</p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-graphite/10 rounded-sm">
                            <button 
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:text-terracotta transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-2.5 text-sm font-semibold">{item.quantity}</span>
                            <button 
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:text-terracotta transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          {/* Price and Remove */}
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-graphite">
                              R$ {(item.price * item.quantity).toFixed(2)}
                            </span>
                            <button 
                              onClick={() => onRemoveFromCart(item.id)}
                              className="text-graphite/40 hover:text-terracotta transition-colors"
                              aria-label="Remover item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Drawer Footer */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-graphite/10 bg-offwhite-dark space-y-4">
                  <div className="flex justify-between items-center text-graphite font-serif">
                    <span className="text-base font-semibold">Subtotal</span>
                    <span className="text-xl font-bold">R$ {totalPrice.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-graphite/60">
                    O fechamento do pedido será redirecionado para o nosso canal de atendimento exclusivo via WhatsApp.
                  </p>
                  <button 
                    onClick={handleWhatsappCheckout}
                    className="w-full py-4 bg-terracotta hover:bg-terracotta-dark text-white font-medium uppercase tracking-widest text-xs transition-all duration-300 rounded shadow-lg shadow-terracotta/20 flex items-center justify-center gap-2"
                  >
                    <span>Finalizar via WhatsApp</span>
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
