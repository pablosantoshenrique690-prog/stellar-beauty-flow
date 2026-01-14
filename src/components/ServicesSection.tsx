import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useCallback, useState } from 'react';
import serviceEyebrow from '@/assets/service-eyebrow-procedure.png';
import serviceMicropigmentation from '@/assets/service-micropigmentacao-procedure.png';
import serviceHenna from '@/assets/service-henna.jpg';
import serviceDepilacaoEgipcia from '@/assets/service-depilacao-egipcia.png';
import serviceSkinCleansing from '@/assets/service-limpeza-pele-procedure.png';
import serviceBuco from '@/assets/service-buco-procedure.png';

const ServicesSection = () => {
  const ref = useRef(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const positionRef = useRef(0);
  const isPausedRef = useRef(false);
  const lastTimeRef = useRef<number>(0);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Drag state
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartPositionRef = useRef(0);
  const velocityRef = useRef(0);
  const lastDragXRef = useRef(0);
  const lastDragTimeRef = useRef(0);
  const inertiaAnimationRef = useRef<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const services = [
    {
      image: serviceEyebrow,
      title: 'Design de Sobrancelhas',
      description: 'Realizado de forma personalizada, respeitando o formato do rosto, a simetria e as características naturais de cada cliente. A técnica busca valorizar a expressão facial, corrigindo assimetrias e proporcionando um resultado harmonioso e natural. Com prática e agilidade, o procedimento garante mais conforto, precisão no acabamento e um design com maior durabilidade. Cada atendimento é feito com atenção aos detalhes, assegurando um resultado que realça a beleza de forma equilibrada e profissional.',
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
      subtitle: 'Profunda',
      description: 'A limpeza de pele é um tratamento essencial para a saúde e o equilíbrio da pele, indicado para remover impurezas, células mortas e resíduos acumulados. Ajuda a desobstruir os poros, controlar a oleosidade e prevenir cravos e acne. Realizada com técnica adequada e produtos específicos, promove renovação celular, melhora a textura da pele e potencializa a absorção de ativos em tratamentos futuros.',
      highlight: 'Cuidado Essencial',
    },
    {
      image: serviceHenna,
      title: 'Henna e Tintura',
      description: 'Coloração natural para sobrancelhas, com durabilidade de até 15 dias e aspecto impecável.',
      highlight: null,
    },
    {
      image: serviceDepilacaoEgipcia,
      title: 'Depilação Egípcia',
      subtitle: 'Com linha 100% algodão',
      description: 'A depilação egípcia é uma técnica precisa e delicada, ideal para quem busca um design mais definido e duradouro. Por remover os pelos desde a raiz, o resultado tem maior durabilidade. Diferente de outros métodos, a técnica não mancha a pele, não utiliza produtos químicos e é indicada inclusive para peles sensíveis. Proporciona um acabamento mais limpo e natural, valorizando o formato do rosto com segurança e eficiência.',
      highlight: 'Técnica Artesanal',
    },
    {
      image: serviceBuco,
      title: 'Depilação de Buço',
      description: 'A depilação de buço é um procedimento delicado, realizado com técnica adequada para garantir remoção eficaz dos pelos e maior conforto. Proporciona um acabamento limpo e uniforme, valorizando a expressão facial e deixando a pele com aspecto mais suave. Com a remoção desde a raiz, o resultado apresenta maior durabilidade. O procedimento é realizado com atenção ao tipo de pele, evitando irritações e garantindo segurança.',
      highlight: 'Conforto e Precisão',
    },
  ];

  // Duplicate services for seamless infinite loop
  const duplicatedServices = [...services, ...services];

  // Speed in pixels per second
  const speed = 50;

  // Get half width for seamless loop
  const getHalfWidth = useCallback(() => {
    if (!carouselRef.current) return 0;
    return carouselRef.current.scrollWidth / 2;
  }, []);

  // Normalize position for infinite loop
  const normalizePosition = useCallback((pos: number) => {
    const halfWidth = getHalfWidth();
    if (halfWidth === 0) return pos;
    
    while (pos < 0) pos += halfWidth;
    while (pos >= halfWidth) pos -= halfWidth;
    
    return pos;
  }, [getHalfWidth]);

  // Apply transform
  const applyTransform = useCallback((pos: number) => {
    if (!carouselRef.current) return;
    carouselRef.current.style.transform = `translateX(-${pos}px)`;
  }, []);

  // Inertia animation for smooth deceleration after drag
  const animateInertia = useCallback(() => {
    if (!carouselRef.current) return;

    const friction = 0.95;
    const minVelocity = 0.5;

    velocityRef.current *= friction;

    if (Math.abs(velocityRef.current) < minVelocity) {
      velocityRef.current = 0;
      if (inertiaAnimationRef.current) {
        cancelAnimationFrame(inertiaAnimationRef.current);
        inertiaAnimationRef.current = null;
      }
      // Resume auto animation after inertia ends
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
      pauseTimeoutRef.current = setTimeout(() => {
        isPausedRef.current = false;
      }, 2000);
      return;
    }

    positionRef.current = normalizePosition(positionRef.current - velocityRef.current);
    applyTransform(positionRef.current);

    inertiaAnimationRef.current = requestAnimationFrame(animateInertia);
  }, [normalizePosition, applyTransform]);

  const animate = useCallback((timestamp: number) => {
    if (!carouselRef.current) return;

    if (!lastTimeRef.current) {
      lastTimeRef.current = timestamp;
    }

    const deltaTime = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;

    if (!isPausedRef.current && !isDraggingRef.current) {
      positionRef.current += (speed * deltaTime) / 1000;
      positionRef.current = normalizePosition(positionRef.current);
      applyTransform(positionRef.current);
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [normalizePosition, applyTransform]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
      if (inertiaAnimationRef.current) {
        cancelAnimationFrame(inertiaAnimationRef.current);
      }
    };
  }, [animate]);

  // Drag handlers
  const handleDragStart = useCallback((clientX: number) => {
    isDraggingRef.current = true;
    setIsDragging(true);
    isPausedRef.current = true;
    dragStartXRef.current = clientX;
    dragStartPositionRef.current = positionRef.current;
    lastDragXRef.current = clientX;
    lastDragTimeRef.current = performance.now();
    velocityRef.current = 0;

    if (inertiaAnimationRef.current) {
      cancelAnimationFrame(inertiaAnimationRef.current);
      inertiaAnimationRef.current = null;
    }
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
  }, []);

  const handleDragMove = useCallback((clientX: number) => {
    if (!isDraggingRef.current || !carouselRef.current) return;

    const deltaX = dragStartXRef.current - clientX;
    const now = performance.now();
    const timeDelta = now - lastDragTimeRef.current;

    if (timeDelta > 0) {
      const instantVelocity = (lastDragXRef.current - clientX) / timeDelta * 16;
      velocityRef.current = velocityRef.current * 0.7 + instantVelocity * 0.3;
    }

    lastDragXRef.current = clientX;
    lastDragTimeRef.current = now;

    let newPosition = dragStartPositionRef.current + deltaX;
    newPosition = normalizePosition(newPosition);
    positionRef.current = newPosition;
    applyTransform(newPosition);
  }, [normalizePosition, applyTransform]);

  const handleDragEnd = useCallback(() => {
    if (!isDraggingRef.current) return;

    isDraggingRef.current = false;
    setIsDragging(false);

    // Start inertia animation if there's velocity
    if (Math.abs(velocityRef.current) > 1) {
      inertiaAnimationRef.current = requestAnimationFrame(animateInertia);
    } else {
      // Resume auto animation after pause
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
      pauseTimeoutRef.current = setTimeout(() => {
        isPausedRef.current = false;
      }, 2000);
    }
  }, [animateInertia]);

  // Touch event handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  }, [handleDragStart]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (isDraggingRef.current) {
      e.preventDefault();
    }
    handleDragMove(e.touches[0].clientX);
  }, [handleDragMove]);

  const handleTouchEnd = useCallback(() => {
    handleDragEnd();
  }, [handleDragEnd]);

  // Mouse event handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  }, [handleDragStart]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  }, [handleDragMove]);

  const handleMouseUp = useCallback(() => {
    handleDragEnd();
  }, [handleDragEnd]);

  const handleMouseLeave = useCallback(() => {
    if (isDraggingRef.current) {
      handleDragEnd();
    } else {
      isPausedRef.current = false;
    }
  }, [handleDragEnd]);

  const handleMouseEnter = useCallback(() => {
    if (!isDraggingRef.current) {
      isPausedRef.current = true;
    }
  }, []);

  const ServiceCard = ({ service }: { service: { image: string; title: string; description: string; highlight: string | null; subtitle?: string } }) => (
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
        <h3 className="font-display text-lg md:text-xl font-semibold text-foreground mb-0.5 
                     group-hover:text-primary transition-colors">
          {service.title}
        </h3>
        {service.subtitle && (
          <p className="text-primary text-xs font-medium mb-1.5 md:mb-2">
            {service.subtitle}
          </p>
        )}
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
      >
        <div 
          className={`overflow-hidden ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ touchAction: 'pan-y' }}
        >
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
