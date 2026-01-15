import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, memo, useState } from 'react';
import { Award, Heart, Users, Sparkles, GraduationCap, BadgeCheck, BookOpen } from 'lucide-react';
import stellaProfessional from '@/assets/stella-professional.jpg';

const AboutSection = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [imageLoaded, setImageLoaded] = useState(false);

  const features = [
    {
      icon: Award,
      title: '17 Anos de Expertise',
      description: 'Especialização contínua desde 2008',
    },
    {
      icon: Heart,
      title: 'Atendimento Humanizado',
      description: 'Cuidado individual e personalizado',
    },
    {
      icon: Users,
      title: 'Clientes Fiéis',
      description: 'Milhares de histórias de sucesso',
    },
    {
      icon: Sparkles,
      title: 'Técnicas Exclusivas',
      description: 'Resultados naturais e duradouros',
    },
  ];

  return (
    <section id="sobre" className="section-padding bg-muted" ref={ref}>
      <div className="container-custom px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Professional Photo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-xl max-w-sm mx-auto lg:max-w-none">
              {/* Skeleton placeholder */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-muted-foreground/10 animate-pulse aspect-[4/5]" />
              )}
              <img
                src={stellaProfessional}
                alt="Stella Sousa - Especialista em Design de Sobrancelhas"
                loading="lazy"
                decoding="async"
                width={600}
                height={750}
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 100vw, 50vw"
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-auto object-cover aspect-[4/5] transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl" />
            </div>
            <div className="mt-3 sm:mt-4 text-center">
              <p className="text-primary font-semibold text-xs sm:text-sm tracking-wide uppercase">
                Stella Sousa
              </p>
              <p className="text-muted-foreground text-[10px] sm:text-xs mt-1">
                Especialista em Design de Sobrancelhas
              </p>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-primary font-medium tracking-widest uppercase text-xs sm:text-sm">
              Sobre a Profissional
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold tracking-tight text-foreground mt-2 sm:mt-3 mb-4 sm:mb-6">
              Conheça Stella Sousa
            </h2>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground mb-4 sm:mb-6">
              Apaixonada por realçar a expressão e a identidade de cada mulher, iniciei 
              minha trajetória profissional em 2008, com foco no cuidado e no embelezamento 
              das sobrancelhas. Ao longo de 17 anos de experiência, aperfeiçoei técnicas 
              que respeitam o formato do rosto e valorizam os traços naturais de cada cliente.
            </p>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground mb-4 sm:mb-6">
              No <strong className="text-foreground">Estúdio Sobrancelhas Perfeitas</strong>, 
              cada atendimento é pensado de forma personalizada, com atenção aos detalhes 
              e resultados naturais. Trabalhamos exclusivamente com procedimentos voltados 
              para sobrancelhas, utilizando produtos de alta qualidade e técnicas atualizadas 
              para garantir harmonia, simetria e satisfação em cada resultado.
            </p>

            {/* Highlighted Experience Paragraph */}
            <div className="bg-primary/10 border-l-4 border-primary rounded-r-xl p-4 sm:p-5 mb-8">
              <p className="text-foreground text-sm sm:text-base leading-relaxed">
                <strong className="text-primary">Anos de prática trazem agilidade e precisão.</strong>{' '}
                Enquanto métodos tradicionais com pinça podem levar de 40 minutos a 1 hora, 
                meu tempo médio de design de sobrancelhas é de apenas{' '}
                <strong className="text-foreground">10 a 15 minutos</strong> — resultado de uma 
                técnica refinada ao longo de quase duas décadas. Isso significa um atendimento 
                mais rápido, com menos desconforto e resultados consistentes.
              </p>
            </div>

            {/* Credentials Block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-background rounded-2xl p-5 sm:p-6 mb-8 border border-border/50 shadow-sm"
            >
              <h3 className="text-foreground font-semibold text-base sm:text-lg mb-4 flex items-center gap-2">
                <BadgeCheck className="text-primary" size={20} />
                Formação e Credenciais
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm sm:text-base">
                      Formação em Estética
                    </p>
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      Escola Vellup – Rio de Janeiro (RJ)
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Award className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm sm:text-base">
                      Especialização em Micropigmentação
                    </p>
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      Escola Alan Spadone – São Paulo (SP)
                    </p>
                    <span className="inline-flex items-center gap-1 mt-1 text-xs text-primary font-medium">
                      <BadgeCheck size={14} />
                      Certificação Internacional
                    </span>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm sm:text-base">
                      Instrutora de Maquiagem
                    </p>
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      Instituto Embelleze – 4 anos de experiência docente
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-background"
                >
                  <feature.icon className="text-primary flex-shrink-0 mt-0.5" size={22} />
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">
                      {feature.title}
                    </h4>
                    <p className="text-muted-foreground text-xs mt-1">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <a
              href="https://wa.me/5522992497973?text=Olá,%20gostaria%20de%20agendar%20um%20horário%20no%20Estúdio%20Sobrancelhas%20Perfeitas.%20Poderia%20me%20passar%20mais%20informações,%20por%20favor?"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-block"
            >
              Fale Comigo no WhatsApp
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

AboutSection.displayName = 'AboutSection';

export default AboutSection;
