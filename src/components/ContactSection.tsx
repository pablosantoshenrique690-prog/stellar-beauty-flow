import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useCallback, memo } from 'react';
import { MapPin, Phone, Instagram, Facebook, Send, CheckCircle, CalendarClock } from 'lucide-react';

const ContactSection = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    const whatsappMessage = `Olá, Stella! Vim pelo site e gostaria de agendar um horário.

*Nome:* ${formData.name}
*Telefone:* ${formData.phone}
*Serviço de interesse:* ${formData.service}
*Mensagem:* ${formData.message}`;

    const whatsappUrl = `https://wa.me/5522992497973?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
    
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', phone: '', service: '', message: '' });
    }, 3000);
  }, [formData]);

  const handleChange = useCallback((field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const contactInfo = [
    {
      icon: Phone,
      title: 'WhatsApp',
      value: '(22) 99249-7973',
      link: 'https://wa.me/5522992497973?text=Olá,%20gostaria%20de%20agendar%20um%20horário%20no%20Estúdio%20Sobrancelhas%20Perfeitas.%20Poderia%20me%20passar%20mais%20informações,%20por%20favor?',
    },
    {
      icon: MapPin,
      title: 'Localização',
      value: 'R. Primeiro de Março, 129 - Caiçara, Cabo Frio - RJ',
      link: 'https://www.google.com/maps/search/?api=1&query=R.+Primeiro+de+Março,+129+-+Caiçara,+Cabo+Frio+-+RJ,+28905-130',
    },
    {
      icon: CalendarClock,
      title: 'Horário',
      value: 'Seg à Sex: 10h às 19h',
      link: null,
    },
  ];

  const services = [
    'Design de Sobrancelhas',
    'Micropigmentação',
    'Limpeza de Pele',
    'Henna e Tintura',
    'Depilação Egípcia',
    'Buço',
  ];

  return (
    <section id="contato" className="section-padding bg-muted" ref={ref}>
      <div className="container-custom px-4 sm:px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 md:mb-16"
        >
          <span className="text-primary font-medium tracking-widest uppercase text-xs sm:text-sm">
            Contato
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold tracking-tight text-foreground mt-2 sm:mt-3 mb-3 sm:mb-4">
            Agende Seu Horário
          </h2>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground">
            Estou pronta para transformar sua beleza! Entre em contato e agende 
            sua avaliação personalizada.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-foreground mb-6 sm:mb-8">
              Entre em Contato
            </h3>

            <div className="space-y-4 sm:space-y-5 md:space-y-6 mb-6 sm:mb-8 md:mb-10">
              {contactInfo.map((info) => {
                const isHorario = info.title === 'Horário';
                return (
                  <div 
                    key={info.title} 
                    className={`flex items-start gap-3 md:gap-4 ${
                      isHorario 
                        ? 'bg-primary/10 border border-primary/20 rounded-2xl p-4 md:p-5' 
                        : ''
                    }`}
                  >
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center 
                                  justify-center flex-shrink-0 ${
                                    isHorario 
                                      ? 'bg-primary text-primary-foreground' 
                                      : 'bg-primary/10'
                                  }`}>
                      {isHorario ? (
                        <motion.div
                          animate={{ 
                            scale: [1, 1.1, 1],
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <info.icon size={22} />
                        </motion.div>
                      ) : (
                        <info.icon className="text-primary" size={20} />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`text-xs md:text-sm ${isHorario ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                        {info.title}
                      </p>
                      {info.link ? (
                        <a
                          href={info.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground font-medium hover:text-primary transition-colors text-sm md:text-base break-words"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className={`font-semibold text-sm md:text-base ${isHorario ? 'text-foreground text-base md:text-lg' : 'text-foreground'}`}>
                          {info.value}
                        </p>
                      )}
                      {isHorario && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Agende seu horário com antecedência
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="mb-8 md:mb-10">
              <p className="text-muted-foreground mb-3 md:mb-4 text-sm md:text-base">Siga nas redes sociais:</p>
              <div className="flex gap-3 md:gap-4">
                <a
                  href="https://www.instagram.com/sobrancelhasperfeitascabofrio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center
                           hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
                  aria-label="Siga no Instagram"
                >
                  <Instagram className="text-primary group-hover:text-primary-foreground" size={22} />
                </a>
                <a
                  href="https://www.facebook.com/sobrancelhasperfeitascabofrio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center
                           hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
                  aria-label="Siga no Facebook"
                >
                  <Facebook className="text-primary group-hover:text-primary-foreground" size={22} />
                </a>
              </div>
            </div>

            {/* Google Maps - Lazy loaded */}
            <div className="rounded-xl overflow-hidden h-48 md:h-64 relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3677.8!2d-42.0297!3d-22.8797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x97197e6e3bffffff%3A0x0!2sR.%20Primeiro%20de%20Mar%C3%A7o%2C%20129%20-%20Cai%C3%A7ara%2C%20Cabo%20Frio%20-%20RJ%2C%2028905-130!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização Studio Stella Sousa"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              />
              <a
                href="https://www.google.com/maps/search/?api=1&query=R.+Primeiro+de+Março,+129+-+Caiçara,+Cabo+Frio+-+RJ,+28905-130"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-2 right-2 md:bottom-3 md:right-3 bg-primary text-primary-foreground px-3 py-2 
                         rounded-lg text-xs md:text-sm font-medium shadow-lg hover:scale-105 transition-transform
                         flex items-center gap-1.5 md:gap-2"
              >
                <MapPin size={14} />
                Ver no Google Maps
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-background rounded-2xl p-6 md:p-8 shadow-lg">
              <h3 className="font-display text-2xl font-semibold text-foreground mb-6">
                Formulário de Agendamento
              </h3>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center"
                >
                  <CheckCircle className="text-primary mx-auto mb-4" size={64} />
                  <h4 className="font-display text-xl font-semibold text-foreground mb-2">
                    Mensagem Enviada!
                  </h4>
                  <p className="text-muted-foreground">
                    Você será redirecionada para o WhatsApp.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-foreground font-medium text-sm mb-2">
                      Seu Nome *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="Digite seu nome completo"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background
                               text-foreground placeholder:text-muted-foreground
                               focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
                               transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-foreground font-medium text-sm mb-2">
                      WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder="(00) 00000-0000"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background
                               text-foreground placeholder:text-muted-foreground
                               focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
                               transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-foreground font-medium text-sm mb-2">
                      Serviço de Interesse *
                    </label>
                    <select
                      required
                      value={formData.service}
                      onChange={(e) => handleChange('service', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background
                               text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 
                               focus:border-primary transition-all duration-300"
                    >
                      <option value="">Selecione um serviço</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-foreground font-medium text-sm mb-2">
                      Mensagem (opcional)
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      placeholder="Conte um pouco sobre o que deseja..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background
                               text-foreground placeholder:text-muted-foreground
                               focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
                               transition-all duration-300 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    <Send size={20} />
                    Enviar pelo WhatsApp
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

ContactSection.displayName = 'ContactSection';

export default ContactSection;
