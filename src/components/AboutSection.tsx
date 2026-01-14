import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, Heart, Users, Sparkles } from 'lucide-react';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
          <span className="text-primary font-medium tracking-widest uppercase text-sm">
              Sobre a Profissional
            </span>
            <h2 className="heading-section text-foreground mt-3 mb-6">
              Conheça Stella Souza
            </h2>
            <p className="text-body mb-6">
              Apaixonada por realçar a expressão e a identidade de cada mulher, iniciei 
              minha trajetória profissional em 2008, com foco no cuidado e no embelezamento 
              das sobrancelhas. Ao longo de 17 anos de experiência, aperfeiçoei técnicas 
              que respeitam o formato do rosto e valorizam os traços naturais de cada cliente.
            </p>
            <p className="text-body mb-6">
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
};

export default AboutSection;
