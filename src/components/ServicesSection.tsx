import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useCallback } from 'react';
import serviceEyebrow from '@/assets/service-eyebrow.jpg';
import serviceFacial from '@/assets/service-facial.jpg';
import serviceMicropigmentation from '@/assets/service-micropigmentation.jpg';
import serviceHenna from '@/assets/service-henna.jpg';
import serviceWaxing from '@/assets/service-waxing.jpg';
import serviceSkinCleansing from '@/assets/service-skin-cleansing.jpg';

const ServicesSection = () => {
  const ref = useRef(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const positionRef = useRef(0);
  const isPausedRef = useRef(false);
  const lastTimeRef = useRef<number>(0);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const services = [
    {
      image: serviceEyebrow,
      title: 'Design de Sobrancelhas',
      description: 'Desenho personalizado que valoriza seus traços únicos, realçando a expressão do seu olhar.',
      highlight: 'Mais Procurado',
    },
    {
      image: serviceMicropigmentation,
      title: 'Micropigmentação',
      description: 'Sobrancelhas perfeitas 24 horas por dia com técnicas fio a fio ou sombreada para resultado natural.',
      highlight: 'Resultado Duradouro',
    },
    {
      image: serviceSkinCleansing,
      title: 'Limpeza de Pele',
      description: 'Tratamento profundo que remove impurezas, renova a pele e proporciona viço e luminosidade.',
      highlight: null,
    },
    {
      image: serviceHenna,
      title: 'Henna e Tintura',
      description: 'Coloração natural para sobrancelhas, com durabilidade de até 15 dias e aspecto impecável.',
      highlight: null,
    },
    {
      image: serviceWaxing,
      title: 'Depilação Egípcia',
      description: 'Técnica milenar com linha que remove os pelos pela raiz, proporcionando pele lisinha por mais tempo.',
      highlight: 'Técnica Artesanal',
    },
    {
      image: serviceFacial,
      title: 'Buço',
      description: 'Remoção delicada e precisa dos pelos faciais com técnicas que cuidam da sua pele sensível.',
      highlight: null,
    },
  ];

  // Duplicate services for seamless infinite loop
  const duplicatedServices = [...services, ...services];

  // Speed in pixels per second
  const speed = 50;

  const animate = useCallback((timestamp: number) => {
    if (!carouselRef.current) return;

    if (!lastTimeRef.current) {
      lastTimeRef.current = timestamp;
    }

    const deltaTime = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;

    if (!isPausedRef.current) {
      positionRef.current += (speed * deltaTime) / 1000;

      // Get half width for seamless loop
      const halfWidth = carouselRef.current.scrollWidth / 2;

      // Reset position seamlessly when reaching halfway
      if (positionRef.current >= halfWidth) {
        positionRef.current = positionRef.current - halfWidth;
      }

      carouselRef.current.style.transform = `translateX(-${positionRef.current}px)`;
    }

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, [animate]);

  const handleInteractionStart = useCallback(() => {
    isPausedRef.current = true;
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
  }, []);

  const handleInteractionEnd = useCallback(() => {
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    pauseTimeoutRef.current = setTimeout(() => {
      isPausedRef.current = false;
    }, 3000);
  }, []);

  const handleMouseEnter = useCallback(() => {
    isPausedRef.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    isPausedRef.current = false;
  }, []);

  const ServiceCard = ({ service }: { service: typeof services[0] }) => (
    <div className="card-elegant group h-full select-none">
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          draggable={false}
          className="w-full h-full object-cover transition-transform duration-700 
                   group-hover:scale-110 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent pointer-events-none" />
        
        {service.highlight && (
          <span className="absolute top-3 left-3 md:top-4 md:left-4 bg-primary text-primary-foreground 
                         px-2.5 py-1 rounded-full text-xs font-medium pointer-events-none">
            {service.highlight}
          </span>
        )}
      </div>
      
      <div className="p-4 md:p-6 pointer-events-none">
        <h3 className="font-display text-lg md:text-xl font-semibold text-foreground mb-1.5 md:mb-2 
                     group-hover:text-primary transition-colors">
          {service.title}
        </h3>
        <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
          {service.description}
        </p>
      </div>
    </div>
  );

  return (
    <section id="servicos" className="section-padding overflow-hidden" ref={ref}>
      <div className="container-custom px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-10 md:mb-16"
        >
          <span className="text-primary font-medium tracking-widest uppercase text-xs md:text-sm">
            Nossos Serviços
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-semibold tracking-tight text-foreground mt-3 mb-3 md:mb-4">
            Tratamentos Especializados
          </h2>
          <p className="text-sm md:text-base lg:text-lg leading-relaxed text-muted-foreground">
            Cada procedimento é realizado com técnicas exclusivas, produtos premium 
            e todo o cuidado que você merece. Confira nosso catálogo de serviços.
          </p>
        </motion.div>
      </div>

      {/* Services Carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleInteractionStart}
        onTouchEnd={handleInteractionEnd}
      >
        <div className="overflow-hidden">
          <div 
            ref={carouselRef}
            className="flex gap-4 md:gap-6 will-change-transform"
            style={{
              width: 'max-content',
            }}
          >
            {duplicatedServices.map((service, index) => (
              <div
                key={`${service.title}-${index}`}
                className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[350px] lg:w-[380px]"
              >
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>

        {/* Gradient Overlays for premium feel */}
        <div className="absolute inset-y-0 left-0 w-8 md:w-20 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-8 md:w-20 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
      </motion.div>

      {/* CTA */}
      <div className="container-custom px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-10 md:mt-16"
        >
          <div className="bg-muted rounded-2xl p-6 md:p-8 lg:p-12 max-w-3xl mx-auto">
            <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-semibold text-foreground mb-3 md:mb-4">
              Quer saber os valores?
            </h3>
            <p className="text-muted-foreground mb-5 md:mb-6 max-w-lg mx-auto text-sm md:text-base">
              Entre em contato pelo WhatsApp e receba uma avaliação personalizada 
              com os melhores procedimentos para você.
            </p>
            <a
              href="https://wa.me/5522992497973?text=Olá, Stella! Vim pelo site e gostaria de saber os valores dos serviços. Pode me ajudar?"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-block w-full sm:w-auto text-center"
            >
              Consultar Valores no WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
