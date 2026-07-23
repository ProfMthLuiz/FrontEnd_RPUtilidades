import React from 'react';
import { motion } from 'framer-motion';

export default function WhatsappButton() {
  const phone = "5517996574430";
  const text = "Olá RP Utilidades Gourmet! Gostaria de conhecer a coleção de utensílios premium e tirar algumas dúvidas.";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center justify-center">
      {/* Outer Pulse Rings (Continuous Green glow) */}
      <motion.div 
        animate={{ 
          scale: [1, 1.4, 1],
          opacity: [0.6, 0, 0.6]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute w-16 h-16 bg-[#25D366] rounded-full -z-10 pointer-events-none"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.8, 1],
          opacity: [0.3, 0, 0.3]
        }}
        transition={{ 
          duration: 2.5, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 0.5
        }}
        className="absolute w-16 h-16 bg-[#25D366] rounded-full -z-10 pointer-events-none"
      />

      {/* Main Floating Button */}
      <motion.a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full flex items-center justify-center shadow-2xl transition-colors duration-300"
        title="Fale Conosco no WhatsApp"
      >
        {/* WhatsApp Icon */}
        <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.45 5.436-.003 9.851-4.427 9.855-9.87.001-2.637-1.024-5.117-2.884-6.979C16.38 1.893 13.9 .87 11.258.87c-5.44 0-9.858 4.418-9.863 9.862-.002 1.768.471 3.493 1.371 5.011L1.69 22.046l6.452-1.692-.495-.2zM17.47 14.397c-.3-.149-1.777-.878-2.05-.978-.272-.098-.47-.149-.669.149-.198.299-.769.978-.942 1.177-.173.199-.347.224-.648.075-.301-.15-1.27-.468-2.42-1.493-.895-.799-1.5-1.786-1.675-2.086-.174-.3-.019-.463.131-.612.135-.134.3-.349.45-.523.15-.174.2-.299.3-.498.1-.199.05-.374-.025-.524-.075-.15-.669-1.611-.916-2.204-.242-.579-.487-.501-.669-.51l-.57-.01c-.199 0-.52.074-.792.372-.272.299-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.778-.727 2.025-1.429.247-.702.247-1.303.173-1.429-.074-.124-.272-.198-.57-.347z"/>
        </svg>
      </motion.a>
    </div>
  );
}
