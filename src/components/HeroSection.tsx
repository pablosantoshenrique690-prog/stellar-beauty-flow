import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { memo, useCallback } from 'react';
import heroImage from '@/assets/hero-beauty.jpg';
import logoStella from '@/assets/logo-stella.png';

const HeroSection = memo(() => {
  const scrollToServices = useCallback(() => {
    const element = document.querySelector('#servicos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const scrollToContact = useCallback(() => {
    const element = document.querySelector('#contato');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 md:pt-0 md:pb-0"
    >
      {/* Background Image - Priority loading for LCP */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Studio Stella Sousa - Estética Facial e Corporal"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          sizes="100vw"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center px-6 md:px-4">
        {/* Logo centralizada */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-6 md:mb-8"
        >
          <img 
            src={logoStella} 
            alt="Logo Estúdio Sobrancelhas Perfeitas" 
            loading="eager"
            decoding="async"
            fetchPriority="high"
            width={160}
            height={160}
            className="h-24 sm:h-28 md:h-32 lg:h-40 w-auto object-contain brightness-0 invert drop-shadow-[0_4px_25px_rgba(255,255,255,0.6)]"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-semibold tracking-tight text-white mb-4 md:mb-6 drop-shadow-lg"
        >
          Realce Sua Beleza
          <br />
          <span className="text-white/90 font-normal">Natural</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-white/90 text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed px-2 drop-shadow-md"
        >
          Há 17 anos transformando a autoestima de mulheres em Cabo Frio com 
          tratamentos exclusivos de design de sobrancelhas, micropigmentação e 
          cuidados faciais personalizados.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 px-2"
        >
          <button
            onClick={scrollToServices}
            className="w-full sm:w-auto text-white border-2 border-white/60 px-8 py-4 
                     rounded-full font-medium transition-all duration-300 
                     hover:bg-white/10 hover:border-white backdrop-blur-sm min-h-[52px]"
          >
            Conheça Nossos Serviços
          </button>
          <button
            onClick={scrollToContact}
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 
                     rounded-full font-semibold transition-all duration-300 
                     shadow-lg hover:shadow-xl min-h-[52px] flex items-center justify-center"
          >
            Agendar Agora
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12 md:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 max-w-2xl mx-auto"
        >
          <div className="text-center">
            <p className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white drop-shadow-md">
              17+
            </p>
            <p className="text-white/70 text-sm mt-2 tracking-wide uppercase">Anos de Experiência</p>
          </div>
          <div className="text-center">
            <p className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white drop-shadow-md">
              5k+
            </p>
            <p className="text-white/70 text-sm mt-2 tracking-wide uppercase">Clientes Satisfeitas</p>
          </div>
          <div className="text-center">
            <p className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white drop-shadow-md">
              100%
            </p>
            <p className="text-white/70 text-sm mt-2 tracking-wide uppercase">Dedicação</p>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="text-primary-foreground/70" size={32} />
        </motion.div>
      </motion.div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
