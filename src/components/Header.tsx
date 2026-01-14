import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import logoStella from '@/assets/logo-stella.png';
import RightSidebar from './RightSidebar';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-md shadow-lg py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container-custom flex items-center justify-center relative">
          {/* Logo - Centered, only visible when scrolled */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#home');
            }}
            className={`flex items-center transition-all duration-500 ${
              isScrolled ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
            }`}
          >
            <img 
              src={logoStella} 
              alt="Logo Estúdio Sobrancelhas Perfeitas" 
              className="h-14 md:h-16 w-auto object-contain brightness-0 drop-shadow-md"
            />
          </a>

          {/* Menu Button - Right Side (absolute position) */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className={`absolute right-4 md:right-8 p-3 rounded-full transition-colors flex items-center gap-2 ${
              isScrolled 
                ? 'text-foreground hover:bg-muted' 
                : 'text-primary-foreground hover:bg-primary-foreground/10'
            }`}
          >
            <span className="hidden md:inline font-medium">Menu</span>
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* Right Sidebar */}
      <AnimatePresence>
        <RightSidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />
      </AnimatePresence>
    </>
  );
};

export default Header;
