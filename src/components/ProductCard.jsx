import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

export default function ProductCard({ product, onAddToCart }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    setIsSmallScreen(mediaQuery.matches);

    const handleMediaChange = (e) => {
      setIsSmallScreen(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  const shouldShowBag = isSmallScreen || isHovered;

  // Motion values to track relative mouse position on the card [0, 1]
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Transform mouse values into 3D rotations (max 8 degrees tilt)
  const rotateX = useTransform(mouseY, [0, 1], [8, -8]);
  const rotateY = useTransform(mouseX, [0, 1], [-8, 8]);

  const handleMouseMove = (e) => {
    if (product.category !== 'panelas' || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate cursor position relative to the card
    const xCoord = e.clientX - rect.left;
    const yCoord = e.clientY - rect.top;
    
    // Normalize coordinates to range [0, 1]
    const relativeX = xCoord / width;
    const relativeY = yCoord / height;
    
    mouseX.set(relativeX);
    mouseY.set(relativeY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (product.category === 'panelas') {
      // Smoothly reset tilt back to center
      mouseX.set(0.5);
      mouseY.set(0.5);
    }
  };

  const handleWhatsappBuy = (e) => {
    e.stopPropagation();
    const phone = "5517996574430";
    const text = `Olá RP Utilidades Gourmet! Gostaria de comprar o produto "${product.name}" no valor de R$ ${product.price.toFixed(2)}.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  // Check categories for targeted animations
  const isPanela = product.category === 'panelas';
  const isTalher = product.category === 'talheres';

  // 1. Scroll Entrance: spring impact effect (bounce leve) for heavy items, smooth spring for precision items
  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: isPanela
        ? { type: "spring", stiffness: 90, damping: 10, mass: 1.2 } // Heavier impact spring
        : { type: "spring", stiffness: 60, damping: 15 } // Standard smooth spring
    }
  };

  // Image Hover: zoom + brightness glow for panelas, float-up for talheres
  const imageVariants = {
    initial: { y: 0, scale: 1, filter: "brightness(1)" },
    hover: { 
      y: isTalher ? -8 : 0, 
      scale: isPanela ? 1.06 : 1, 
      filter: isPanela ? "brightness(1.05) contrast(1.02)" : "brightness(1)",
      transition: { duration: 0.45, ease: "easeOut" }
    }
  };

  // Inline styles for 3D tilt
  const cardStyle = isPanela 
    ? { rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }
    : {};

  return (
    <motion.div 
      ref={cardRef}
      variants={cardVariants}
      style={cardStyle}
      whileHover="hover"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group bg-white border border-graphite/5 rounded-lg overflow-hidden flex flex-col justify-between hover:shadow-2xl hover:border-terracotta/20 transition-all duration-500 relative"
    >
      {/* Product Image Area */}
      <div className="relative aspect-square overflow-hidden bg-offwhite-dark border-b border-graphite/5" style={{ transformStyle: "preserve-3d" }}>
        <motion.img 
          src={product.image} 
          alt={product.name} 
          variants={imageVariants}
          initial="initial"
          className="w-full h-full object-cover"
        />
        
        {/* Badges Overlay (Slightly pops out in 3D for panelas) */}
        <div 
          className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 max-w-[85%] transition-transform duration-500 ease-out group-hover:translate-z-[15px]"
          style={{ transform: isHovered && isPanela ? "translateZ(15px)" : "translateZ(0px)" }}
        >
          {product.badges.map((badge, index) => (
            <span 
              key={index} 
              className="px-2.5 py-0.5 bg-graphite/85 backdrop-blur-sm text-white text-[9px] font-semibold uppercase tracking-wider rounded-sm shadow-sm"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Product Info Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <span className="text-[10px] text-terracotta font-bold uppercase tracking-widest block">
            {product.category}
          </span>
          
          {/* Title with expanding underline on hover (Talheres) */}
          <div className="relative inline-block w-full">
            <h3 className="font-serif font-medium text-base text-graphite line-clamp-1 group-hover:text-terracotta transition-colors duration-300 pb-1">
              {product.name}
            </h3>
            {isTalher && (
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: isHovered ? "100%" : 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1.5px] bg-terracotta"
              />
            )}
          </div>
          
          <p className="text-xs text-graphite/60 font-light line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pricing and Action Area */}
        <div className="mt-5 pt-4 border-t border-graphite/5 flex flex-col gap-3">
          {/* 3. Price shifts position and color elegantly on hover */}
          <motion.div 
            layout
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{ y: isHovered ? -3 : 0 }}
            className="flex items-center justify-between"
          >
            <span className="text-[10px] text-graphite/40 uppercase tracking-wider font-semibold">Valor</span>
            <span className={`text-lg font-bold font-serif transition-all duration-300 ${isHovered ? 'text-terracotta scale-105' : 'text-graphite'}`}>
              R$ {product.price.toFixed(2)}
            </span>
          </motion.div>

          {/* Buttons Area utilizing Framer Motion's layout prop for fluid size changes */}
          <motion.div layout className="flex gap-1.5 sm:gap-2 w-full">
            {/* Main WhatsApp CTA */}
            <motion.button 
              layout
              onClick={handleWhatsappBuy}
              className="flex-1 py-3 bg-terracotta hover:bg-terracotta-dark text-white font-medium text-[10px] uppercase tracking-wider transition-all duration-300 rounded shadow-md shadow-terracotta/10 flex items-center justify-center gap-1.5 min-w-0"
            >
              <svg className="w-3.5 h-3.5 fill-current flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.45 5.436-.003 9.851-4.427 9.855-9.87.001-2.637-1.024-5.117-2.884-6.979C16.38 1.893 13.9 .87 11.258.87c-5.44 0-9.858 4.418-9.863 9.862-.002 1.768.471 3.493 1.371 5.011L1.69 22.046l6.452-1.692-.495-.2zM17.47 14.397c-.3-.149-1.777-.878-2.05-.978-.272-.098-.47-.149-.669.149-.198.299-.769.978-.942 1.177-.173.199-.347.224-.648.075-.301-.15-1.27-.468-2.42-1.493-.895-.799-1.5-1.786-1.675-2.086-.174-.3-.019-.463.131-.612.135-.134.3-.349.45-.523.15-.174.2-.299.3-.498.1-.199.05-.374-.025-.524-.075-.15-.669-1.611-.916-2.204-.242-.579-.487-.501-.669-.51l-.57-.01c-.199 0-.52.074-.792.372-.272.299-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.778-.727 2.025-1.429.247-.702.247-1.303.173-1.429-.074-.124-.272-.198-.57-.347z"/>
              </svg>
              <span className="truncate">Comprar</span>
            </motion.button>

            {/* Add to Bag button - permanently visible on small screens & expandable on desktop hover */}
            <AnimatePresence>
              {shouldShowBag && (
                <motion.button 
                  layout
                  initial={isSmallScreen ? { width: "auto", opacity: 1 } : { width: 0, opacity: 0 }}
                  animate={{ width: "auto", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  onClick={() => onAddToCart(product)}
                  className="px-3 sm:px-4 py-3 bg-graphite hover:bg-terracotta text-white rounded flex items-center justify-center gap-1.5 overflow-hidden whitespace-nowrap min-w-0"
                  title="Adicionar à Sacola"
                >
                  <ShoppingBag className="w-4 h-4 flex-shrink-0" />
                  <motion.span layout className="text-[10px] uppercase tracking-wider font-semibold">
                    + Sacola
                  </motion.span>
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
