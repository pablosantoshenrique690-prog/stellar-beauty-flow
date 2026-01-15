import { Instagram, Facebook, Phone, MapPin, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      <div className="container-custom py-10 sm:py-12 md:py-20 px-4 sm:px-6 md:px-8 pb-6 md:pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12 mb-8 sm:mb-10 md:mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
              Studio <span className="text-primary">Sobrancelhas Perfeitas</span>
            </h3>
            <p className="text-background/70 leading-relaxed mb-4 sm:mb-6 max-w-md text-sm sm:text-base">
              Há 17 anos transformando a autoestima de mulheres em Cabo Frio. 
              Especialista em design de sobrancelhas, micropigmentação e cuidados 
              faciais personalizados.
            </p>
            <div className="flex gap-3 sm:gap-4">
              <a
                href="https://www.instagram.com/sobrancelhasperfeitascabofrio"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-background/10 flex items-center justify-center
                         hover:bg-primary transition-colors duration-300"
                aria-label="Seguir no Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.facebook.com/sobrancelhasperfeitascabofrio/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-background/10 flex items-center justify-center
                         hover:bg-primary transition-colors duration-300"
                aria-label="Seguir no Facebook"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Links Rápidos</h4>
            <nav className="space-y-2 sm:space-y-3">
              {[
                { href: '#home', label: 'Início' },
                { href: '#sobre', label: 'Sobre' },
                { href: '#servicos', label: 'Serviços' },
                { href: '#contato', label: 'Contato' },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-background/70 hover:text-primary transition-colors text-sm sm:text-base"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Contato</h4>
            <div className="space-y-3 sm:space-y-4">
              <a
                href="https://wa.me/5522992497973?text=Olá,%20gostaria%20de%20agendar%20um%20horário%20no%20Estúdio%20Sobrancelhas%20Perfeitas.%20Poderia%20me%20passar%20mais%20informações,%20por%20favor?"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 sm:gap-3 text-background/70 hover:text-primary transition-colors text-sm sm:text-base"
              >
                <Phone size={16} className="flex-shrink-0" />
                <span>(22) 99249-7973</span>
              </a>
              <div className="flex items-center gap-2 sm:gap-3 text-background/70 text-sm sm:text-base">
                <MapPin size={16} className="flex-shrink-0" />
                <span>Cabo Frio - RJ</span>
              </div>
              <a
                href="https://www.instagram.com/sobrancelhasperfeitascabofrio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 sm:gap-3 text-background/70 hover:text-primary transition-colors text-sm sm:text-base"
              >
                <Instagram size={16} className="flex-shrink-0" />
                <span className="break-all">@sobrancelhasperfeitascabofrio</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/50 text-sm text-center md:text-left">
              © {currentYear} Studio Sobrancelhas Perfeitas. Todos os direitos reservados.
            </p>
            <p className="text-background/50 text-sm flex items-center gap-1">
              Feito com <Heart className="text-primary" size={14} /> em Cabo Frio
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
