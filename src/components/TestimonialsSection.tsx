import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, memo } from 'react';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  service: string;
  text: string;
  rating: number;
}

const TestimonialCard = memo(({ testimonial, index, isInView }: { 
  testimonial: Testimonial; 
  index: number;
  isInView: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    className="bg-muted rounded-2xl p-6 md:p-8 relative"
  >
    <Quote className="absolute top-4 right-4 md:top-6 md:right-6 text-primary/20" size={40} />
    
    <div className="flex gap-1 mb-3 md:mb-4">
      {[...Array(testimonial.rating)].map((_, i) => (
        <Star
          key={i}
          className="text-primary fill-primary"
          size={16}
        />
      ))}
    </div>

    <p className="text-foreground leading-relaxed mb-5 md:mb-6 relative z-10 text-sm md:text-base">
      "{testimonial.text}"
    </p>

    <div className="flex items-center gap-3">
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/20 flex items-center 
                    justify-center text-primary font-semibold text-sm md:text-base">
        {testimonial.name.charAt(0)}
      </div>
      <div>
        <p className="font-semibold text-foreground text-sm md:text-base">{testimonial.name}</p>
        <p className="text-xs md:text-sm text-muted-foreground">{testimonial.service}</p>
      </div>
    </div>
  </motion.div>
));

TestimonialCard.displayName = 'TestimonialCard';

const TestimonialsSection = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const testimonials: Testimonial[] = [
    {
      name: 'Raquel',
      service: 'Design de Sobrancelhas',
      text: 'Sobrancelhas perfeitas define exatamente a destreza da profissional! Excelente trabalho, pontual. Só entrego minhas sobrancelhas pra ela fazer. ☺️',
      rating: 5,
    },
    {
      name: 'Daiana Costa Pereira',
      service: 'Design de Sobrancelhas',
      text: 'Faço minha sobrancelha com a Stella a mais de 10 anos, não troco por ngm. Agora ela tbm faz da minha filha. Super recomendo.',
      rating: 5,
    },
    {
      name: 'Jessica Monteiro',
      service: 'Design de Sobrancelhas',
      text: 'Adorei o meu designer de sobrancelha! Ficou ótimooo. Super recomendo ☺️😉♥️ Podem ir sem medo. Já virei cliente',
      rating: 5,
    },
  ];

  return (
    <section className="section-padding" ref={ref}>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-primary font-medium tracking-widest uppercase text-sm">
            Depoimentos
          </span>
          <h2 className="heading-section text-foreground mt-3 mb-4">
            O Que Nossas Clientes Dizem
          </h2>
          <p className="text-body">
            A satisfação de nossas clientes é nossa maior recompensa. Veja o que 
            elas têm a dizer sobre a experiência no Studio Stella Sousa.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={testimonial.name} 
              testimonial={testimonial} 
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground text-sm mb-6">
            Avaliações verificadas • Clientes reais de Cabo Frio e região
          </p>
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-60">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Star className="text-primary fill-primary" size={16} />
              </div>
              <span className="text-foreground font-medium">5.0</span>
              <span className="text-muted-foreground text-sm">no Google</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Star className="text-primary fill-primary" size={16} />
              </div>
              <span className="text-foreground font-medium">+500</span>
              <span className="text-muted-foreground text-sm">avaliações</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

TestimonialsSection.displayName = 'TestimonialsSection';

export default TestimonialsSection;
