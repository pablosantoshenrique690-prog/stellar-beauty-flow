import { Home, User, Sparkles, Phone, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface RightSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const RightSidebar = ({ isOpen, onClose }: RightSidebarProps) => {
  const navLinks = [
    { href: '#home', label: 'Início', icon: Home },
    { href: '#sobre', label: 'Sobre', icon: User },
    { href: '#servicos', label: 'Serviços', icon: Sparkles },
    { href: '#contato', label: 'Contato', icon: Phone },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-40"
        />
      )}

      {/* Sidebar - Right Side */}
      <motion.aside
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 h-full w-72 bg-background border-l border-border z-50 flex flex-col shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <span className="font-display text-xl font-semibold text-foreground">Menu</span>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted text-foreground transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navLinks.map((link, index) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : 20 }}
                transition={{ delay: index * 0.1 }}
              >
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground hover:bg-muted hover:text-primary transition-all duration-200 font-medium"
                >
                  <link.icon size={20} className="text-primary" />
                  <span>{link.label}</span>
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* CTA Button */}
        <div className="p-6 border-t border-border">
          <a
            href="https://wa.me/5522992497973?text=Olá,%20gostaria%20de%20agendar%20um%20horário%20no%20Estúdio%20Sobrancelhas%20Perfeitas.%20Poderia%20me%20passar%20mais%20informações,%20por%20favor?"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full text-center block text-sm"
          >
            Agendar Agora
          </a>
        </div>
      </motion.aside>
    </>
  );
};

export default RightSidebar;
