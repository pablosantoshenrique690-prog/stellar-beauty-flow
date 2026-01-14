import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/5522992497973?text=Olá,%20gostaria%20de%20agendar%20um%20horário%20no%20Estúdio%20Sobrancelhas%20Perfeitas.%20Poderia%20me%20passar%20mais%20informações,%20por%20favor?"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5, type: 'spring' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full 
               shadow-lg hover:shadow-xl transition-shadow duration-300 group"
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle size={28} className="group-hover:scale-110 transition-transform" />
      
      {/* Pulse Animation */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-foreground 
                     text-background px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap
                     opacity-0 group-hover:opacity-100 transition-opacity duration-300
                     pointer-events-none shadow-lg">
        Agende pelo WhatsApp
        <span className="absolute left-full top-1/2 -translate-y-1/2 border-8 border-transparent 
                       border-l-foreground" />
      </span>
    </motion.a>
  );
};

export default WhatsAppButton;
